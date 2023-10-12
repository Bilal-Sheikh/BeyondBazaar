import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function GET() {
	const headersList = headers();
	const clerkId = headersList.get("ClerkId");

	if (!clerkId) {
		return NextResponse.json(
			{
				success: false,
				message: "Clerk Id not found in the headers",
			},
			{ status: 401 }
		);
	}

	// console.log("(API) USER :::::::::::::::::", clerkId);
	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		const data = await prisma.user.findUnique({
			where: {
				clerkId: clerkId,
			},
			include: {
				postedProducts: true,
			},
		});
		const postedProducts = data?.postedProducts || [];

		// console.log("(API) USER WITH PRODUCTS:::::::::::::::::::", postedProducts);

		return NextResponse.json(
			{
				success: true,
				message: "Successfully retrieved the products.",
				data,
				postedProducts: postedProducts,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log("(API) ERROR:::::::::::::::::::", error);

		return NextResponse.json(
			{
				success: false,
				message: "Error showing the product.",
			},
			{ status: 500 }
		);
	}
}
