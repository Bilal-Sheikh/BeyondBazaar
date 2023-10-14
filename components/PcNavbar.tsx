"use client";

import Link from "next/link";
import Image from "next/image";
import logoBlack from "@/public/logoBlack.png";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const clothing: { title: string; href: string; description: string }[] = [
	{
		title: "Men's Top Wear",
		href: `/products?category=MENS_TOP_WEAR`,
		description: "For Men",
	},
	{
		title: "Men's Bottom Wear",
		href: `/products?category=MENS_BOTTOM_WEAR`,
		description: "For Men",
	},
	{
		title: "Women's Top Wear",
		href: `/products?category=WOMENS_TOP_WEAR`,
		description: "For Women.",
	},
	{
		title: "Women's Bottom Wear",
		href: `/products?category=WOMENS_BOTTOM_WEAR`,
		description: "For Women.",
	},
	{
		title: "Men Footwear",
		href: `/products?category=MENS_FOOTWEAR`,
		description: "For Mens Footwear.",
	},
	{
		title: "Women Footwear",
		href: `/products?category=WOMENS_FOOTWEAR`,
		description: "For Womens Footwear",
	},
	{
		title: "Kids",
		href: `/products?category=KIDS`,
		description: "For Kids.",
	},
];

const accessories: { title: string; href: string; description: string }[] = [
	{
		title: "Wallets",
		href: `/products?category=WALLETS`,
		description: "Best Quality Wallets",
	},
	{
		title: "Watches",
		href: `/products?category=WATCHES`,
		description: "Premium Watches",
	},
	{
		title: "Belts",
		href: `/products?category=BELTS`,
		description: "For Men",
	},
	{
		title: "Bags",
		href: `/products?category=BAGS`,
		description: "For Women",
	},
	{
		title: "Perfumes",
		href: `/products?category=PERFUMES`,
		description: "Buy best Perfumes for Men & Women",
	},
];

const electronics: { title: string; href: string; description: string }[] = [
	{
		title: "Gaming",
		href: `/products?category=GAMING`,
		description: "Gaming Peripherals",
	},
	{
		title: "Powerbank",
		href: `/products?category=POWERBANK`,
		description: "Mobile Powerbank",
	},
	{
		title: "Headphones",
		href: `/products?category=HEADPHONES`,
		description: "Audio devices for all",
	},
	{
		title: "Mobile Accessories",
		href: `/products?category=MOBILE_ACCESSORIES`,
		description: "Mobile Accessories",
	},
];

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						{...props}
					>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
							{children}
						</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = "ListItem";

interface NavbarProps {
	role: string;
}

export default function PcNavbar({ role }: NavbarProps) {
	return (
		<>
			{/* LEFT SIDE NAV */}
			<div className="flex flex-1 gap-4">
				<Link href={`/`}>
					<Image src={logoBlack} alt="Logo" width={130} />
				</Link>

				{role === "SELLER" ? (
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link href={`/add-product`} legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Add New Product
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link href={`/view-products`} legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										View Your Products
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link href={`/view-shop`} legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										View Your Shop
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				) : (
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link href={`/products`} legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										All Products
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Clothing</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
										{clothing.map((component) => (
											<ListItem
												key={component.title}
												title={component.title}
												href={component.href}
											>
												{component.description}
											</ListItem>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
										{accessories.map((component) => (
											<ListItem
												key={component.title}
												title={component.title}
												href={component.href}
											>
												{component.description}
											</ListItem>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Electronics</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
										{electronics.map((component) => (
											<ListItem
												key={component.title}
												title={component.title}
												href={component.href}
											>
												{component.description}
											</ListItem>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									href={`/products?category=MOBILES`}
									legacyBehavior
									passHref
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Mobiles
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									href={`/products?category=OTHERS`}
									legacyBehavior
									passHref
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Other
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				)}
			</div>
		</>
	);
}
