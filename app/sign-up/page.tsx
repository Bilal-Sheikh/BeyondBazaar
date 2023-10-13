"use client";

import Link from "next/link";
import Image from "next/image";
import logoBlack from "@/public/logoBlack.png";
import shopping from "@/public/shopping.jpg";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { BASE_URL } from "@/config";
import { SignUpForm } from "@/components/sign-up-form";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Sign Up",
	description: "Sign up to Beyond Bazzar.",
};

export default function SignUp() {
	return (
		<div className="container relative grid max-w-none h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<Link
				href={`${BASE_URL}/sign-in`}
				className={cn(
					buttonVariants({ variant: "outline" }),
					"absolute right-4 top-4 md:right-8 md:top-8"
				)}
			>
				Login
			</Link>

			<Link
				href={`${BASE_URL}`}
				className="h-32 w-32 absolute left-4 top-4 md:right-8 md:top-8"
			>
				<Image alt="Logo" src={logoBlack} />
			</Link>

			<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
				<Image src={shopping} alt="bg image" layout="fill" objectFit="cover" />

				<div className="relative flex items-start justify-start h-32 w-32">
					<Link href={`${BASE_URL}`}>
						<Image alt="Logo" src={logoBlack} />
					</Link>
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;Shop till you drop with our seamless and user-friendly
							e-commerce app, offering a wide range of products and convenient
							shopping experience.&rdquo;
						</p>
					</blockquote>
				</div>
			</div>
			<SignUpForm />
		</div>
	);
}
