import * as React from "react";
import ProductsList from "@/components/seller/ProductsList";
import axios from "axios";
import { currentUser } from "@clerk/nextjs";
import Loading from "./loading";
import PaginationControls from "@/components/PaginationControls";
import { Button } from "@/components/ui/button";
import { Searchbar } from "@/components/Searchbar";

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

export default async function page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const data = await getProducts();
	const sellerId = data.data.clerkId;

	// console.log("PRODUCTS :::::::::::::::::::::::::", data);
	// console.log("SELLER ID :::::::::::::::::::::::::", sellerId);

	const page = searchParams["page"] ?? "1";
	const per_page = searchParams["per_page"] ?? "15";

	const start = (Number(page) - 1) * Number(per_page);
	const end = start + Number(per_page);

	const products = data.postedProducts;
	const totalProducts = products.length;
	const productsEntries = products.slice(start, end);

	return (
		<div className="flex flex-col justify-center items-center">
			{products.length === 0 ? (
				<div className="flex justify-center items-center h-screen">
					<div className="text-center">
						<h1 className="text-2xl font-semibold tracking-tight lg:text-5xl">
							No product found. Please add some products
						</h1>
					</div>
				</div>
			) : (
				<div className="w-full">
					<div className="flex flex-wrap justify-center w-96 px-14 pt-5 md:flex md:flex-wrap md:justify-center md:items-center md:w-full md:px-40 md:pt-5">

						<div className="w-full py-5 md:px-14">
							<Searchbar products={products} path={"/view-products"} />
						</div>
					</div>

					<React.Suspense fallback={<Loading />}>
						<ProductsList
							productsEntries={productsEntries}
							sellerId={sellerId}
						/>
					</React.Suspense>

					<PaginationControls
						path="/view-products"
						hasPrevPage={start > 0}
						hasNextPage={end < totalProducts}
						totalProducts={totalProducts}
					/>
				</div>
			)}
		</div>
	);
}
