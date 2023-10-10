import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function POST() {
	const headersList = headers();
	const userClerkId = headersList.get("UserClerkId");
	const productId = headersList.get("ProductId");

	console.log("(API) USER ID :::::::::::::::::::::::", userClerkId);
	if (!userClerkId) {
		return NextResponse.json({
			success: false,
			message: "(API) Clerk id not found in headers",
		});
	}

	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		console.log("(API) DOING BUY NOW QUERY:::::::::::::::::::::::::::::::");
		await prisma.product
			.update({
				where: { id: Number(productId) },
				data: {
					sales: { increment: 1 },
					stockQuantity: { decrement: 1 },
				},
			})
			.then(() =>
				console.log("(API) UPDATED PRODUCT:::::::::::::::::::::::::::::::")
			)
			.catch((error) => {
				console.log(
					"ERROR IN PRISMA app/api/(user)/checkout/buy-now/route.ts || prisma.product.updateMany ",
					error
				);
			});

		await prisma.purchaseHistory
			.create({
				data: {
					userId: userClerkId,
					productId: Number(productId),
					quantity: 1,
				},
			})
			.then(() => console.log("(API) CREATED PURCHASE HISTORY:::::::::::::::"))
			.catch((error) => {
				console.log(
					"(API) ERROR IN PRISMA app/api/(user)/checkout/buy-now/route.ts || prisma.purchaseHistory.createMany",
					error
				);
			});

		return NextResponse.json({
			success: true,
			message: "(API) Successfully checked out.",
		});
	} catch (error) {
		console.log(
			"(API) ERROR IN app/api/(user)/checkout/buy-now/route.ts:::::::::::::::::::::::::::::::::::",
			error
		);

		return NextResponse.json({
			success: false,
			message: "(API) Error in checkout.",
		});
	}
}
