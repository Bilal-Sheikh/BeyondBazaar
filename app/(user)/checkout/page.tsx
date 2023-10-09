import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
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
	Info,
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
import { Separator } from "@/components/ui/separator";
import Loading from "./loading";
import PaymentButton from "@/components/user/PaymentButton";

async function getData(clerkId) {
	try {
		const res = await fetch("http://localhost:3000/api/get-cart", {
			headers: { ClerkId: clerkId },
			next: { revalidate: 0 },
			cache: "no-store",
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
		// <Loading />

		<div className="pt-10 px-5 w-full h-full">
			<h2 className="mt-10 scroll-m-20 border-b pb-3 text-3xl font-bold tracking-tight transition-colors first:mt-0">
				Checkout
			</h2>

			<div className="grid grid-rows-2 lg:flex lg:flex-1 lg:pt-5 lg:gap-4">
				<div className="w-full lg:w-2/3">
					{cart.length === 0 ? (
						<div className="py-32">
							<p className="text-center text-4xl font-bold tracking-tight	transition-colors">
								Your cart is empty
							</p>
						</div>
					) : (
						<>
							{cart.map((item) => (
								<div className="py-3">
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
													<Link href={`/products/${item.product.id}`}>
														<p className="hover:text-blue-500 cursor-pointer pt-2 md:pt-0 line-clamp-1 text-sm md:text-xl tracking-tight transition-colors">
															{item.product.name}
														</p>
													</Link>

													<div className="grid grid-rows-1 md:flex md:flex-1 md:justify-between md:pt-5">
														<div className="py-1">
															<p className="text-sm md:text-sm font-extralight">
																Item Price: $
																{item.product.price.toLocaleString("en-US")} x
																{item.quantity}
															</p>
															<p className="text-sm md:text-lg font-medium">
																Total Price: ${" "}
																{item.product.price * item.quantity}
															</p>
														</div>
													</div>
												</CardTitle>
											</div>
										</CardHeader>
									</Card>
								</div>
							))}
						</>
					)}
				</div>

				<div className="w-full lg:w-1/3">
					<div className="py-3">
						<Card>
							<CardHeader>
								<CardTitle>
									<p className="mt-10 scroll-m-20 border-b pb-3 text-xl font-bold tracking-tight transition-colors first:mt-0">
										Order Summary
									</p>
								</CardTitle>
							</CardHeader>

							<CardContent className="grid grid-rows-3">
								<div className="flex flex-auto justify-between items-center w-full">
									<p>Subtotal:</p>
									<p>
										$
										{cart.reduce(
											(acc, item) => acc + item.product.price * item.quantity,
											0
										)}
									</p>
								</div>
								<div className="flex flex-1 justify-between items-center w-full">
									<p>Shipping:</p>

									{cart.length === 0 ? <p>$0</p> : <p>$30</p>}
								</div>

								{cart.length === 0 ? (
									<></>
								) : (
									<div className="flex flex-1 justify-between items-center w-full">
										<div className="flex flex-auto justify-start items-center">
											Discount
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<Info
															className="ml-2"
															width={15}
															height={15}
															size={15}
														/>
													</TooltipTrigger>
													<TooltipContent>
														<p>On the house ;)</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</div>
										<p>10%</p>
									</div>
								)}
							</CardContent>
							<Separator />
							<CardFooter className="grid grid-rows-2">
								<div className="flex justify-between items-center w-full py-5">
									<p className="text-xl font-bold">Grand Total:</p>

									{cart.length === 0 ? (
										<p>$0</p>
									) : (
										<p className="text-xl font-bold">
											$
											{cart.reduce(
												(acc, item) => acc + item.product.price * item.quantity,
												0
											) +
												30 -
												(cart.reduce(
													(acc, item) =>
														acc + item.product.price * item.quantity,
													0
												) +
													30) *
													0.1}
										</p>
									)}
								</div>

								<div className="flex flex-auto justify-between items-center w-full gap-2">
									<Link href={"/products"} className="w-full">
										<Button variant="outline" className="w-full">
											Cancel Order
										</Button>
									</Link>

									<PaymentButton />
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
