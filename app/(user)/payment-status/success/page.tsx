"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { BASE_URL } from "@/config";

export default function Success() {
	const searchParams = useSearchParams();
	const productId = searchParams.get("product-id");
	const orderId = searchParams.get("order-id");
	const paymentId = searchParams.get("payment-id");
	const { user } = useUser();

	if (productId) {
		useEffect(() => {
			// console.log("GOT PRODUCT ID::::::::::::::::::::::::::::::::", productId);
			try {
				axios
					.post(
						`${BASE_URL}/api/checkout/buy-now`,
						{},
						{ headers: { UserClerkId: user?.id, ProductId: productId } }
					)
					.then((res) => {
						// console.log("CHECKOUT SUCCESSFULL::::::::::::::::::::::::::::");
					});
			} catch (error) {
				console.log(
					"ERROR IN AXIOS /api/checkout/buy-now::::::::::::::::::::::::::::::::::::::::",
					error
				);
			}
		}, []);
	} else {
		useEffect(() => {
			// console.log("GOT paymentId orderId::::::::::::::::", paymentId, orderId);
			try {
				axios
					.post(
						`${BASE_URL}/api/checkout`,
						{},
						{ headers: { UserClerkId: user?.id } }
					)
					.then((res) => {
						// console.log("CHECKOUT SUCCESSFULL::::::::::::::::::::::::::::");
					});
			} catch (error) {
				console.log(
					"ERROR IN AXIOS /api/checkout::::::::::::::::::::::::::::::::::::::::",
					error
				);
			}
		}, []);
	}

	return (
		<div className="py-10 px-5 w-full h-screen lg:h-screen">
			<div className="flex flex-wrap justify-between items-center border-b pb-3">
				<div className="flex flex-auto justify-start items-center mt-10 scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0">
					Payment
					<div className="text-green-700 ml-2 scroll-m-20 text-3xl font-bold tracking-tight transition-colors">
						Successful
					</div>
				</div>

				<Link href={`${BASE_URL}/account/purchases`}>
					<Button className="gap-2 mt-5 lg:mt-0">
						<History size={17} /> View Your Purchase
					</Button>
				</Link>
			</div>

			<div className="flex flex-col lg:flex-row justify-center items-center pt-10 gap-5 lg:gap-20">
				<p>Your Payment Id : {paymentId}</p>
				<p>Your Order Id : {orderId}</p>
			</div>
		</div>
	);
}
