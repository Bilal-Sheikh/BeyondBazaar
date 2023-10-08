"use client";

import axios from "axios";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { currentUser, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
	Divide,
	Heart,
	Loader2,
	MoreHorizontal,
	MoreVertical,
	Pencil,
	Trash,
} from "lucide-react";
import {
	DropdownMenuLabel,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@prisma/client";
import { useToast } from "../ui/use-toast";
import AddToCartButton from "./AddToCartButton";

export default function ProductsList({ products }: { products: Product }) {
	const router = useRouter();
	// const [isLoading, setIsLoading] = React.useState(false);
	// const [exist, setExist] = React.useState(false);
	// const { toast } = useToast();
	// const { isSignedIn, user } = useUser();

	// function handleAddToCart(productId) {
	// 	if (!isSignedIn) {
	// 		toast({
	// 			variant: "default",
	// 			title: "Sign In",
	// 			description: " ❗ Please Sign In first",
	// 			duration: 3000,
	// 		});
	// 		router.push("/sign-in");
	// 	} else {
	// 		setIsLoading(true);
	// 		try {
	// 			axios
	// 				.post(
	// 					"/api/add-to-cart",
	// 					{},
	// 					{
	// 						headers: {
	// 							ClerkId: user.id,
	// 							ProductId: productId,
	// 						},
	// 					}
	// 				)
	// 				.then((res) => {
	// 					console.log("RES DATA :::::::::::::::::::::::", res.data);
	// 					setIsLoading(false);
	// 					setExist(true);
	// 					toast({
	// 						variant: "default",
	// 						title: "Success",
	// 						description: " ✅ Added to Cart",
	// 						duration: 3000,
	// 					});
	// 				});
	// 		} catch (error) {
	// 			console.log(
	// 				"ERRORS in http://localhost:3000/api/add-to-cart::::::::::::::::::::::::::::::::",
	// 				error
	// 			);
	// 		}
	// 	}
	// }

	return (
		<div className="flex flex-col justify-center items-center mx-4 gap-5 lg:grid lg:grid-cols-3 lg:px-14 lg:gap-10">
			{products.map((product) => (
				<Card className="w-full" key={product.id}>
					<CardHeader>
						<div className="flex justify-between items-center">
							<div>
								<Badge
									className="cursor-pointer"
									onClick={() =>
										router.push(`/products/?category=${product.category}`)
									}
								>
									{product.category}
								</Badge>
							</div>
							<div className="hidden lg:flex">
								<Button variant="outline" size="icon">
									<Heart size={17} />
								</Button>
							</div>
						</div>

						{/* PC */}
						<div
							className="hidden lg:flex lg:flex-col lg:space-y-1.5 cursor-pointer"
							onClick={() => router.push(`/products/${product.id}`)}
						>
							<AspectRatio ratio={16 / 9}>
								<Image
									alt="product"
									src={product.imageUrl}
									className="rounded-xl"
									fill
									objectFit="contain"
									priority={true}
								/>
							</AspectRatio>
						</div>
					</CardHeader>
					<CardContent>
						{/* MOBILE */}
						<div className="flex flex-auto w-full gap-4">
							<div className="flex flex-auto space-y-1.5 lg:hidden w-1/4">
								<AspectRatio ratio={1 / 1}>
									<Image
										alt="product"
										src={product.imageUrl}
										className="rounded-xl"
										fill
										objectFit="contain"
										priority={true}
									/>
								</AspectRatio>
							</div>

							<div className="grid w-full h-20 top-0 gap-4">
								<CardTitle
									onClick={() => router.push(`/products/${product.id}`)}
									className="cursor-pointer line-clamp-2 text-lg hover:text-blue-500 font-semibold tracking-tight transition-colors first:mt-0"
								>
									{product.name}
								</CardTitle>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex space-y-1 justify-between items-center">
						<div>
							<Label>Price: </Label>
							<br />
							<Label className="scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0">
								$ {product.price}
							</Label>
						</div>

						<div className="w-30 lg:w-2/3" key={product.id}>
							
							<AddToCartButton key={product.id} productId={product.id} />
							{/* {exist ? (
								<Button variant={"outline"} className="w-full">
									Already in Cart
								</Button>
							) : (
								<Button
									disabled={isLoading}
									className="w-full"
									onClick={() => handleAddToCart(product.id)}
									key={product.id}
								>
									{isLoading && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Add to Cart
								</Button>
							)} */}
						</div>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
