"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";

export function Searchbar({
	products,
	path,
}: {
	products: Product[];
	path: string;
}) {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	const categorizedProducts = products.reduce((acc: any, product) => {
		const category = product.category;
		const existingCategory = acc.find(
			(item: any) => item.category === category
		);

		if (existingCategory) {
			existingCategory.products.push(product);
		} else {
			acc.push({
				category: category,
				products: [product],
			});
		}

		return acc;
	}, []);

	// console.log("PRODCUTS BY CATEGORIES::::::::::::::", categorizedProducts);

	// Open the searchbar on `Ctrl + k`
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<div className="w-full">
			<Button
				variant={"outline"}
				className="text-base w-full justify-between text-gray-400"
				onClick={() => setOpen(true)}
			>
				<div>
					<div className="flex items-center text-base md:text-sm">
						<Search size={17} />
						<p className="ml-2 md:ml-3">Search</p>
					</div>
				</div>
				<p className="text-sm text-muted-foreground hidden xl:block">
					Press{" "}
					<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						<span className="text-xs">⌘</span>K
					</kbd>
				</p>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Search products..." />
				<CommandList>
					<CommandEmpty>No products found.</CommandEmpty>

					{categorizedProducts.map((category: any) => (
						<CommandGroup heading={category.category} key={category.category}>
							{category.products.map((product: any) => (
								<CommandItem
									className="cursor-pointer"
									onSelect={() => router.push(`${path}/${product.id}`)}
								>
									<span className="line-clamp-1">{product.name}</span>
								</CommandItem>
							))}
							<CommandSeparator />
						</CommandGroup>
					))}
				</CommandList>
			</CommandDialog>
		</div>
	);
}
