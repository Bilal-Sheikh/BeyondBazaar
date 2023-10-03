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
		const product = await prisma.product.findUnique({
			where: {
				id: Number(productId),
			},
			include: {
				postedBy: true,
			},
		});

		console.log("(API) PRODUCT DATA :::::::::::::::::::", product);

		return NextResponse.json({
			success: true,
			message: "(API) Successfully the product.",
			product,
		});
	} catch (error) {
		console.log(
			"ERROR IN PRISMA products/[id]:::::::::::::::::::::::::::::::::::",
			error
		);

		return NextResponse.json({
			success: false,
			message: "(API) Error showing the product.",
		});
	}
}
