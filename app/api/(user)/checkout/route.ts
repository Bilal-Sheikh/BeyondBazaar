import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function POST() {
	const headersList = headers();
	const clerkId = headersList.get("ClerkId");

	if (!clerkId) {
		return NextResponse.json({
			success: false,
			message: "(API) Clerk id not found in headers",
		});
	}

	// console.log("(API) USER ID :::::::::::::::::::::::", clerkId);

	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		await prisma.cartItem.deleteMany({
			where: { userId: clerkId },
		});
		console.log("DELETED THE CART::::::::::::::::::::::::::");

		



		return NextResponse.json({
			success: true,
			message: "(API) Successfully checked out.",
		});
	} catch (error) {
		console.log(
			"ERROR IN PRISMA app/api/(user)/checkout/route.ts:::::::::::::::::::::::::::::::::::",
			error
		);

		return NextResponse.json({
			success: false,
			message: "(API) Error in checkout.",
		});
	}
}
