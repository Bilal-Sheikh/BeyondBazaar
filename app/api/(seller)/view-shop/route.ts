import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function GET() {
	const headersList = headers();
	const clerkId = headersList.get("ClerkId");
	let updatedProducts = [];

	if (!clerkId) {
		return NextResponse.json(
			{
				success: false,
				message: "(API) Clerk Id not found in the headers",
			},
			{ status: 400 }
		);
	}

	// return NextResponse.json({ success: "REACHED API VIEW PRODUCTS" });

	try {
		const products = await prisma.product.findMany({
			where: { postedById: clerkId },
			select: {
				id: true,
				price: true,
				sales: true,
				productRevenue: true,
				inCarts: {
					select: {
						quantity: true,
					},
				},
			},
		});

		for (let product of products) {
			try {
				const updated = await prisma.product.update({
					where: { id: product.id },
					data: { productRevenue: product.sales * product.price },
					select: {
						id: true,
						price: true,
						sales: true,
						productRevenue: true,
					},
				});
				updatedProducts.push(updated);
			} catch (error) {
				console.log(
					"(API) ERROR IN PRISMA /view-shop/:::::::::::::::::::::",
					error
				);
			}
		}

		const inCarts = products.map((product) =>
			product.inCarts.map((cart) => cart.quantity).reduce((a, b) => a + b, 0)
		);
		const totalInCarts = inCarts.reduce((a, b) => a + b, 0);

		const highestSellingProduct = await prisma.product.findMany({
			where: { postedById: clerkId },
			select: {
				id: true,
				name: true,
				productRevenue: true,
				sales: true,
				stockQuantity: true,
			},
			orderBy: { sales: "desc" },
			take: 5,
		});

		const totalRevenue =
			updatedProducts
				.map((product) => product.productRevenue)
				.reduce((a, b) => a + b, 0)
				.toFixed(2) ?? 0;

		const totalSales =
			updatedProducts
				.map((product) => product.sales)
				.reduce((a, b) => a + b, 0) ?? 0;

		return NextResponse.json(
			{
				success: true,
				message: "(API) Successfully retrieved shop info.",
				products,
				totalRevenue,
				totalInCarts,
				totalSales,
				highestSellingProduct,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log("(API) ERROR:::::::::::::::::::", error);

		return NextResponse.json(
			{
				success: false,
				message: "(API) Error showing the shop.",
			},
			{ status: 500 }
		);
	}

	// try {
	// 	const data = await prisma.product.findUnique({
	// 		where: {
	// 			id: Number(clerkId),
	// 		},
	// 	});

	// 	// console.log("(API) PRODUCT DATA WITH ID :::::::::::::::::::", data);

	// 	return NextResponse.json(
	// 		{
	// 			success: true,
	// 			message: "(API) Successfully the product.",
	// 			data,
	// 		},
	// 		{ status: 200 }
	// 	);
	// } catch (error) {
	// 	console.log("(API) ERROR:::::::::::::::::::", error);

	// 	return NextResponse.json(
	// 		{
	// 			success: false,
	// 			message: "(API) Error showing the product.",
	// 		},
	// 		{ status: 500 }
	// 	);
	// }
}
