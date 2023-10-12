import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

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

	const headersList = headers();
	const productId = headersList.get("ProductId");

	const user = await currentUser();
	// console.log("(API) USER :::::::::::::::::", user);

	// console.log(
	// 	"(API) REQUEST:::::::::::::::::::",
	// 	name,
	// 	description,
	// 	price,
	// 	imageUrl,
	// 	stockQuantity,
	// 	category
	// );

	if (!user) {
		return NextResponse.json(
			{
				success: false,
				message: "User not authenticated.",
			},
			{ status: 401 }
		);
	}

	try {
		await prisma.product.update({
			where: {
				id: Number(productId),
			},
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
		// console.log("(API) SUCCESS EDITED PRODUCT:::::::::::::::::::::");

		return NextResponse.json(
			{
				success: true,
				message: "Successfully edited the product.",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log("(API) ERROR:::::::::::::::::::", error);

		return NextResponse.json(
			{
				success: false,
				message: "Error creating the product.",
			},
			{ status: 500 }
		);
	}
}
