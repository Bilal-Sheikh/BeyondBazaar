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
import Link from "next/link";
import { Product } from "@prisma/client";
import { useToast } from "../ui/use-toast";
import AddToCartButton from "./AddToCartButton";
import Loading from "@/app/(user)/products/loading";

export default function ProductsList({ products }: { products: Product }) {
	return (
		<div className="flex flex-col justify-center items-center mx-4 gap-5 lg:grid lg:grid-cols-3 lg:px-14 lg:gap-10">
			{products.map((product) => (
				<Card className="w-full" key={product.id}>
					<CardHeader>
						<div className="flex justify-between items-center">
							<div>
								<Link href={`/products/?category=${product.category}`}>
									<Badge className="cursor-pointer">{product.category}</Badge>
								</Link>
							</div>
							<div className="hidden lg:flex">
								<Button variant="outline" size="icon">
									<Heart size={17} />
								</Button>
							</div>
						</div>

						{/* PC */}
						<Link href={`/products/${product.id}`}>
							<div className="hidden lg:flex lg:flex-col lg:space-y-1.5 cursor-pointer">
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
						</Link>
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

							<div className="grid w-full h-16 top-0 gap-4">
								<Link href={`/products/${product.id}`}>
									<CardTitle className="cursor-pointer line-clamp-2 text-lg hover:text-blue-500 font-semibold tracking-tight transition-colors first:mt-0">
										{product.name}
									</CardTitle>
								</Link>
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
							{product.stockQuantity <= 0 ? (
								<Button disabled className="w-full" variant={"destructive"}>
									Out of Stock
								</Button>
							) : (
								<AddToCartButton
									key={product.id}
									productId={product.id}
									stock={product.stockQuantity}
								/>
							)}
						</div>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
