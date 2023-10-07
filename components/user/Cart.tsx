"use client";

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
import { prisma } from "@/lib/db";
import { currentUser, useUser } from "@clerk/nextjs";
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
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Cart() {
	const { isSignedIn, user } = useUser();
	const [cartItems, setCartItems] = React.useState([]);
	const [updateState, setUpdateState] = React.useState(0);
	const [isLoading, setIsLoading] = React.useState(false);
	const { toast } = useToast();

	React.useEffect(() => {
		if (isSignedIn) {
			try {
				axios
					.get("http://localhost:3000/api/get-cart", {
						headers: {
							ClerkId: user.id,
						},
					})
					.then((res) => {
						setCartItems(res.data.cart);
					});
			} catch (error) {
				console.log(
					"ERROR IN GETIING CART ::::::::::::::::::::::::::::::",
					error
				);
			}
		}
	}, [user, updateState]);

	console.log("CART ITEMS::::::::::::::::::::::::::::::::::", cartItems);

	const handlePlusClick = (item) => {
		const cartId = item.id;
		const productId = item.productId;
		const newQuantity = item.quantity + 1;

		if (newQuantity > item.product.stockQuantity) {
			toast({
				variant: "destructive",
				title: "Stock Limit Reached",
				description: `❗ Stock Limit Reached. Cant order more than ${item.product.stockQuantity} items`,
				duration: 3000,
			});
			return;
		}

		updateCartQuantity(cartId, productId, newQuantity);
	};
	const handleMinusClick = (item) => {
		const cartId = item.id;
		const productId = item.productId;
		const newQuantity = item.quantity - 1;

		if (newQuantity <= 0) {
			toast({
				variant: "destructive",
				title: "Can't be less than 0",
				description: `❗ Quantity can't be less than 0. If you want to delete the item please click the Delete Icon`,
				duration: 3000,
			});
			return;
		}

		updateCartQuantity(cartId, productId, newQuantity);
	};
	const handleDeleteClick = (item) => {
		const cartId = item.id;
		const productId = item.productId;

		try {
			setIsLoading(true);

			axios
				.delete("/api/update-cart", {
					headers: {
						ClerkId: user.id,
						ProductId: productId,
						CartId: cartId,
					},
				})
				.then((res) => {
					setUpdateState((state) => state + 1);
					setIsLoading(false);
				});
		} catch (error) {
			console.log(
				"ERROR IN AXIOS /api/update-cart:::::::::::::::::::::::::",
				error
			);
		}
	};

	const updateCartQuantity = async (cartId, productId, newQuantity) => {
		try {
			setIsLoading(true);

			axios
				.post(
					"/api/update-cart",
					{},
					{
						headers: {
							ClerkId: user.id,
							CartId: cartId,
							ProductId: productId,
							Quantity: newQuantity,
						},
					}
				)
				.then((res) => {
					setUpdateState((state) => state + 1);
					setIsLoading(false);
				});
		} catch (error) {
			console.log(
				"ERROR in AXIOS /api/cart-quantity:::::::::::::::::::::::::::::::::::",
				error
			);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="relative">
					<Button
						variant="outline"
						size="icon"
						onClick={() => setUpdateState((state) => state + 1)}
					>
						<ShoppingCart size={17} />
						{user && (
							<div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-700 text-[11px] font-medium text-white">
								{cartItems.length}
							</div>
						)}
					</Button>
				</div>
			</SheetTrigger>
			<SheetContent className="sm:max-w-xl">
				{!isSignedIn ? (
					<div className="flex flex-col py-64 justify-center items-center">
						<div className="pb-5">Please Sign in first</div>
						<Link
							href={"/sign-in"}
							className={cn(buttonVariants({ variant: "outline" }))}
						>
							Sign In
						</Link>
					</div>
				) : (
					<>
						<SheetHeader>
							<SheetTitle>Cart: {cartItems.length} Products</SheetTitle>
							<SheetDescription>
								Make changes in your cart here. Proceed to checkout when you're
								done.
							</SheetDescription>
						</SheetHeader>

						<Separator className="my-5" />

						<ScrollArea className="h-4/6 md:h-[550px] w-full md:pr-4">
							<div className="grid gap-4">
								{cartItems.map((item) => (
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
																Total Price: ${" "}
																{item.product.price * item.quantity}
															</p>
														</div>
														<div className="justify-start flex md:flex-1 md:justify-end items-center gap-2">
															<Button
																disabled={isLoading}
																variant={"outline"}
																size={"icon"}
																onClick={() => handleMinusClick(item)}
															>
																<Minus size={10} />
															</Button>

															<Label
																className="justify-center items-center"
																key={item.id}
															>
																{isLoading ? (
																	<Loader2 className="mr-2 h-4 w-4 animate-spin" />
																) : (
																	<>{item.quantity}</>
																)}
															</Label>

															<Button
																disabled={isLoading}
																variant={"outline"}
																size={"icon"}
																onClick={() => handlePlusClick(item)}
															>
																<Plus size={10} />
															</Button>
															<Button
																disabled={isLoading}
																variant={"outline"}
																size={"icon"}
																onClick={() => handleDeleteClick(item)}
															>
																<Trash size={17} />
															</Button>
														</div>
													</div>
												</CardTitle>
											</div>
										</CardHeader>
									</Card>
								))}
							</div>
						</ScrollArea>

						<Separator className="my-3" />
						<SheetFooter>
							<SheetClose asChild>
								<Button type="submit" className="w-full">
									Proceed to Checkout
								</Button>
							</SheetClose>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
