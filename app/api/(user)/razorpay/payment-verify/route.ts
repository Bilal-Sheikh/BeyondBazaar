import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
	const headersList = headers();
	const clerkId = headersList.get("ClerkId");

	const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } =
		await req.json();

	if (!clerkId) {
		return NextResponse.json({
			success: false,
			message: "(API) Clerk id not found in headers",
		});
	}
	// console.log("(API) USER ID IN payment-verify ::::::::::::::::::", clerkId);
	// return NextResponse.json({ success: "REACHED API payment-verify" });

	const body = razorpay_order_id + "|" + razorpay_payment_id;
	// console.log("id==", body);

	const expectedSignature = crypto
		.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
		.update(body.toString())
		.digest("hex");

	const isAuthentic = expectedSignature === razorpay_signature;

	if (isAuthentic) {
		console.log("(API) Payment verification successful ADDING TO DB::::::::");

		await prisma.payment
			.create({
				data: {
					razorpay_order_id,
					razorpay_payment_id,
					razorpay_signature,
					amount: amount,
					userId: clerkId,
				},
			})
			.then(() => console.log("(API) Payment DATABASE created successfully"))
			.catch((err) => console.log(err));

		return NextResponse.json({
			success: true,
			message: "(API) Payment verification successfully",
		});
	} else {
		return NextResponse.json({
			success: false,
			message: "(API) Payment verification failed",
		});
	}
}
