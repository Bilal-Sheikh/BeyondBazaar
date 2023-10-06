import Navbar from "../Navbar";
import gaming from "@/public/gaming.jpg";
import watches from "@/public/watches.jpg";
import headphones from "@/public/headphones.jpg";
import mobiles from "@/public/mobiles.jpg";
import { prisma } from "@/lib/db";
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

export default async function UserDashboard() {
	let valuePicks;

	try {
		valuePicks = await prisma.product.findMany({
			orderBy: {
				price: "asc",
			},
			take: 4,
		});
	} catch (error) {
		console.log(
			"ERROR in components/user/UserDashboard.tsx::::::::::::::::::::::::",
			error
		);
	}
	// console.log("VALUE PICKS :::::::::::::::::::::::::::::::::::", valuePicks);

	return (
		<div>
			<Navbar />
			{/* <div>{JSON.stringify(prod)} works </div>  */}

			<section className="space-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:py-40">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
						The
						<span className="bg-gradient-to-r from-green-400 to-indigo-600 bg-clip-text text-transparent">
							{" "}
							BEST{" "}
						</span>
						E-commerce website in the world ;)
					</h1>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						Choose from a wide variety of products, including electronics,
						clothing, accessories, appliances, and more.
					</p>
				</div>
			</section>

			<section className="space-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:py-36">
				<div className="container flex max-w-full flex-col items-center gap-4 text-center">
					<h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
						Browse from Categories
					</h2>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						Find the products you're looking for in a variety of categories.
					</p>

					<div className="relative grid grid-cols-2 lg:grid-cols-4 justify-center rounded-xl gap-4 pt-5">
						<div className="overflow-hidden rounded-xl">
							<Link href={"/products?category=GAMING"}>
								<div className="relative h-full">
									<Image
										src={gaming}
										alt="clothing"
										width={250}
										height={330}
										className="h-full transition-all hover:scale-105 rounded-xl"
									/>

									<div className="absolute flex top-0 left-0 bg-zinc-950/70 transition-colors hover:bg-zinc-950/75 text-white p-2 w-full h-20 justify-start">
										<h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
											Gaming
										</h2>
									</div>
								</div>
							</Link>
						</div>
						<div className="overflow-hidden rounded-xl">
							<Link href={"/products?category=WATCHES"}>
								<div className="relative h-full">
									<Image
										src={watches}
										alt="accessories"
										width={250}
										height={330}
										className="h-full transition-all hover:scale-105 rounded-xl"
									/>
									<div className="absolute flex top-0 left-0 bg-zinc-950/70 transition-colors hover:bg-zinc-950/75 text-white p-2 w-full h-20 justify-start">
										<h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
											Watches
										</h2>
									</div>
								</div>
							</Link>
						</div>
						<div className="overflow-hidden rounded-xl">
							<Link href={"/products?category=HEADPHONES"}>
								<div className="relative h-full">
									<Image
										src={headphones}
										alt="electronics"
										width={250}
										height={330}
										className="h-full transition-all hover:scale-105 rounded-xl"
									/>
									<div className="absolute flex top-0 left-0 bg-zinc-950/70 transition-colors hover:bg-zinc-950/75 text-white p-2 w-full h-20 justify-start">
										<h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
											Headphones
										</h2>
									</div>
								</div>
							</Link>
						</div>
						<div className="overflow-hidden rounded-xl">
							<Link href={"/products?category=MOBILES"}>
								<div className="relative h-full">
									<Image
										src={mobiles}
										alt="mobiles"
										width={250}
										height={330}
										className="h-full transition-all hover:scale-105 rounded-xl"
									/>
									<div className="absolute flex top-0 left-0 bg-zinc-950/70 transition-colors hover:bg-zinc-950/75 text-white p-2 w-full h-20 justify-start">
										<h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
											Mobiles
										</h2>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className="space-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:py-36">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
						Top Sellers
					</h2>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						Here are the products top 4 best selling products for this month
					</p>
				</div>
			</section>

			<section className="space-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:py-36">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
						Value for Money Picks
					</h2>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						Explore our curated collection of budget-friendly items that deliver
						quality without breaking the bank
					</p>

					<div className="relative grid grid-cols-1 lg:grid-cols-4 justify-center rounded-xl gap-4 pt-5">
						{valuePicks?.map((product) => (
							<Card className="w-full" key={product.id}>
								<CardHeader>
									{/* PC */}
									<div className="hidden lg:flex lg:flex-col lg:space-y-1.5 cursor-pointer">
										<Link href={`/products/${product.id}`}>
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
										</Link>
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
											<Link href={`/products/${product.id}`}>
												<CardTitle className="cursor-pointer line-clamp-2 text-lg hover:text-blue-500 font-semibold tracking-tight transition-colors first:mt-0 justify-start text-start">
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
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
