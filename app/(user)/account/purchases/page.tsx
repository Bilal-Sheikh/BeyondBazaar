import React from "react";
import Link from "next/link";
import { BASE_URL } from "@/config";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default async function Purchases() {
	const user = await currentUser();

	const userPayments = await prisma.payment
		.findMany({
			where: {
				userId: user?.id,
			},
			select: {
				id: true,
				razorpay_order_id: true,
				razorpay_payment_id: true,
				amount: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		})
		.catch((error) => {
			console.log(
				"ERROR IN PRISMA app/(user)/account/purchases/page.tsx",
				error
			);
		});

	const purchaseHistory = await prisma.purchaseHistory
		.findMany({
			where: {
				userId: user?.id,
			},
			select: {
				id: true,
				productId: true,
				quantity: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		})
		.catch((error) => {
			console.log(
				"ERROR IN PRISMA app/(user)/account/purchases/page.tsx",
				error
			);
		});

	// console.log("PAYMENTS:::::::::::::::::::::::::::::::::", userPayments);
	// console.log("purchaseHistory::::::::::::::::::::::::::::", purchaseHistory);

	if (
		userPayments === void 0 ||
		userPayments.length === 0 ||
		purchaseHistory === void 0 ||
		purchaseHistory.length === 0
	) {
		return (
			<div className="py-10 px-5 w-full h-screen lg:h-full">
				<h2 className="mt-10 scroll-m-20 border-b pb-3 text-3xl font-bold tracking-tight transition-colors first:mt-0">
					Purchases
				</h2>

				<div className="lg:h-screen">
					<p className="pt-32 lg:pt-60 text-center text-3xl lg:text-4xl font-bold tracking-tight transition-colors">
						No Purchase history found.
					</p>
				</div>
			</div>
		);
	}

	const productsId = purchaseHistory.map((product) => product.productId);
	// console.log("PRODUCTS IDs::::::::::::::::::::::::::::", productsId);

	const products = await prisma.product
		.findMany({
			where: {
				id: {
					in: productsId,
				},
			},
			select: {
				id: true,
				name: true,
				category: true,
				price: true,
			},
		})
		.catch((error) => {
			console.log(
				"ERROR IN PRISMA app/(user)/account/purchases/page.tsx",
				error
			);
		});
	// console.log("PRODUCTS:::::::::::::::::::::::::::::::::", products);

	const purchase = purchaseHistory.map((purchase) => {
		return {
			...purchase,
			productName: products.find((product) => product.id === purchase.productId)
				?.name,
			productPrice: products.find(
				(product) => product.id === purchase.productId
			)?.price,
		};
	});
	// console.log("FINAL PURCHASE VALUE::::::::::::::::::::::::", purchase);

	return (
		<div className="py-10 px-5 w-full h-full lg:h-max">
			<h2 className="mt-10 scroll-m-20 border-b pb-3 text-3xl font-bold tracking-tight transition-colors first:mt-0">
				Purchases
			</h2>

			<div className="pt-5">
				<Tabs defaultValue="payments">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="payments">Payments</TabsTrigger>
						<TabsTrigger value="purchases">Purchases</TabsTrigger>
					</TabsList>
					<TabsContent value="payments">
						<Table>
							<TableCaption>A list of your recent payments.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead>Order ID</TableHead>
									<TableHead>Payment ID</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{userPayments.map((payment) => (
									<TableRow key={payment.id}>
										<TableCell className="font-medium">
											{payment.razorpay_order_id}
										</TableCell>
										<TableCell>{payment.razorpay_payment_id}</TableCell>
										<TableCell>
											{"$"}
											{payment.amount}
										</TableCell>
										<TableCell>{payment.createdAt.toUTCString()}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TabsContent>
					<TabsContent value="purchases">
						<Table>
							<TableCaption>A list of your recent purchases.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{purchase.map((purchase) => (
									<TableRow key={purchase.productId}>
										<TableCell className="font-medium">
											<Link
												target="_blank"
												href={`${BASE_URL}/products/${purchase.productId}`}
												className="cursor-pointer line-clamp-2 hover:text-blue-500 font-semibold tracking-tight transition-colors first:mt-0"
											>
												{purchase.productName}
											</Link>
										</TableCell>
										<TableCell>{purchase.quantity}</TableCell>
										<TableCell>{purchase.productPrice}</TableCell>
										<TableCell>{purchase.createdAt.toUTCString()}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
