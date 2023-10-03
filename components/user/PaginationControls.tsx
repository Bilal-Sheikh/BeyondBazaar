"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

interface PaginationControlsProps {
	hasPrevPage: boolean;
	hasNextPage: boolean;
	totalProducts: number;
}

export default function PaginationControls({
	hasNextPage,
	hasPrevPage,
	totalProducts,
}: PaginationControlsProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? "1";
	const per_page = searchParams.get("per_page") ?? "15";

	const totalPages = Math.ceil(totalProducts / Number(per_page));

	return (
		<div className="flex justify-center items-center gap-2 my-4">
			{hasPrevPage && (
				<>
					<Button
						variant={"outline"}
						className="h-8 w-8 p-0"
						onClick={() => {
							router.push("/products/?page=1");
						}}
					>
						<ChevronsLeft className="h-4 w-4" />
					</Button>

					<Button
						variant={"outline"}
						className="h-8 w-8 p-0"
						onClick={() => {
							router.push(
								`/products/?page=${Number(page) - 1}&per_page=${per_page}`
							);
						}}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
				</>
			)}

			<p>
				{page} / {totalPages}
			</p>

			{hasNextPage && (
				<>
					<Button
						variant={"outline"}
						className="h-8 w-8 p-0"
						onClick={() => {
							router.push(
								`/products/?page=${Number(page) + 1}&per_page=${per_page}`
							);
						}}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant={"outline"}
						className="h-8 w-8 p-0"
						onClick={() => {
							router.push(`/products/?page=${totalPages}`);
						}}
					>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</>
			)}
		</div>
	);
}
