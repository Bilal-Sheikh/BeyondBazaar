import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ui/dark-mode";
import { Search, ShoppingCart } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { User } from "@clerk/nextjs/server";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Searchbar } from "./Searchbar";
import { prisma } from "@/lib/db";
import { Cart } from "./user/Cart";
import { cn } from "@/lib/utils";

interface NavbarProps {
	user: User | null;
	role: string;
}

export default async function RightSideNav({ user, role }: NavbarProps) {
	let products;

	try {
		products = await prisma.product.findMany();
	} catch (error) {
		console.log("ERRORS :::::::::::::::::", error);
	}

	return (
		<div className="gap-1 md:gap-4 flex flex-auto items-center justify-center">
			<div className="flex flex-auto justify-center w-full">
				{role === "SELLER" ? (
					<></>
				) : (
					<>
						<Searchbar products={products} path={`/products`} />
					</>
				)}
			</div>

			<div className="gap-1 md:gap-3 flex flex-auto justify-end items-center">
				<ModeToggle />
				{role === "SELLER" ? <></> : <Cart />}

				<div>
					{user ? (
						<div className="flex items-center justify-center gap-3">
							<UserButton afterSignOutUrl="/" />
						</div>
					) : (
						<div className="flex items-center justify-center gap-3">
							<Link
								href={"/sign-in"}
								className={buttonVariants({
									variant: "default",
								})}
							>
								{" "}
								SignIn
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
