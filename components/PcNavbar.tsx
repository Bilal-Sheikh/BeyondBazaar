"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoBlack from "../public/logoBlack.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const clothing: { title: string; href: string; description: string }[] = [
  {
    title: "Men's Top Wear",
    href: "/",
    description: "For Men",
  },
  {
    title: "Men's Bottom Wear",
    href: "/",
    description: "For Men",
  },
  {
    title: "Women's Top Wear",
    href: "/",
    description: "For Women.",
  },
  {
    title: "Women's Bottom Wear",
    href: "/",
    description: "For Women.",
  },
  {
    title: "Men Footwear",
    href: "/",
    description: "For Mens Footwear.",
  },
  {
    title: "Women Footwear",
    href: "/",
    description: "For Womens Footwear",
  },
  {
    title: "Kids",
    href: "/",
    description: "For Kids.",
  },
];

const accessories: { title: string; href: string; description: string }[] = [
  {
    title: "Wallets",
    href: "/",
    description: "Best Quality Wallets",
  },
  {
    title: "Watches",
    href: "/",
    description: "Premium Watches",
  },
  {
    title: "Belts",
    href: "/",
    description: "For Men",
  },
  {
    title: "Bags",
    href: "/",
    description: "For Women",
  },
  {
    title: "Perfumes",
    href: "/",
    description: "Buy best Perfumes for Men & Women",
  },
];

const electronics: { title: string; href: string; description: string }[] = [
  {
    title: "Gaming",
    href: "/",
    description: "Gaming Peripherals",
  },
  {
    title: "Powerbank",
    href: "/",
    description: "Mobile Powerbank",
  },
  {
    title: "Headphones",
    href: "/",
    description: "Audio devices for all",
  },
  {
    title: "Mobile Accessories",
    href: "/",
    description: "Mobile Accessories",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
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
});
ListItem.displayName = "ListItem";

export default function PcNavbar() {
  return (
    <>
      {/* LEFT SIDE NAV */}
      <div className="flex flex-1">
        <Link href={"/"}>
          <Image src={logoBlack} alt="Logo" width={130} />
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
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
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Appliances
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Mobiles
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
