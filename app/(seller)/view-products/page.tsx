import * as React from "react";
import ProductsList from "@/components/ProductsList";
import axios from "axios";
import { currentUser } from "@clerk/nextjs";
import Loading from "./loading";

async function getProducts() {
	const user = await currentUser();
	try {
		const { data } = await axios.get(
			"http://localhost:3000/api/view-products",
			{
				headers: {
					ClerkId: user?.id,
				},
			}
		);
		return data;
	} catch (error) {
		console.log("ERRORS :::::::::::::::::", error);
	}
}

export default async function page() {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const products = await getProducts();
	// console.log("PRODUCTS :::::::::::::::::::::::::", products);

	return (
		// <Loading />

		<div className="flex flex-wrap justify-center items-center p-14">
			<ProductsList products={products} />
		</div>
	);
}
