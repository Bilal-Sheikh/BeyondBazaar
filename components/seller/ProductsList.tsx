"use client";

import * as React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import imgPlaceholder from "@/public/image placeholder.gif";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { useToast } from "../ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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

export default function ProductsList({
	productsEntries,
	sellerId,
}: {
	productsEntries: Product[];
	sellerId: string;
}) {
	const router = useRouter();
	const { toast } = useToast();

	const handleDelete = async (productId: number) => {
		// console.log("DELETION STARTED FOR PRODUCT :::::::::::::::::::", productId);
		try {
			const { data } = await axios.delete(`/api/delete-product`, {
				headers: {
					ProductId: productId,
					ClerkId: sellerId,
				},
			});

			if (data.success === true) {
				// console.log("PRODUCT DELETED :::::::::::::::::::", data.message);
				router.refresh();
				toast({
					variant: "default",
					title: "Deleted successfully",
					description: `✅ Product Deleted successfully`,
					duration: 3000,
				});
			} else {
				// console.log("PRODUCT DELETION FAILED ::::::::::::::", data.message);
				router.refresh();
				toast({
					variant: "destructive",
					title: "Deleted Operation Failed",
					description: `❗️ Product Deletion Failed`,
					duration: 3000,
				});
			}
		} catch (error) {
			console.log(
				"ERRORS IN AXIOS DELETE components/seller/ProductsList.tsx  :::::::::::::::::",
				error
			);
		}
	};

	return (
		<div className="flex flex-wrap justify-center items-center px-14">
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
									alt="product"
									src={product.imageUrl || imgPlaceholder}
									className="rounded-xl"
									fill
									priority={true}
								/>
							</AspectRatio>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<CardTitle className="line-clamp-2 text-lg font-semibold tracking-tight transition-colors first:mt-0">
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
				</Card>
			))}
		</div>
	);
}
