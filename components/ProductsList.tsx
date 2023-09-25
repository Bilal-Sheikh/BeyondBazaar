import axios from "axios";
import { AspectRatio } from "@/components/ui/aspect-ratio"
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

async function getProducts() {
	const user = await currentUser();
	const { data } = await axios.get("http://localhost:3000/api/view-products", {
		headers: {
			ClerkId: user?.id,
		},
	});
	return data;
}

export default async function ProductsList() {
	const products = await getProducts();
	console.log("PRODUCTS :::::::::::::::::::::::::", products);

	return (
		<>
			{products.postedProducts.map((product) => (
				//  id: 7,
				//  name: 'mens top',
				//  description: 'dsdadsa',
				//  price: 3,
				//  imageUrl: 'https://utfs.io/f/ad86ab91-dae4-435b-ace8-2c207696cd2a-iitxnl.jpg',
				//  stockQuantity: 1,
				//  category: 'MENS_TOP_WEAR',
				//  postedById: 'user_2VsxfrKbGFDWMCfuOoLqscuSlpW',
				//  createdAt: 2023-09-25T10:46:34.409Z,
				//  updatedAt: 2023-09-25T10:46:34.409Z
				<Card className="w-[350px]" key={product.id}>
					<CardHeader>
						<CardTitle>{product.name}</CardTitle>
						{/* <CardDescription>
							Deploy your new project in one-click.
						</CardDescription> */}
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<AspectRatio ratio={3 / 2}>
									<Image
										src={product.imageUrl}
										alt="product"
										sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
										fill
									/>
								</AspectRatio>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="framework">Framework</Label>
								<Select>
									<SelectTrigger id="framework">
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent position="popper">
										<SelectItem value="next">Next.js</SelectItem>
										<SelectItem value="sveltekit">SvelteKit</SelectItem>
										<SelectItem value="astro">Astro</SelectItem>
										<SelectItem value="nuxt">Nuxt.js</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline">Cancel</Button>
						<Button>Deploy</Button>
					</CardFooter>
				</Card>
			))}
		</>
	);
}
