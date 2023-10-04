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
import { Button } from "./ui/button";

export default function SortFilter() {

    
	function handlePriceHigh() {
		try {
			const data = prisma.product.findMany({
				orderBy: { price: "desc" },
			});

			return data;
		} catch (error) {
			console.log("ERRORS IN SORT :::::::::::::::::", error);
		}
	}

	return (
		<div>
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Sort" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="price_high" onClick={handlePriceHigh}>
						Price ↑
					</SelectItem>
					<SelectItem value="price_low">Price ↓</SelectItem>
				</SelectContent>
			</Select>

			<Button>Filter</Button>
		</div>
	);
}
