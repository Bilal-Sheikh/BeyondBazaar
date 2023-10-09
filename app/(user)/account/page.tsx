import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Delete,
	Info,
	Loader2,
	Minus,
	Package,
	Plus,
	ShoppingCart,
	Trash,
	User,
	History,
} from "lucide-react";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import UserProfilePage from "@/components/user/UserProfilePage";
import Loading from "./loading";

export default function Account() {
	return (
		<div className="py-10 px-5 w-full h-full lg:h-screen">
			<h2 className="mt-10 scroll-m-20 border-b pb-3 text-3xl font-bold tracking-tight transition-colors first:mt-0">
				Account
			</h2>

			<div className="flex flex-col lg:flex-row justify-center items-center pt-10 gap-5 lg:gap-20">
				<Card className="w-80 h-60 cursor-pointer hover:bg-zinc-900">
					<Link href={"/account/user"}>
						<CardHeader>
							<User size={60} strokeWidth={1} />
							<CardTitle className="pt-4">Account</CardTitle>
						</CardHeader>
						<CardContent className="text-muted-foreground">
							Manage, View or Change all your account settings
						</CardContent>
					</Link>
				</Card>

				<Card className="w-80 h-60 cursor-pointer hover:bg-zinc-900">
					<Link href={"/account/orders"}>
						<CardHeader>
							<Package size={60} strokeWidth={1} />
							<CardTitle className="pt-4">Orders</CardTitle>
						</CardHeader>
						<CardContent className="text-muted-foreground">
							Manage, Track and Review all your orders in one place
						</CardContent>
					</Link>
				</Card>

				<Card className="w-80 h-60 cursor-pointer hover:bg-zinc-900">
					<Link href={"/account/purchases"}>
						<CardHeader>
							<History size={60} strokeWidth={1} />
							<CardTitle className="pt-4">Purchases</CardTitle>
						</CardHeader>
						<CardContent className="text-muted-foreground">
							View all of your purchase historyhere
						</CardContent>
					</Link>
				</Card>
			</div>
		</div>
	);
}
