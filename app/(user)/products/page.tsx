import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import React from "react";
import Loading from "./loading";
import ProductsList from "@/components/user/ProductsList";
import PaginationControls from "@/components/PaginationControls";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Sort from "@/components/Sort";
import { BASE_URL } from "@/config";

export default async function products({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	let products;
	let totalProducts;

	const page = searchParams["page"] ?? "1";
	const per_page = searchParams["per_page"] ?? "15";
	const category = searchParams["category"] || "";
	let sort = searchParams["sort"] || "createdAt";
	// const price = searchParams["price"];
	// const date = searchParams["date"];

	// console.log("SEARCH PARAMS CATEGORY:::::::::::::::::::::::::::::", category);
	// console.log("SEARCH PARAMS PRICE :::::::::::::::::::::::::::::", price);
	// console.log("SEARCH PARAMS DATE :::::::::::::::::::::::::::::", date);
	// console.log("SEARCH PARAMS SORT:::::::::::::::::::::::::::::", sort);

	sort ? (sort = sort.split(".")) : (sort = [sort]);
	// console.log("SORT:::::::::::::::::::::::::::::::", sort);

	const where = {};
	if (category) where.category = category;

	let orderBy = {};
	// console.log("ORDER BY :::::::::::::::::::::::::::::::", orderBy);
	if (sort[1]) {
		orderBy[sort[0]] = sort[1];
	} else {
		orderBy[sort[0]] = "desc";
	}
	// console.log("SORT BY AFTER :::::::::::::::::::::::::::::::", orderBy);

	const initialSkip = (Number(page) - 1) * Number(per_page);
	const end = initialSkip + Number(per_page);

	async function getAllProducts() {
		try {
			const data = await prisma.product.findMany({
				where: where,
				skip: initialSkip,
				take: Number(per_page),
				include: { postedBy: true },
				orderBy: orderBy,
			});

			return data;
		} catch (error) {
			console.log(
				"ERRORS in getAllProducts() :::::::::::::::::::::::::::::::::::::::",
				error
			);
		}
	}

	async function getProductsCount() {
		try {
			const data = await prisma.product.count({ where: where });

			return data;
		} catch (error) {
			console.log(
				"ERRORS in getProductsCount() :::::::::::::::::::::::::::::::::::::::",
				error
			);
		}
	}

	products = await getAllProducts();
	totalProducts = await getProductsCount();

	return (
		<div className="flex flex-col justify-center items-center">
			{products.length === 0 ? (
				<div className="flex justify-center items-center h-screen">
					<div className="text-center">
						<h1 className="text-2xl font-semibold tracking-tight lg:text-5xl">
							No product found. Please try again later
						</h1>
					</div>
				</div>
			) : (
				<div>
					<div className="flex flex-wrap justify-center w-96 px-14 py-5 md:items-center md:w-10/12 md:px-20 md:pt-5">
						<div className="flex justify-start w-full gap-10">
							<Sort />
						</div>
					</div>

					<React.Suspense fallback={<Loading />}>
						<ProductsList products={products} />
					</React.Suspense>

					<PaginationControls
						path= {`${BASE_URL}/products`}
						hasPrevPage={initialSkip > 0}
						hasNextPage={end < totalProducts}
						totalProducts={totalProducts}
					/>
				</div>
			)}
		</div>
	);
}
