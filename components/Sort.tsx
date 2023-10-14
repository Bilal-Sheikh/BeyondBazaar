"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowDownUp } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Sort() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const category = searchParams.get("category");

	const categoryParam = category ? `&category=${category}` : "";

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger
					className={cn(buttonVariants({ variant: "outline" }), "gap-4")}
				>
					Sort <ArrowDownUp size={17} />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Sort By</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuItem
						onSelect={() =>
							router.push(
								`/products?sort=price.desc${categoryParam}`
							)
						}
					>
						Price ↑
					</DropdownMenuItem>
					<DropdownMenuItem
						onSelect={() =>
							router.push(`/products?sort=price.asc${categoryParam}`)
						}
					>
						Price ↓
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						onSelect={() =>
							router.push(
								`/products?sort=createdAt.desc${categoryParam}`
							)
						}
					>
						Date ↑
					</DropdownMenuItem>
					<DropdownMenuItem
						onSelect={() =>
							router.push(
								`/products?sort=createdAt.asc${categoryParam}`
							)
						}
					>
						Date ↓
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
