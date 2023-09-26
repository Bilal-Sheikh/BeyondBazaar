import * as React from "react";
import ProductsList from "@/components/ProductsList";
import axios from "axios";
import { currentUser } from "@clerk/nextjs";

async function getProducts() {
	const user = await currentUser();
	const { data } = await axios.get("http://localhost:3000/api/view-products", {
		headers: {
			ClerkId: user?.id,
		},
	});
	return data;
}

export default async function page() {
	const products = await getProducts();
	// console.log("PRODUCTS :::::::::::::::::::::::::", products);

	return (
		<div className="flex flex-wrap justify-center items-center p-14">
			<ProductsList products={products}/>
		</div>
	);
}
