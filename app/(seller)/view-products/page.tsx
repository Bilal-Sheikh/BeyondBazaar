import * as React from "react";
import ProductsList from "@/components/ProductsList";
import axios from "axios";
import { currentUser } from "@clerk/nextjs";
import Loading from "./loading";
import PaginationControls from "@/components/PaginationControls";

const dynamic = 'force-dynamic'

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

	// mocked, skipped and limited in the real app
	const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
	const end = start + Number(per_page); // 5, 10, 15 ...

	const products = data.postedProducts;
	const totalProducts = products.length;
	const productsEntries = products.slice(start, end);

	return (
		// <Loading />
		<div className="flex flex-col items-center">
			<div className="flex flex-wrap justify-center items-center p-14">
				<ProductsList productsEntries={productsEntries} sellerId={sellerId} />
			</div>

			<PaginationControls
				hasPrevPage={start > 0}
				hasNextPage={end < totalProducts}
				totalProducts={totalProducts}
			/>
		</div>
	);
}
