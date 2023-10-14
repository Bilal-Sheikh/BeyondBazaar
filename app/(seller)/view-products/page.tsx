import Loading from "./loading";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs";
import { Searchbar } from "@/components/Searchbar";
import ProductsList from "@/components/seller/ProductsList";
import PaginationControls from "@/components/PaginationControls";
import Unauthorized from "@/app/unauthorized/page";
import { prisma } from "@/lib/db";

async function getProducts(clerkId: string) {
	try {
		const data = await prisma.user.findUnique({
			where: {
				clerkId: clerkId,
			},
			include: {
				postedProducts: true,
			},
		});

		const postedProducts = data?.postedProducts || [];
		// console.log("USER WITH PRODUCTS::::::::::::::::::::::::::", postedProducts);

		return { data, postedProducts };
	} catch (error) {
		console.log(
			"ERROR IN PRISMA app/(seller)/view-products/page.tsx:::::::::::::::::::",
			error
		);
	}
}

export default async function page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const user = await currentUser();

	if (user === null) {
		return <Unauthorized />;
	}

	const { data, postedProducts }: any = await getProducts(user.id);
	// console.log("PRODUCTS :::::::::::::::::::::::::", data);

	const sellerId = data.clerkId;
	// console.log("SELLER ID :::::::::::::::::::::::::", sellerId);

	const page = searchParams["page"] ?? "1";
	const per_page = searchParams["per_page"] ?? "15";

	const start = (Number(page) - 1) * Number(per_page);
	const end = start + Number(per_page);

	const products = postedProducts;
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
							<Searchbar products={products} path={`/view-products`} />
						</div>
					</div>

					<Suspense fallback={<Loading />}>
						<ProductsList
							productsEntries={productsEntries}
							sellerId={sellerId}
						/>
					</Suspense>

					<PaginationControls
						path={`/view-products`}
						hasPrevPage={start > 0}
						hasNextPage={end < totalProducts}
						totalProducts={totalProducts}
					/>
				</div>
			)}
		</div>
	);
}
