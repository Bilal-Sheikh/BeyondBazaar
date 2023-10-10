import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];

export default async function Purchases() {
	const user = await currentUser();

	const userPayments = await prisma.payment.findMany({
		where: {
			userId: user.id,
		},
		select: {
			id: true,
			razorpay_order_id: true,
			razorpay_payment_id: true,
			createdAt: true,
		},
	});

	const purchaseHistory = await prisma.purchaseHistory.findMany({
		where: {
			userId: user.id,
		},
		select: {
			id: true,
			productId: true,
			quantity: true,
			createdAt: true,
		},
	});

	console.log("PAYMENTS:::::::::::::::::::::::::::::::::", userPayments);
	console.log("purchaseHistory::::::::::::::::::::::::::::", purchaseHistory);

	const productsId = await purchaseHistory.map((product) => product.productId);
	console.log("PRODUCTS IDs::::::::::::::::::::::::::::", productsId);

	return (
		<div className="py-10 px-5 w-full h-full lg:h-auto">
			<h2 className="mt-10 scroll-m-20 border-b pb-3 text-3xl font-bold tracking-tight transition-colors first:mt-0">
				Purchases
			</h2>

			<div className="pt-5">
				<Table>
					<TableCaption>A list of your recent invoices.</TableCaption>

					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Payment ID</TableHead>
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
								<TableCell>{payment.createdAt.toUTCString()}</TableCell>
							</TableRow>
						))}
					</TableBody>

					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead className="w-[100px]">Quantity</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{purchaseHistory.map((purchase) => (
							<TableRow key={purchase.id}>
								<TableCell className="font-medium">
									{purchase.productId}
								</TableCell>
								<TableCell>{purchase.quantity}</TableCell>
								<TableCell>{purchase.createdAt.toUTCString()}</TableCell>
								<TableCell>{purchase.createdAt.toUTCString()}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
