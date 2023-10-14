import Link from "next/link";
import Loading from "./loading";
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
	console.log("(SELLER) PRODUCTS:::::::::::::::::::::::::::", products);

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

	const totalInCarts = products.map((product) =>
		product.inCarts.map((cart) => cart.quantity).reduce((a, b) => a + b, 0)
	);
	// console.log(
	// 	"(SELLER) TOTAL IN CARTS:::::::::::::::",
	// 	totalInCarts.reduce((a, b) => a + b, 0)
	// );

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
		// <Loading />

		<div className="flex-col md:flex">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-between space-y-2 border-b pb-4">
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					<div className="flex items-center space-x-2">
						<Button disabled>Download</Button>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="flex items-center justify-center text-sm font-medium">
								Total Revenue
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Info
												className="ml-2 cursor-pointer"
												width={15}
												height={15}
												size={15}
											/>
										</TooltipTrigger>
										<TooltipContent>
											<p>This is the total of all the products you sold</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">${totalRevenue}</div>
							<p className="text-xs text-muted-foreground">
								${totalRevenue} more from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="flex items-center justify-center text-sm font-medium">
								In Carts
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Info
												className="ml-2 cursor-pointer"
												width={15}
												height={15}
												size={15}
											/>
										</TooltipTrigger>
										<TooltipContent>
											<p>
												This shows the total number of products that users have
												added in their cart
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{totalInCarts.reduce((a, b) => a + b, 0)}
							</div>
							<p className="text-xs text-muted-foreground">
								{totalInCarts.reduce((a, b) => a + b, 0)} more from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="flex items-center justify-center text-sm font-medium">
								Sales
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Info
												className="ml-2 cursor-pointer"
												width={15}
												height={15}
												size={15}
											/>
										</TooltipTrigger>
										<TooltipContent>
											<p>
												This shows the total number of products that you sold
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<rect width="20" height="14" x="2" y="5" rx="2" />
								<path d="M2 10h20" />
							</svg>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{totalSales}</div>
							<p className="text-xs text-muted-foreground">
								{totalSales} more from last month
							</p>
						</CardContent>
					</Card>
				</div>
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
