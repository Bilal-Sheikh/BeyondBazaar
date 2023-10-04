"use client";

import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { prisma } from "@/lib/db";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function SortFilter() {
	const router = useRouter();

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger
					className={cn(buttonVariants({ variant: "outline" }))}
				>
					Sort
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Sort By</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuItem
						onSelect={() => router.push("/products?price=desc")}
					>
						Price ↑
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => router.push("/products?price=asc")}>
						Price ↓
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem onSelect={() => router.push("/products?date=desc")}>
						Date ↑
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => router.push("/products?date=asc")}>
						Date ↓
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Button>Filter</Button>
		</div>
	);
}
