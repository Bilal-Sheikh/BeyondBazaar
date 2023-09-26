import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

interface BodyType {
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	stockQuantity: number;
	category: string;
}

export async function POST(req: Request, res: Response) {
	const {
		name,
		description,
		price,
		imageUrl,
		stockQuantity,
		category,
	}: BodyType = await req.json();
	// const body = await req.json();
	const user = await currentUser();
	console.log("(API) USER :::::::::::::::::", user);

	console.log(
		" (API) REQEST:::::::::::::::::::",
		name,
		description,
		price,
		imageUrl,
		stockQuantity,
		category
	);

	if (!user) {
		return NextResponse.json({
			success: false,
			message: "User not authenticated.",
		});
	}

	try {
		await prisma.product.create({
			data: {
				name,
				description,
				price: Number(price),
				imageUrl,
				stockQuantity: Number(stockQuantity),
				category,

				postedBy: {
					connect: { clerkId: user.id },
				},
			},
		});
		console.log("(API) SUCCESS ADDED:::::::::::::::::::::PRODUCT");

		return NextResponse.json({ success: true });
	} catch (error) {
		console.log("(API) ERROR:::::::::::::::::::", error);

		return NextResponse.json({
			success: false,
			message: "Error creating the product.",
		});
	}
}
