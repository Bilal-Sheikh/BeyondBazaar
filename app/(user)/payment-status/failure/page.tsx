"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function Failure() {
	const searchParams = useSearchParams();
	const paymentId = searchParams.get("payment-id");
	const orderId = searchParams.get("order-id");

	return (
		<div className="py-10 px-5 w-full h-full lg:h-screen">
			<div className="flex flex-wrap justify-between items-center border-b pb-3">
				<div className="flex flex-auto justify-start items-center mt-10 scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0">
					Payment
					<div className="text-red-700 ml-2 scroll-m-20 text-3xl font-bold tracking-tight transition-colors">
						Failed
					</div>
				</div>

				<Link href={`/checkout`}>
					<Button className="gap-2 mt-5 lg:mt-0">
						<RotateCcw size={17} /> Try Again?
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
