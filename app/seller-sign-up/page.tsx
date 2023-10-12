import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoBlack from "@/public/logoBlack.png";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/config";
import { buttonVariants } from "@/components/ui/button";
import { SellerSignUpForm } from "@/components/seller/seller-sign-up-form";

export default function page() {
	return (
		<div className=" p-8 md:p-10 lg:p-10">
			<div className="flex justify-between">
				<div className="relative w-32">
					<Link href={`${BASE_URL}`}>
						<Image alt="Logo" src={logoBlack} />
					</Link>
				</div>
				<div>
					<Link
						className={cn(buttonVariants({ variant: "link" }), "text-base")}
						href={`${BASE_URL}/sign-up`}
					>
						{"<- "} Go Back
					</Link>
				</div>
			</div>
			<SellerSignUpForm />
		</div>
	);
}
