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
import { Minus, Plus, ShoppingCart } from "lucide-react";
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

export function Cart() {
	const { isSignedIn, user } = useUser();
	const [cartItems, setCartItems] = React.useState([]);

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
	}, [user]);

	console.log("CART ITEMS::::::::::::::::::::::::::::::::::", cartItems);

	const handleMinusClick = () => {
		if (quantity > 0) {
			updateCartQuantity(item.id, quantity - 1);
			setQuantity(quantity - 1);
		}
	};
	const handlePlusClick = () => {
		updateCartQuantity(item.id, quantity + 1);
		setQuantity(quantity + 1);
	};

	const updateCartQuantity = async (productId, newQuantity) => {
		try {
			await axios.post("/update-cart", {
				productId,
				quantity: newQuantity,
			});
			// Assuming that the server responds with a success message or status code.
		} catch (error) {
			console.error("Error updating cart quantity:", error);
			// Handle error
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<ShoppingCart size={17} />
				</Button>
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
							<SheetTitle>Cart</SheetTitle>
							<SheetDescription>
								Make changes in your cart here. Proceed to checkout when you're
								done.
							</SheetDescription>
						</SheetHeader>
						<div className="grid gap-4 py-4">
							{cartItems.map((item) => (
								<Card>
									<CardHeader>
										<div className="flex flex-1 gap-2">
											<Image
												alt={item.product.name}
												src={item.product.imageUrl}
												width={100}
												height={100}
												objectFit="contain"
											/>

											<CardTitle>
												<p className="line-clamp-1 text-sm md:text-xl">
													{item.product.name}
												</p>
											</CardTitle>
										</div>
									</CardHeader>
									<CardContent className="flex flex-1 justify-between">
										<div>
											<p className="text-sm md:text-lg font-medium">
												Price: ${item.product.price.toLocaleString("en-US")}
											</p>
										</div>
										<div className="flex flex-1 justify-end items-center gap-2">
											<Button
												variant={"outline"}
												size={"icon"}
												onClick={handleMinusClick}
											>
												<Minus size={10} />
											</Button>

											<Label className="justify-center items-center">
												{item.quantity}
											</Label>

											<Button
												variant={"outline"}
												size={"icon"}
												onClick={handlePlusClick}
											>
												<Plus size={10} />
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button type="submit">Save changes</Button>
							</SheetClose>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
