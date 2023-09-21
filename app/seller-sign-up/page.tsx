import { SellerSignUpForm } from "@/components/seller-sign-up-form";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoBlack from "@/public/logoBlack.png";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function page() {
	return (
		<>
			<div className=" p-8 md:p-10 lg:p-10">
				<div className="flex justify-between">
					<div className="relative w-32">
						<Link href={"/"}>
							<Image alt="Logo" src={logoBlack} />
						</Link>
					</div>
					<div>
						<Link
							className={cn(buttonVariants({ variant: "link" }), "text-base")}
							href={"/sign-up"}
						>
							{"<- "} Go Back
						</Link>
					</div>
				</div>
				<SellerSignUpForm />
			</div>
		</>
	);
}
