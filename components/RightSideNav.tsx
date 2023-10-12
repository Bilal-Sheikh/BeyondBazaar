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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "@/public/avatar 1.jpg";
import { BASE_URL } from "@/config";

interface NavbarProps {
	user: User | null;
	role: string;
}

export default async function RightSideNav({ user, role }: NavbarProps) {
	let products;
	const name = user?.firstName + " " + user?.lastName;

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
							{role === "SELLER" ? (
								<UserButton afterSignOutUrl="/" />
							) : (
								<Link href={`${BASE_URL}/account`}>
									{user.hasImage ? (
										<>
											<Avatar>
												<AvatarImage src={user.imageUrl} alt={name} />
											</Avatar>
										</>
									) : (
										<>
											<Avatar>
												<AvatarImage
													src="https://utfs.io/f/d7b932cc-0069-498c-8690-272a4ec51e23-tk3qy2.jpg"
													alt={name}
												/>
											</Avatar>
										</>
									)}
								</Link>
							)}
						</div>
					) : (
						<div className="flex items-center justify-center gap-3">
							<Link
								href={`${BASE_URL}/sign-in`}
								className={buttonVariants({
									variant: "default",
								})}
							>
								SignIn
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
