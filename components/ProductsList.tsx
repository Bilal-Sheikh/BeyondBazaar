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
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
	Divide,
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

export default function ProductsList({ productsEntries, sellerId } : {productsEntries: any, sellerId: string}) {
	const router = useRouter();
	// const seller = products.data.firstName + " " + products.data.lastName;
	// const sellerId = products.data.clerkId;

	const handleDelete = async (productId) => {
		console.log("DELETION STARTED FOR PRODUCT :::::::::::::::::::", productId);
		try {
			const { data } = await axios.delete(
				"http://localhost:3000/api/delete-product",
				{
					headers: {
						ProductId: productId,
						ClerkId: sellerId,
					},
				}
			);

			if (data.success === true) {
				console.log("PRODUCT DELETED :::::::::::::::::::", data.message);
				router.refresh();
			}
		} catch (error) {
			console.log("ERRORS :::::::::::::::::", error);
		}
	};

	return (
		<>
			{productsEntries.length === 0 && (
				<div className="my-40 lg:my-52 place-content-center text-center text-2xl font-bold">
					No products found. Please add some products.
				</div>
			)}
			{productsEntries.map((product) => (
				<Card className="w-[300px] m-2" key={product.id}>
					<CardHeader>
						<div className="flex justify-between items-center">
							<div>
								<Badge className="">{product.category}</Badge>
							</div>
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<MoreVertical />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>Options</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<Link
												href={`/view-products/${product.id}`}
												className="flex flex-auto justify-start items-start"
											>
												<Pencil className="mr-2 h-4 w-4" />
												Edit
											</Link>
										</DropdownMenuItem>
										<AlertDialog>
											<AlertDialogTrigger className="text-red-600 flex flex-auto justify-center items-center px-2">
												<Trash className="mr-2 h-4 w-4" /> Delete
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Are you absolutely sure you want to delete this
														item?
													</AlertDialogTitle>
													<AlertDialogDescription>
														This action cannot be undone. This will permanently
														delete your item and remove your product from our
														servers.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => handleDelete(product.id)}
													>
														Delete
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
						<div className="flex flex-col space-y-1.5">
							<AspectRatio ratio={1 / 1}>
								<Image
									src={product.imageUrl}
									alt="product"
									width={250}
									height={150}
									className="rounded-md h-auto w-auto"
								/>
							</AspectRatio>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<CardTitle className="line-clamp-4 text-lg font-semibold tracking-tight transition-colors first:mt-0">
								{product.name}
							</CardTitle>
							<CardDescription className="line-clamp-4 text-sm text-muted-foreground first:mt-0">
								{product.description}
							</CardDescription>
							<div className="flex space-y-1 justify-between items-center">
								<div>
									<Label>Price: </Label>
									<br />
									<Label className="scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0">
										$ {product.price}
									</Label>
								</div>
								<div>
									<Label className="scroll-m-20 pb-2 text-lg tracking-tight transition-colors first:mt-0">
										Stocks: {product.stockQuantity}
									</Label>
								</div>
							</div>
						</div>
					</CardContent>
					{/* <CardFooter>
						<p className="text-sm text-muted-foreground">
							Product by: <br />
							{seller}
						</p>
					</CardFooter> */}
				</Card>
			))}
		</>
	);
}
