import Link from "next/link";
import { prisma } from "@/lib/db";
import { Info } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Unauthorized from "@/app/unauthorized/page";

async function getProducts(clerkId: string) {
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
		return products;
	} catch (error) {
		console.log(
			"ERROR IN PRISMA app/(seller)/view-shop/page.tsx:::::::::::::::::::::",
			error
		);
	}
}

export default async function DashboardPage() {
	let updatedProducts = [];
	const user = await currentUser();

	if (user === null) {
		return <Unauthorized />;
	}

	const products = await getProducts(user.id);
	// console.log("(SELLER) PRODUCTS:::::::::::::::::::::::::::", products);

	if (products === void 0 || products.length === 0 || products === null) {
		return (
			<div className="flex-col md:flex h-screen">
				<div className="flex-1 space-y-4 p-8 pt-6">
					<div className="py-32">
						<p className="text-center text-base lg:text-4xl font-bold tracking-tight transition-colors">
							Please add some products to view your dashboard
						</p>
					</div>
				</div>
			</div>
		);
	}

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
				"ERROR IN PRISMA app/(seller)/view-shop/page.tsx:::::::::::::::::::::",
				error
			);
		}
	}
	// console.log("(SELLER) UPDATED PRODUCTS::::::::::::", updatedProducts);

	const inCarts = products.map((product) =>
		product.inCarts.map((cart) => cart.quantity).reduce((a, b) => a + b, 0)
	);
	const totalInCarts = inCarts.reduce((a, b) => a + b, 0);
	// console.log("(SELLER) TOTAL IN CARTS::::::::::::::::::", totalInCarts);

	const highestSellingProduct = await prisma.product.findMany({
		where: { postedById: user?.id },
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
	// console.log("(SELLER) HIGHEST SELLING:::::::::::::::", highestSellingProduct);

	const totalRevenue =
		updatedProducts
			.map((product) => product.productRevenue)
			.reduce((a, b) => a + b, 0)
			.toFixed(2) ?? 0;
	// console.log("(SELLER) TOATAL REVENUE:::::::::::::::", totalRevenue);

	const totalSales =
		updatedProducts
			.map((product) => product.sales)
			.reduce((a, b) => a + b, 0) ?? 0;
	// console.log("(SELLER) TOTAL SALES:::::::::::::::", totalSales);

	return (
		<div className="flex-col md:flex">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-between space-y-2 border-b pb-4">
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					<div className="flex items-center space-x-2">
						<Button disabled>Download</Button>
					</div>
				</div>

				{/*  */}
				{/*  */}

				<div>
					<Card>
						<CardHeader>
							<CardTitle>Highest Selling Products</CardTitle>
							<CardDescription>
								Your top 5 highest selling products
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableCaption>A list of your products.</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Sales</TableHead>
										<TableHead>Product Revenue</TableHead>
										<TableHead>Stocks Left</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{highestSellingProduct.map((product) => (
										<TableRow key={product.id}>
											<TableCell>
												<Link
													href={`/view-products/${product.id}`}
													target="_blank"
													className="cursor-pointer line-clamp-2 hover:text-blue-500 font-semibold tracking-tight transition-colors first:mt-0"
												>
													{product.name}
												</Link>
											</TableCell>
											<TableCell>{product.sales}</TableCell>
											<TableCell>
												{"$"}
												{product.productRevenue}
											</TableCell>
											<TableCell>{product.stockQuantity}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
