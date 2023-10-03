import React from "react";
import Navbar from "../Navbar";
import axios from "axios";
import clothing from "@/public/clothing.jpg";
import accessories from "@/public/accessories.jpg";
import electronics from "@/public/electronics.jpg";
import mobiles from "@/public/mobiles.jpg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";

export default async function UserDashboard() {
	// works
	// let prod
	// try {
	// 	const { data } = await axios.get("http://localhost:3000/api/view-products");
	// 	console.log("DATA", data);
	// 	prod = data
	// } catch (error) {
	// 	console.log(error);
	// }

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
							<div className="relative h-full">
								<Image
									src={clothing}
									alt="clothing"
									width={250}
									height={330}
									className="h-full transition-all hover:scale-105 rounded-xl"
								/>
								<div className="absolute flex top-0 left-0 bg-zinc-950/70 transition-colors hover:bg-zinc-950/75 text-white p-2 w-full h-20 justify-start">
									<h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
										Clothing
									</h2>
								</div>
							</div>
						</div>
						<div className="overflow-hidden rounded-xl">
							<div className="relative h-full">
								<Image
									src={accessories}
									alt="accessories"
									width={250}
									height={330}
									className="h-full transition-all hover:scale-105 rounded-xl"
								/>
								<div className="absolute flex top-0 left-0 bg-zinc-950/70 transition-colors hover:bg-zinc-950/75 text-white p-2 w-full h-20 justify-start">
									<h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
										Accessories
									</h2>
								</div>
							</div>
						</div>
						<div className="overflow-hidden rounded-xl">
							<div className="relative h-full">
								<Image
									src={electronics}
									alt="electronics"
									width={250}
									height={330}
									className="h-full transition-all hover:scale-105 rounded-xl"
								/>
								<div className="absolute flex top-0 left-0 bg-zinc-950/70 transition-colors hover:bg-zinc-950/75 text-white p-2 w-full h-20 justify-start">
									<h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
										Electronics
									</h2>
								</div>
							</div>
						</div>
						<div className="overflow-hidden rounded-xl">
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







				</div>
			</section>
		</div>
	);
}
