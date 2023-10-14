"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/config";
import { useUser } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Minus, Plus, ShoppingCart, Trash } from "lucide-react";
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

interface Cart {
	id: string;
	productId: string;
	quantity: number;
	product: {
		id: number;
		name: string;
		price: number;
		image: string;
		imageUrl: string;
		stockQuantity: number;
	};
}

export function Cart() {
	const router = useRouter();
	const { toast } = useToast();
	const { isSignedIn, user } = useUser();
	const [cartItems, setCartItems] = useState<Cart[]>([]);
	const [updateState, setUpdateState] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isSignedIn) {
			try {
				axios
					.get(`${BASE_URL}/api/get-cart`, {
						headers: {
							ClerkId: user.id,
						},
					})
					.then((res) => {
						setCartItems(res.data.cart);
					});
			} catch (error) {
				console.log(
					"ERROR IN AXIOS components/user/Cart.tsx /api/get-cart ::::::::::::::::::::::::::::::",
					error
				);
			}
		}
	}, [user, updateState]);

	// console.log("CART ITEMS::::::::::::::::::::::::::::::::::", cartItems);

	const handlePlusClick = (item: any) => {
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
	const handleMinusClick = (item: any) => {
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
	const handleDeleteClick = (item: any) => {
		const cartId = item.id;
		const productId = item.productId;

		try {
			setIsLoading(true);

			axios
				.delete(`${BASE_URL}/api/update-cart`, {
					headers: {
						ClerkId: user?.id,
						ProductId: productId,
						CartId: cartId,
					},
				})
				.then((res) => {
					setUpdateState((state) => state + 1);
					setIsLoading(false);
					router.refresh();
				});
		} catch (error) {
			console.log(
				"ERROR IN AXIOS /api/update-cart:::::::::::::::::::::::::",
				error
			);
		}
	};

	const updateCartQuantity = async (
		cartId: number,
		productId: number,
		newQuantity: number
	) => {
		try {
			setIsLoading(true);
			axios
				.post(
					`${BASE_URL}/api/update-cart`,
					{},
					{
						headers: {
							ClerkId: user?.id,
							CartId: cartId,
							ProductId: productId,
							Quantity: newQuantity,
						},
					}
				)
				.then((res) => {
					setUpdateState((state) => state + 1);
					setIsLoading(false);
					router.refresh();
				});
		} catch (error) {
			console.log(
				"ERROR in AXIOS /api/update-cart:::::::::::::::::::::::::::::::::::",
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
							href={`${BASE_URL}/sign-in`}
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
													<Link
														href={`${BASE_URL}/products/${item.product.id}`}
													>
														<p className="hover:text-blue-500 cursor-pointer pt-2 md:pt-0 line-clamp-1 text-sm md:text-xl tracking-tight transition-colors">
															{item.product.name}
														</p>
													</Link>
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
								<Link
									href={`${BASE_URL}/checkout`}
									prefetch={false}
									className="w-full"
								>
									<Button type="submit" className="w-full">
										Proceed to Checkout
									</Button>
								</Link>
							</SheetClose>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
