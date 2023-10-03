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

export default function ProductsList({ products }: { products: Product }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	// const seller = products.data.firstName + " " + products.data.lastName;
	// const sellerId = products.data.clerkId;

	return (
		<>
			{products.length === 0 && (
				<div className="my-40 lg:my-52 place-content-center text-center text-2xl font-bold">
					No products found. Please try refreshing the page
				</div>
			)}
			{products.map((product) => (
				<Card className="w-[400px] m-6" key={product.id}>
					<CardHeader
						className="cursor-pointer"
						onClick={() => router.push(`/products/${product.id}`)}
					>
						<div className="flex justify-between items-center">
							<div>
								<Badge className="">{product.category}</Badge>
							</div>
							<div>
								<Button variant="outline" size="icon">
									<Heart size={17} />
								</Button>
							</div>
						</div>
						<div className="flex flex-col space-y-1.5">
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
						<div className="grid w-full items-center gap-4">
							<CardTitle
								onClick={() => router.push(`/products/${product.id}`)}
								className="cursor-pointer line-clamp-2 text-lg hover:text-blue-500 font-semibold tracking-tight transition-colors first:mt-0"
							>
								{product.name}
							</CardTitle>
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
						<div className="w-60">
							<Button disabled={isLoading} className="w-full">
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								Add to Cart
							</Button>
						</div>
					</CardFooter>
				</Card>
			))}
		</>
	);
}
