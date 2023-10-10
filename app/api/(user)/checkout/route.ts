import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { error } from "console";

export async function POST() {
	const headersList = headers();
	const userClerkId = headersList.get("UserClerkId");

	console.log("(API) USER ID :::::::::::::::::::::::", userClerkId);

	if (!userClerkId) {
		return NextResponse.json({
			success: false,
			message: "(API) Clerk id not found in headers",
		});
	}

	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		console.log("(API) DOING CART QUERIES:::::::::::::::::::::::::::::::");
		const { cart } = await prisma.user.findUnique({
			where: { clerkId: userClerkId },
			include: {
				cart: {
					select: {
						userId: true,
						productId: true,
						quantity: true,
					},
				},
			},
		});
		console.log("(API) GOT CART DETAILS:::::::::::::::::::::::::::::", cart);

		const productsId = cart.map((product) => product.productId);
		console.log("(API) PRODUCTS ID:::::::::::::::::::::::::::::", productsId);

		const productQuantities = cart.map((product) => product.quantity);
		console.log("(API) PRODUCT QUANTITIES:::::::::::::::::", productQuantities);

		await prisma.purchaseHistory
			.createMany({
				data: cart.map((item) => ({
					userId: item.userId,
					productId: item.productId,
					quantity: item.quantity,
				})),
			})
			.then(() => console.log("(API) CREATED PURCHASE HISTORY:::::::::::::::"))
			.catch((error) => {
				console.log(
					"(API) ERROR IN PRISMA app/api/(user)/checkout/route.ts || prisma.purchaseHistory.createMany",
					error
				);
			});

		for (let i = 0; i < productsId.length; i++) {
			await prisma.product
				.updateMany({
					where: { id: productsId[i] },
					data: {
						sales: { increment: Number(productQuantities[i]) },
						stockQuantity: { decrement: Number(productQuantities[i]) },
					},
				})
				.then(() =>
					console.log("(API) UPDATED SALES AND STOCK QUANTITY:::::::::::::::")
				)
				.catch((error) => {
					console.log(
						"ERROR IN PRISMA app/api/(user)/checkout/route.ts || prisma.product.updateMany ",
						error
					);
				});
		}

		await prisma.cartItem
			.deleteMany({
				where: { userId: userClerkId },
			})
			.then(() =>
				console.log("(API) DELETED CART ITEMS:::::::::::::::::::::::::::::")
			)
			.catch((error) => {
				console.log(
					"ERROR IN PRISMA app/api/(user)/checkout/route.ts || prisma.cartItem.deleteMany",
					error
				);
			});

		return NextResponse.json({
			success: true,
			message: "(API) Successfully checked out.",
		});
	} catch (error) {
		console.log(
			"ERROR IN API app/api/(user)/checkout/route.ts:::::::::::::::::::::::::::::::::::",
			error
		);

		return NextResponse.json({
			success: false,
			message: "(API) Error in checkout.",
		});
	}
}
