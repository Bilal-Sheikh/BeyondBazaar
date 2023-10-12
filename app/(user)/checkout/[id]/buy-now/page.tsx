import React from "react";
import Image from "next/image";
import Link from "next/link";
import BuyProduct from "@/components/razorpay/BuyProduct";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

async function getProduct(productId: number) {
	try {
		const product = await prisma.product.findUnique({
			where: { id: Number(productId) },
		});

		return product;
	} catch (error) {
		console.log(
			"ERROR IN PRISMA app/(user)/checkout/[id]/buy-now/page.tsx::::::::::::::::::::::::::::",
			error
		);
	}
}

export default async function BuyNowButton({
	params,
}: {
	params: { id: string };
}) {
	const productId = params.id;
	const user = await currentUser();

	const product = await getProduct(Number(productId));
	// console.log("PRODUCT::::::::::::::::::::::::::::::::::::::::::::::", product);
	if (product == null || product == undefined) {
		return (
			<div className="flex-col md:flex h-screen">
				<div className="flex-1 space-y-4 p-8 pt-6">
					<div className="py-32">
						<p className="text-center text-base lg:text-4xl font-bold tracking-tight transition-colors">
							Error fetching product
						</p>
					</div>
				</div>
			</div>
		);
	}

	const grandTotal = product.price + 30;
	// console.log("GRAND TOTAL ::::::::::::::::::::::::::::::::::::", grandTotal);

	// console.log("PRODUCTS ID:::::::::::::::::::::::::::::", productId);

	return (
		<div className="pt-10 px-5 w-full h-full">
			<h2 className="mt-10 scroll-m-20 border-b pb-3 text-3xl font-bold tracking-tight transition-colors first:mt-0">
				Checkout
			</h2>

			<div className="grid grid-rows-2 lg:flex lg:flex-1 lg:pt-5 lg:gap-4">
				<div className="w-full lg:w-2/3">
					<div className="py-3">
						<Card>
							<CardHeader>
								<div className="md:flex md:flex-1 md:gap-2">
									<Image
										alt={product.name}
										src={product.imageUrl}
										width={100}
										height={100}
										objectFit="contain"
									/>

									<CardTitle className="w-full">
										<Link href={`${BASE_URL}/products/${product.id}`}>
											<p className="hover:text-blue-500 cursor-pointer pt-2 md:pt-0 line-clamp-1 text-sm md:text-xl tracking-tight transition-colors">
												{product.name}
											</p>
										</Link>

										<div className="grid grid-rows-1 md:flex md:flex-1 md:justify-between md:pt-5">
											<div className="py-1">
												<p className="text-sm md:text-sm font-extralight">
													Item Price: ${product.price.toLocaleString("en-US")}
												</p>
												<p className="text-sm md:text-lg font-medium">
													Total Price: $ {product.price}
												</p>
											</div>
										</div>
									</CardTitle>
								</div>
							</CardHeader>
						</Card>
					</div>
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
									<p>$ {product.price}</p>
								</div>
								<div className="flex flex-1 justify-between items-center w-full">
									<p>Shipping:</p>
									<p>$30</p>
								</div>
							</CardContent>
							<Separator />
							<CardFooter className="grid grid-rows-2">
								<div className="flex justify-between items-center w-full py-5">
									<p className="text-xl font-bold">Grand Total:</p>
									<p className="text-xl font-bold">$ {grandTotal}</p>
								</div>

								<div className="flex flex-auto justify-between items-center w-full gap-2">
									<Link href={`${BASE_URL}/products`} className="w-full">
										<Button variant="outline" className="w-full">
											Cancel Order
										</Button>
									</Link>

									<BuyProduct
										clerkId={user?.id}
										grandTotal={grandTotal}
										productId={productId}
									/>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
