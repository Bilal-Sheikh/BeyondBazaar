"use client";

import React from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function BuyProduct({ clerkId, grandTotal, productId }) {
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();

	const handlePayment = async () => {
		setIsLoading(true);

		const KEY_ID = process.env.RAZORPAY_KEY_ID;
		console.log(KEY_ID);

		const { data } = await axios.post(
			"/api/razorpay/orders",
			{ amount: grandTotal },
			{ headers: { ClerkId: clerkId } }
		);

		console.log("ORDER ID::::::::::::::::::::::::::", data.order.id);

		const options = {
			key: KEY_ID,
			name: "Beyond Bazzar",
			currency: data.order.currency,
			amount: data.order.amount,
			order_id: data.order.id,
			description: "Test payment for Beyond Bazzar",
			handler: async function (response) {
				// console.log("RAZORPAY HANDLER RESPONSE::::::::::::::", response);

				const { data } = await axios.post(
					"/api/razorpay/payment-verify",
					{
						razorpay_payment_id: response.razorpay_payment_id,
						razorpay_order_id: response.razorpay_order_id,
						razorpay_signature: response.razorpay_signature,
						amount : grandTotal,
					},
					{ headers: { ClerkId: clerkId } }
				);

				// console.log("PAYMENT VERIFY RES::::::::::::::::::::", data);

				if (data?.success === true) {
					if (productId) {
						console.log("REDIRECTING TO PRODUCT ID::::::::::::::");
						router.push(
							`/payment-status/success?
							product-id=${productId}
							&order-id=${response.razorpay_order_id}
							&payment-id=${response.razorpay_payment_id}`
						);
					} else {
						console.log("REDIRECTING::::::::::::::");
						router.push(
							`/payment-status/success?
							payment-id=${response.razorpay_payment_id}
							&order-id=${response.razorpay_order_id}`
						);
					}
				} else {
					alert("Payment failed. Please try again. Contact support for help");
					router.push(
						`/payment-status/failure?
						payment-id=${response.razorpay_payment_id}
						&order-id=${response.razorpay_order_id}`
					);
				}
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();

		paymentObject.on("payment.failed", function (response) {
			alert("Payment failed. Please try again. Contact support for help");
		});
	};

	return (
		<Button className="w-full" onClick={handlePayment} disabled={isLoading}>
			{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
			Place Order
		</Button>
	);
}
