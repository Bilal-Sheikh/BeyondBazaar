import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Razorpay from "razorpay";

const instance = new Razorpay({
	//@ts-ignore
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: NextRequest, res: NextResponse) {
	const headersList = headers();
	const clerkId = headersList.get("ClerkId");

	const body = await req.json();

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
	// return NextResponse.json({ success: "REACHED API razorpay" });

	const options = {
		amount: Number(body.amount * 100),
		currency: "USD",
	};

	try {
		const order = await instance.orders.create(options);
		// console.log("ORDER CREATED:::::::::::::::::::::::::::", order);

		return NextResponse.json(
			{
				success: true,
				message: "(API) Order created successfully",
				order: order,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(
			"ERROR IN app/api/(user)/razorpay/orders/route.ts:::::::::::::::::::::::::",
			error
		);

		return NextResponse.json(
			{
				success: false,
				message: "(API) Error in creating order",
			},
			{ status: 500 }
		);
	}
}
