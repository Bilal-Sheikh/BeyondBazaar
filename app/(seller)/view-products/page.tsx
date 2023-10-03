import * as React from "react";
import ProductsList from "@/components/seller/ProductsList";
import axios from "axios";
import { currentUser } from "@clerk/nextjs";
import Loading from "./loading";
import PaginationControls from "@/components/seller/PaginationControls";
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
	// await new Promise((resolve) => setTimeout(resolve, 2000));

	const data = await getProducts();
	const sellerId = data.data.clerkId;

	// console.log("PRODUCTS :::::::::::::::::::::::::", data);
	// console.log("SELLER ID :::::::::::::::::::::::::", sellerId);

	const page = searchParams["page"] ?? "1";
	const per_page = searchParams["per_page"] ?? "8";

	const start = (Number(page) - 1) * Number(per_page);
	const end = start + Number(per_page);

	const products = data.postedProducts;
	const totalProducts = products.length;
	const productsEntries = products.slice(start, end);

	return (
		// <Loading />
		<div className="flex flex-col justify-center items-center">
			<div className="flex flex-wrap justify-center w-96 px-14 pt-5 md:flex md:flex-wrap md:justify-center md:items-center md:w-10/12 md:px-14 md:pt-5">
				<div className="flex justify-start w-full gap-4 md:w-2/5">
					<div>
						<Button>Sort</Button>
					</div>
					<div>
						<Button>Filter</Button>
					</div>
				</div>

				<div className="w-full py-5 md:w-3/5">
					<Searchbar products={products}/> 
					</div>
			</div>

			<React.Suspense fallback={<Loading />}>
				<div className="flex flex-wrap justify-center items-center px-14">
					<ProductsList productsEntries={productsEntries} sellerId={sellerId} />
				</div>
			</React.Suspense>

			<PaginationControls
				hasPrevPage={start > 0}
				hasNextPage={end < totalProducts}
				totalProducts={totalProducts}
			/>
		</div>
	);
}
