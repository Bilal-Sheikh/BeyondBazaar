import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import React from "react";
import Loading from "../loading";
import ProductsList from "@/components/user/ProductsList";
import PaginationControls from "@/components/user/PaginationControls";

export default async function products({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const page = searchParams["page"] ?? "1";
	const per_page = searchParams["per_page"] ?? "15";
	const category = searchParams["category"];

	async function getProducts() {
		if (searchParams.category) {
			try {
				const data = await prisma.product.findMany({
					where: {
						category: category,
					},
					skip: initialSkip,
					take: Number(per_page),
					include: {
						postedBy: true,
					},
				});

				return data;
			} catch (error) {
				console.log("ERRORS :::::::::::::::::", error);
			}
		}

		try {
			const data = await prisma.product.findMany({
				skip: initialSkip,
				take: Number(per_page),
				include: {
					postedBy: true,
				},
			});

			return data;
		} catch (error) {
			console.log("ERRORS :::::::::::::::::", error);
		}
	}

	async function getProductCount() {
		if (searchParams.category) {
			try {
				const totalProducts = await prisma.product.count({
					where: { category: category },
				});
				return totalProducts;
			} catch (error) {
				console.log("ERRORS :::::::::::::::::", error);
			}
		}

		try {
			const totalProducts = await prisma.product.count();
			return totalProducts;
		} catch (error) {
			console.log("ERRORS :::::::::::::::::", error);
		}
	}

	const initialSkip = (Number(page) - 1) * Number(per_page);
	const end = initialSkip + Number(per_page);

	const products = await getProducts();
	const totalProducts = await getProductCount();

	// const products = data.postedProducts;
	// const productsEntries = products.slice(start, end);

	// console.log("ALL PRODUCTS::::::::::::::::", products);
	// console.log("PRODUCTS COUNT::::::::::::::::", totalProducts);
	// console.log("OVER::::::::::::::::::::::::");

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex flex-wrap justify-center w-96 px-14 py-5 md:flex md:flex-wrap md:justify-center md:items-center md:w-10/12 md:px-14 md:pt-5">
				<div className="flex justify-start w-full gap-10">
					<Button>Sort</Button>
					<Button>Filter</Button>
				</div>
			</div>

			<React.Suspense fallback={<Loading />}>
				<div className="flex flex-col justify-center items-center mx-4 gap-5 lg:grid lg:grid-cols-3 lg:px-14 lg:gap-10">
					<ProductsList products={products} />
				</div>
			</React.Suspense>

			<PaginationControls
				hasPrevPage={initialSkip > 0}
				hasNextPage={end < totalProducts}
				totalProducts={totalProducts}
				productCategory={category}
			/>
		</div>
	);
}
