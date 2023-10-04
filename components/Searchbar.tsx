"use client";

import * as React from "react";
import {
	Calculator,
	Calendar,
	CreditCard,
	Search,
	Settings,
	Smile,
	User,
} from "lucide-react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Category, Product } from "@prisma/client";
import { useRouter } from "next/navigation";

export function Searchbar({
	products,
	path,
}: {
	products: Array<Product>;
	path: string;
}) {
	const [open, setOpen] = React.useState(false);
	const router = useRouter();

	const categorizedProducts = products.reduce((acc, product) => {
		const category = product.category;
		const existingCategory = acc.find((item) => item.category === category);

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

	console.log("PRODCUTS BY CATEGORIES::::::::::::::", categorizedProducts);

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
		<div>
			<Button
				variant={"outline"}
				className="text-base w-full justify-between text-gray-400 sm:text-sm"
				onClick={() => setOpen(true)}
			>
				<div>
					<div className="flex items-center">
						<Search size={17} /> Search products...
					</div>
				</div>
				<p className="text-sm text-muted-foreground hidden md:block">
					Press{" "}
					<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						<span className="text-xs">⌘</span>K
					</kbd>
				</p>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Search products..." />
				<CommandList>
					<CommandEmpty>No productsfound.</CommandEmpty>

					{categorizedProducts.map((category) => (
						<CommandGroup heading={category.category} key={category.category}>
							{category.products.map((product) => (
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
