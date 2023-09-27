import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function GET() {
	const headersList = headers();
	const productId = headersList.get("ProductId");

	if (!productId) {
		return NextResponse.json({
			success: false,
			message: "(API) Product Id not found in the headers",
		});
	}

	console.log("(API) PRODUCT ID:::::::::::::::::::", productId);

	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		const data = await prisma.product.findUnique({
			where: {
				id: Number(productId),
			},
		});

		console.log("(API) PRODUCT DATA WITH ID :::::::::::::::::::", data);

		return NextResponse.json({
			success: true,
			message: "(API) Successfully the product.",
			data,
		});
	} catch (error) {
		console.log("(API) ERROR:::::::::::::::::::", error);

		return NextResponse.json({
			success: false,
			message: "(API) Error showing the product.",
		});
	}
}
