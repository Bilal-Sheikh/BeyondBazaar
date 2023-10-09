"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function Success() {
	const searchParams = useSearchParams();
	const paymentId = searchParams.get("payment-id");
	const orderId = searchParams.get("order-id");
	const router = useRouter();
	const { user, isSignedIn } = useUser();

	useEffect(() => {
		if (isSignedIn && paymentId && orderId) {
			try {
				axios.post(
					"/api/checkout",
					{},
					{
						headers: {
							ClerkId: user.id,
						},
					}
				);
				console.log("CHECKOUT SUCCESSFULL::::::::::::::::::::::::::::::::::::");
			} catch (error) {
				console.log(
					"ERROR IN AXIOS /api/checkout::::::::::::::::::::::::::::::::::::::::",
					error
				);
			}
		}
	}, []);

	return (
		<div>
			Success <br />
			PAYMENT ID :{JSON.stringify(paymentId)} <br />
			ORDER ID :{JSON.stringify(orderId)}
		</div>
	);
}
