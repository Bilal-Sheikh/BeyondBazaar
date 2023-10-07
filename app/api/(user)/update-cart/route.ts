import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function POST() {
	const headersList = headers();
	const clerkId = headersList.get("ClerkId");
	const cartId = headersList.get("CartId");
	const productId = headersList.get("ProductId");
	const newQuantity = headersList.get("Quantity");

	if (!clerkId) {
		return NextResponse.json({
			success: false,
			message: "(API) Clerk id not found in headers",
		});
	}

	console.log("(API) USER ID :::::::::::::::::::::::", clerkId);

	// return NextResponse.json({ success: "REACHED API CART QUANTITY" });

	try {
		await prisma.cartItem.update({
			where: { id: Number(cartId) },
			data: { quantity: Number(newQuantity) },
		});

		console.log(
			"(API) INCREASED QUANTITY IN CART FOR PRODUCT :::::::::::::::::::::::",
			cartId,
			productId
		);

		return NextResponse.json({
			success: true,
			message: "(API) Successfully INCREASED QUANTITY",
		});
	} catch (error) {
		console.log(
			"ERROR IN PRISMA app/api/(user)/cart-quantity/route.ts:::::::::::::::::::::::::::::::::::",
			error
		);

		return NextResponse.json({
			success: false,
			message: "(API) Error increasing cart quantity.",
		});
	}
}

export async function DELETE() {
	const headersList = headers();
	const clerkId = headersList.get("ClerkId");
	const cartId = headersList.get("CartId");

	if (!clerkId) {
		return NextResponse.json({
			success: false,
			message: "(API) Clerk id not found in headers",
		});
	}

	console.log("(API) USER ID :::::::::::::::::::::::", clerkId);

	// return NextResponse.json({ success: "REACHED API CART QUANTITY" });

	try {
		await prisma.cartItem.delete({
			where: { id: Number(cartId) },
		});

		console.log(
			"(API) DELETED ITEM FROM CART ITEM :::::::::::::::::::::::",
			cartId
		);

		return NextResponse.json({
			success: true,
			message: "(API) Successfully DELETED CART ITEM",
		});
	} catch (error) {
		console.log(
			"ERROR IN PRISMA app/api/(user)/update-cart/route.ts:::::::::::::::::::::::::::::::::::",
			error
		);

		return NextResponse.json({
			success: false,
			message: "(API) Error DELETING cart item.",
		});
	}
}
