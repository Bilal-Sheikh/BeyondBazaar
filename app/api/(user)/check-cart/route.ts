import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function GET() {
	const headersList = headers();
	const productId = headersList.get("ProductId");
	const clerkId = headersList.get("ClerkId");

	if (!clerkId) {
		return NextResponse.json(
			{
				success: false,
				message: "(API) Clerk id not found in headers",
			},
			{ status: 401 }
		);
	}

	// console.log("(API) USER ID :::::::::::::::::::::::", clerkId);
	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		const cartItem = await prisma.cartItem.findFirst({
			where: {
				userId: clerkId,
				productId: Number(productId),
			},
		});

		if (cartItem) {
			// console.log("(API) Product exists in the user's cart");
			return NextResponse.json(
				{
					success: true,
					exists: true,
					message: "(API) Product EXISTS in the user's cart",
				},
				{ status: 200 }
			);
		}

		// console.log("(API) Product does not exist in the user's cart");
		return NextResponse.json(
			{
				success: true,
				exists: false,
				message: "(API) Product DOES NOT EXISTS in the user's cart",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(
			"ERROR IN PRISMA app/api/(user)/add-to-cart/add-to-cart.ts:::::::::::::::::::::::::::::::::::",
			error
		);

		return NextResponse.json(
			{
				success: false,
				message: "(API) Error in app/api/(user)/check-cart/route.ts.",
			},
			{ status: 500 }
		);
	}
}
