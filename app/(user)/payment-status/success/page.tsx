"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function Success() {
	const searchParams = useSearchParams();
	const paymentId = searchParams.get("payment-id");
	const orderId = searchParams.get("order-id");
	const quantity = searchParams.get("quantity");
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
							UserClerkId: user.id,
							Quantity: quantity,
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
		<div className="py-10 px-5 w-full h-full lg:h-screen">
			<div className="flex flex-auto justify-start items-center border-b pb-3">
				<div className="mt-10 scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0">
					Payment
				</div>
				<div className="text-green-700 ml-2 scroll-m-20 text-3xl font-bold tracking-tight transition-colors">
					Successful
				</div>
			</div>

			<div className="flex flex-col lg:flex-row justify-center items-center pt-10 gap-5 lg:gap-20">
				<p>Your Payment Id : {paymentId}</p>
				<p>Your Order Id : {orderId}</p>
			</div>
		</div>
	);
}
