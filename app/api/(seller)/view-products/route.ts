import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function GET() {
	const headersList = headers();
	const clerkId = headersList.get("ClerkId");

	if (!clerkId) {
		return NextResponse.json({
			success: false,
			message: "Clerk Id not found in the headers",
		});
	}

	console.log("(API) USER :::::::::::::::::", clerkId);

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

		return NextResponse.json({
			success: true,
			message: "Successfully retrieved the products.",
			data,
			postedProducts: postedProducts,
		});
	} catch (error) {
		console.log("(API) ERROR:::::::::::::::::::", error);

		return NextResponse.json({
			success: false,
			message: "Error showing the product.",
		});
	}
}

// should use for userdashboard
// export async function GET() {
// 	try {
// 		const data = await prisma.product.findMany();

// 		console.log("(API) ALL PRODUCTS:::::::::::::::::::", data);

// 		return NextResponse.json({
// 			success: true,
// 			message: "Successfully retrieved all products.",
// 			data
// 		});
// 	} catch (error) {
// 		console.log("(API) ERROR:::::::::::::::::::", error);
// 		return NextResponse.json({
// 			success: false,
// 			message: "Error showing the product.",
// 		});
// 	}
// }
