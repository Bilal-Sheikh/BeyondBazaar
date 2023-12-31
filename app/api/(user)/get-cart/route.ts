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
				message: "(API) Clerk id not found in headers",
			},
			{ status: 400 }
		);
	}

	// console.log("(API) USER ID :::::::::::::::::::::::", clerkId);
	// return NextResponse.json({ success: "REACHED API GET CART" });

	try {
		const { cart }: any = await prisma.user.findUnique({
			where: { clerkId: clerkId },
			include: {
				cart: {
					include: {
						product: true,
					},
				},
			},
		});
		// console.log("(API) CART::::::::::::::::::::::", cart);

		return NextResponse.json(
			{
				success: true,
				message: "(API) Successfully retrived cart items",
				cart: cart,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(
			"ERROR IN PRISMA app/api/(user)/get-cart/:::::::::::::::::::::::::::::::::::",
			error
		);

		return NextResponse.json(
			{
				success: false,
				message: "(API) Error in app/api/(user)/get-cart/route.ts.",
			},
			{ status: 500 }
		);
	}
}
