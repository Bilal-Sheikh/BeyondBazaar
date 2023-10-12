"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { History, RotateCcw } from "lucide-react";
import { BASE_URL } from "@/config";

export default function Failure() {
	const searchParams = useSearchParams();
	const paymentId = searchParams.get("payment-id");
	const orderId = searchParams.get("order-id");
	const router = useRouter();

	return (
		<div className="py-10 px-5 w-full h-full lg:h-screen">
			<div className="flex flex-wrap justify-between items-center border-b pb-3">
				<div className="flex flex-auto justify-start items-center mt-10 scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0">
					Payment
					<div className="text-red-700 ml-2 scroll-m-20 text-3xl font-bold tracking-tight transition-colors">
						Failed
					</div>
				</div>

				<Link href={`${BASE_URL}/checkout`}>
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
