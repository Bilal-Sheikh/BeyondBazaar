import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
	const headersList = headers();
	const clerkId = headersList.get("ClerkId");
	const productId = headersList.get("ProductId");

	if (!clerkId || !productId) {
		return NextResponse.json(
			{
				success: false,
				message: "Clerk Id or Product Id not found in the headers",
			},
			{ status: 400 }
		);
	}

	// console.log("(API) USER :::::::::::::::::", clerkId);
	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		const deleteProduct = await prisma.product.delete({
			where: {
				id: Number(productId),
			},
		});

		// console.log("(API) DELETED PRODUCT:::::::::::::::::::", deleteProduct);

		return NextResponse.json(
			{
				success: true,
				message:
					"(API) Successfully deleted the product with id " + deleteProduct.id,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log("(API) ERROR:::::::::::::::::::", error);

		return NextResponse.json(
			{
				success: false,
				message: "Error deleting the product.",
			},
			{ status: 500 }
		);
	}
}
