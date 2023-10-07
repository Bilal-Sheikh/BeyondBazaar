import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export async function POST() {
	const headersList = headers();
	const productId = headersList.get("ProductId");
	const clerkId = headersList.get("ClerkId");

	if (!clerkId) {
		return NextResponse.json({
			success: false,
			message: "(API) Clerk id not found in headers",
		});
	}

	console.log("(API) USER ID :::::::::::::::::::::::", clerkId);

	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		await prisma.cartItem.create({
			data: {
				user: { connect: { clerkId: clerkId } },
				product: { connect: { id: Number(productId) } },
				quantity: 1,
			},
		});
		console.log("(API) ADDED TO CART :::::::::::::::::::::::", productId);

		const { cart } = await prisma.user.findUnique({
			where: { clerkId: clerkId },
			include: {
				cart: {
					include: {
						product: true,
					},
				},
			},
		});
		cookies().set("cartItems", cart.length);
		console.log("(API) ADDED TO COOKIES :::::::::::::::::::::::", cart.length);

		return NextResponse.json({
			success: true,
			message: "(API) Successfully ADDED to cart",
		});
	} catch (error) {
		console.log(
			"ERROR IN PRISMA app/api/(user)/add-to-cart/add-to-cart.ts:::::::::::::::::::::::::::::::::::",
			error
		);

		return NextResponse.json({
			success: false,
			message: "(API) Error adding in cart.",
		});
	}
}
