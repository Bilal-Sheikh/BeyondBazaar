import { NextResponse } from "next/server";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

export async function POST(req: Request, res: Response) {
	const { name, description, price, imageUrl, stockQuantity, category } =
		await req.json();
	// const body = await req.json();
	const user = await currentUser();

	console.log(
		"REQEST:::::::::::::::::::",
		name,
		description,
		price,
		imageUrl,
		stockQuantity,
		category
	);

	await prisma.product.create({
		data: {
			name,
			description,
			price,
			imageUrl,
			stockQuantity,
			category,
		},
	});

	return NextResponse.json({ success: true });
}
