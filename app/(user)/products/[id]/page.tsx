"use client";

import axios from "axios";
import Image from "next/image";
import Loading from "./loading";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	ChevronDown,
	ChevronUp,
	CreditCard,
	Loader2,
	ShoppingCart,
} from "lucide-react";

interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	image: string;
	imageUrl: string;
	stockQuantity: number;
	category: string;
	postedById: string;
	sales: number;
	productRevenue: number;
	createdAt: Date;
	updatedAt: Date;
	postedBy: {
		id: number;
		firstName: string;
		lastName: string;
		createdAt: string;
		attributes: {
			image_url: string;
		};
	};
}

export default function ViewProduct({ params }: { params: { id: string } }) {
	const productId = params.id;
	const router = useRouter();
	const ref = useRef(null);
	const [open, setOpen] = useState(false);
	const [exist, setExist] = useState(false);
	const [product, setProduct] = useState<Product>();
	const [isFetched, setIsFetched] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [showReadMore, setShowReadMore] = useState(false);
	const { isSignedIn, user } = useUser();
	const { toast } = useToast();

	useEffect(() => {
		try {
			axios
				.get(`/api/get-product`, {
					headers: {
						ProductId: productId,
					},
				})
				.then((res) => {
					setProduct(res.data.product);
					setIsFetched(false);
				});

			if (isSignedIn) {
				try {
					axios
						.get(`/api/check-cart`, {
							headers: {
								ClerkId: user.id,
								ProductId: productId,
							},
						})
						.then((res) => {
							if (res.data.exists === true) {
								setExist(true);
							}
						});
				} catch (error) {
					console.log(
						"ERROR in AXIOS app/(user)/products/[id]/page.tsx /api/check-cart"
					);
				}
			}
		} catch (error) {
			console.log("ERRORS in AXIOS app/(user)/products/[id]/page.tsx", error);
		}
	}, [user]);

	//Read More ref
	useEffect(() => {
		if (ref.current) {
			// console.log(
			// 	"REF OUTPUT :::::::::::::::::::::::::::::::",
			// 	ref.current.scrollHeight,
			// 	ref.current.clientHeight
			// );

			//@ts-ignore
			setShowReadMore(ref.current.scrollHeight !== ref.current.clientHeight);
		}
	}, [product]);

	const seller =
		product?.postedBy?.firstName + " " + product?.postedBy?.lastName;

	const jsonDate: any = product?.postedBy?.createdAt;
	const dateObject = new Date(jsonDate);
	const options = { year: "numeric", month: "long" };
	//@ts-ignore
	const formattedDate = dateObject.toLocaleDateString("en-US", options);

	function handleAddToCart() {
		if (!isSignedIn) {
			toast({
				variant: "default",
				title: "Sign In",
				description: " ❗ Please Sign In first",
				duration: 3000,
			});
			router.push(`/sign-in`);
		} else {
			setIsLoading(true);
			try {
				axios
					.post(
						`/api/add-to-cart`,
						{},
						{
							headers: {
								ClerkId: user.id,
								ProductId: productId,
							},
						}
					)
					.then((res) => {
						// console.log("RES DATA :::::::::::::::::::::::", res.data);
						setIsLoading(false);
						setExist(true);
						toast({
							variant: "default",
							title: "Success",
							description: " ✅ Added to Cart",
							duration: 3000,
						});
					});
			} catch (error) {
				console.log(
					"ERROR in AXIOS app/(user)/products/[id]/page.tsx /api/add-to-cart",
					error
				);
			}
		}
	}

	return (
		<>
			{isFetched ? (
				<Loading />
			) : (
				<div>
					{!product ? (
						<div className="flex justify-center items-center h-screen">
							<div className="text-center">
								<h1 className="text-2xl font-semibold tracking-tight lg:text-5xl">
									Product not found
								</h1>
							</div>
						</div>
					) : (
						<div className="px-10 py-5 lg:py-20">
							<section className="flex-auto block lg:grid lg:grid-cols-2 lg:gap-10">
								{/* PC */}
								<div className="hidden lg:block lg:relative">
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

								{/* MOBILE */}
								<div className="block lg:hidden">
									<AspectRatio ratio={4 / 5}>
										<Image
											alt="productImg"
											src={product?.imageUrl}
											fill
											objectFit="contain"
											loading="lazy"
										/>
									</AspectRatio>
								</div>

								<div>
									<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
										{product?.name}
									</h1>

									<div className="flex flex-auto justify-between items-center mt-8">
										<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight underline underline-offset-4">
											{"$ "} {product?.price.toLocaleString("en-US")}
										</h3>
										{product?.stockQuantity <= 0 ? (
											<h4 className="scroll-m-20 text-xl text-red-700 font-semibold tracking-tight">
												Out of Stock! :(
											</h4>
										) : (
											<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
												Available Stock: {product?.stockQuantity}
											</h4>
										)}
									</div>

									<Separator className="my-6" />

									<p
										className={
											open ? "whitespace-pre-wrap leading-7" : "custom-desc"
										}
										ref={ref}
									>
										{product?.description}
									</p>
									{showReadMore && (
										<Button
											onClick={() => setOpen(!open)}
											variant="link"
											className="text-blue-500"
										>
											{open ? (
												<>
													Read less <ChevronUp />
												</>
											) : (
												<>
													Read more <ChevronDown />
												</>
											)}
										</Button>
									)}
									<Separator className="my-6" />

									<div className="flex flex-auto justify-center items-center w-full gap-4">
										{/* <div>
											<Button variant="outline" size="icon">
												<Heart size={17} />
											</Button>
										</div> */}
										<div className="w-full">
											<Button
												size="icon"
												className="w-full"
												disabled={product.stockQuantity <= 0}
											>
												<Link
													href={`/checkout/${productId}/buy-now`}
													className="flex flex-1 justify-center items-center w-full h-full gap-3"
												>
													<CreditCard size={17} />
													Buy Now
												</Link>
											</Button>
										</div>
										<div className="w-full">
											{exist ? (
												<Button variant={"outline"} className="w-full">
													Already in Cart
												</Button>
											) : (
												<Button
													disabled={isLoading || product.stockQuantity <= 0}
													className="w-full gap-3"
													onClick={handleAddToCart}
												>
													{isLoading && (
														<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													)}
													<ShoppingCart size={17} />
													Add to Cart
												</Button>
											)}
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
				</div>
			)}
		</>
	);
}
