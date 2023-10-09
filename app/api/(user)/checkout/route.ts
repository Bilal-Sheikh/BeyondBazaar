import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function POST() {
	const headersList = headers();
	const userClerkId = headersList.get("UserClerkId");
	const quantity = headersList.get("Quantity");

	console.log("(API) USER ID :::::::::::::::::::::::", userClerkId);

	if (!userClerkId) {
		return NextResponse.json({
			success: false,
			message: "(API) Clerk id not found in headers",
		});
	}

	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		// const { cart } = await prisma.user
		// 	.findUnique({
		// 		where: { clerkId: clerkId },
		// 		include: {
		// 			cart: {
		// 				include: {
		// 					product: true,
		// 				},
		// 			},
		// 		},
		// 	})
		// 	.then(() =>
		// 		console.log("(API) GOT CART DETAILS:::::::::::::::::::::::::::::")
		// 	)
		// 	.catch((error) => {
		// 		console.log("ERROR IN PRISMA app/api/(user)/checkout/route.ts", error);
		// 	});
		// const sellersId = cart.map((item) => item.product.postedById);
		// console.log("SELLERS ID::::::::::::::::::::::::::::::::", sellersId);

		// await prisma.product
		// 	.updateMany({
		// 		where: {
		// 			postedById: clerkId,
		// 		},
		// 		data: {
		// 			sales: {
		// 				increment: Number(quantity),
		// 			},
		// 		},
		// 	})
		// 	.then(() =>
		// 		console.log("(API) UPDATED SALES:::::::::::::::::::::::::::::")
		// 	)
		// 	.catch((error) => {
		// 		console.log("ERROR IN PRISMA app/api/(user)/checkout/route.ts", error);
		// 	});

		await prisma.cartItem
			.deleteMany({
				where: { userId: userClerkId },
			})
			.then(() =>
				console.log("(API) DELETED CART ITEMS:::::::::::::::::::::::::::::")
			)
			.catch((error) => {
				console.log("ERROR IN PRISMA app/api/(user)/checkout/route.ts", error);
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
