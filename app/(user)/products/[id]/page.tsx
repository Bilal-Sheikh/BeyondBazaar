import { AspectRatio } from "@/components/ui/aspect-ratio";
import { prisma } from "@/lib/db";
import React from "react";
import products from "../page";

export default async function ViewProduct({
	params,
}: {
	params: { id: string };
}) {
	const productId = parseInt(params.id);

	const getProduct = async () => {
		try {
			const product = await prisma.product.findUnique({
				where: {
					id: productId,
				},
				include: {
					postedBy: true,
				},
			});

			return product;
		} catch (error) {
			console.log(
				"ERROR IN PRISMA products/[id]:::::::::::::::::::::::::::::::::::",
				error
			);
		}
	};

	const product = await getProduct();

	return (
		<div>
			{JSON.stringify(product)}
			<div>
				<AspectRatio ratio={1 / 1}></AspectRatio>
			</div>
		</div>
	);
}
