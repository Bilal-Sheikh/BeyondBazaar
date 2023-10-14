import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Cart } from "./user/Cart";
import { Searchbar } from "./Searchbar";
import { UserButton } from "@clerk/nextjs";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ui/dark-mode";
import { User } from "@clerk/nextjs/server";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
	user: User | null;
	role: string;
}

async function getProducts() {
	try {
		const products = await prisma.product.findMany();
		return products;
	} catch (error) {
		console.log(
			"ERRORS IN PRISMA components/RightSideNav.tsx :::::::::::::::::",
			error
		);
	}
}

export default async function RightSideNav({ user, role }: NavbarProps) {
	const name = user?.firstName + " " + user?.lastName;

	const products = await getProducts();
	// console.log("PRODUCTS:::::::::::::::::::::::::::::::", products);
	if (!products) {
		return null;
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
								<Link href={`/account`}>
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
								href={`/sign-in`}
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
