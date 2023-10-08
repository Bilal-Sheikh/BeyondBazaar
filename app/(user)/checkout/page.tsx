import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Delete,
	Loader2,
	Minus,
	Plus,
	ShoppingCart,
	Trash,
} from "lucide-react";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cookies } from "next/headers";

async function getData(clerkId) {

	try {
		const res = await fetch("http://localhost:3000/api/get-cart", {
			headers: { ClerkId: clerkId },
			next: { revalidate: 0 },
			cache : 'no-store'
		});
		return res.json();
	} catch (error) {
		console.log(
			"ERROR in app/(user)/checkout/page.tsx:::::::::::::::::::::::",
			error
		);
	}
}

export default async function Checkout() {
	const user = await currentUser();

	const { cart } = await getData(user.id);
	console.log("CHECKOUTT ITEMS :::::::::::::::::::::::::::::::::", cart);

	return (
		<div className="p-10 w-full h-screen">
			<h2 className="mt-10 scroll-m-20 border-b pb-3 text-3xl font-bold tracking-tight transition-colors first:mt-0">
				Checkout
			</h2>
			<div className="pt-5">
				{cart.map((item) => (
					<Card key={item.id}>
						<CardHeader>
							<div className="md:flex md:flex-1 md:gap-2">
								<Image
									alt={item.product.name}
									src={item.product.imageUrl}
									width={100}
									height={100}
									objectFit="contain"
								/>

								<CardTitle className="w-full">
									<p className="pt-2 md:pt-0 line-clamp-1 text-sm md:text-xl">
										{item.product.name}
									</p>

									<div className="grid grid-rows-2 md:flex md:flex-1 md:justify-between md:pt-5">
										<div className="py-1">
											<p className="text-sm md:text-sm font-extralight">
												Item Price: $
												{item.product.price.toLocaleString("en-US")} x{" "}
												{item.quantity}
											</p>
											<p className="text-sm md:text-lg font-medium">
												Total Price: $ {item.product.price * item.quantity}
											</p>
										</div>
									</div>
								</CardTitle>
							</div>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}
