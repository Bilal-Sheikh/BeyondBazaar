"use client";

import { Separator } from "@/components/ui/separator";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { prisma } from "@/lib/db";
import React from "react";
import products from "../page";
import Image from "next/image";
import axios from "axios";
import { ChevronsUpDown, Heart, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Loading from "./loading";

export default function ViewProduct({ params }: { params: { id: string } }) {
	const productId = params.id;
	const [product, setProduct] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [open, setOpen] = React.useState(false);
	const [showReadMore, setShowReadMore] = React.useState(false);
	const ref = React.useRef(null);

	React.useEffect(() => {
		try {
			axios
				.get("http://localhost:3000/api/get-product", {
					headers: {
						ProductId: productId,
					},
				})
				.then((res) => {
					setProduct(res.data.product);
					setLoading(false);
				});
		} catch (error) {
			console.log("ERRORS ::::::::::::::::::::::::::::::::", error);
		}
	}, []);

	React.useEffect(() => {
		if (ref.current) {
			console.log(
				"REF OUTPUT :::::::::::::::::::::::::::::::",
				ref.current.scrollHeight,
				ref.current.clientHeight
			);

			setShowReadMore(ref.current.scrollHeight !== ref.current.clientHeight);
		}
	}, [product]);

	const seller =
		product?.postedBy?.firstName + " " + product?.postedBy?.lastName;

	const jsonDate = product?.postedBy?.createdAt;
	const dateObject = new Date(jsonDate);
	const options = { year: "numeric", month: "long" };
	const formattedDate = dateObject.toLocaleDateString("en-US", options);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className="px-10 py-20">
					<section className="grid grid-cols-2 gap-10">
						<div className="relative">
							<div className="sticky top-24">
								<AspectRatio ratio={1 / 1}>
									<Image
										alt="productImg"
										src={product?.imageUrl}
										fill
										objectFit="contain"
										loading="lazy"
									/>
								</AspectRatio>
							</div>
						</div>

						<div>
							<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
								{product?.name}
							</h1>

							<div className="flex flex-auto justify-between items-center mt-8">
								<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight underline underline-offset-4">
									{"$ "} {product?.price}
								</h3>
								<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
									Available Stock: {product?.stockQuantity}
								</h4>
							</div>

							<Separator className="my-6" />

							{/* <p className="line-clamp-6 whitespace-pre-wrap leading-7">
								{product?.description}
							</p> */}

							<p
								className={
									open ? "whitespace-pre-wrap leading-7" : "custom-desc"
								}
								ref={ref}
							>
								{product?.description}
							</p>
							{showReadMore && (
								<Button onClick={() => setOpen(!open)} variant="link">
									{open ? "Read less" : "Read more"}
								</Button>
							)}
							<Separator className="my-6" />

							<div className="flex flex-auto justify-center items-center w-full gap-4">
								<div>
									<Button variant="outline" size="icon">
										<Heart size={17} />
									</Button>
								</div>
								<div className="w-full">
									<Button className="w-full">Buy Now</Button>
								</div>
								<div className="w-full">
									<Button className="w-full">Add to Cart</Button>
								</div>
							</div>
						</div>
					</section>

					<section className="mt-20">
						<blockquote className="mt-6 border-l-2 pl-6 italic">
							Product By:
							<HoverCard>
								<HoverCardTrigger asChild>
									<Button variant="link" className="italic text-base">
										{seller}
									</Button>
								</HoverCardTrigger>
								<HoverCardContent className="w-80">
									<div className="flex justify-start space-x-4">
										<Avatar>
											<AvatarImage
												src={product?.postedBy?.attributes?.image_url}
											/>
											<AvatarFallback>VC</AvatarFallback>
										</Avatar>
										<div className="space-y-1">
											<h4 className="text-sm font-semibold"> {seller}</h4>
											<div className="flex items-center pt-2">
												<span className="text-xs text-muted-foreground">
													Joined: {formattedDate}
												</span>
											</div>
										</div>
									</div>
								</HoverCardContent>
							</HoverCard>
						</blockquote>
					</section>
				</div>
			)}
		</>
	);
}
