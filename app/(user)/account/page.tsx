import React from "react";
import Loading from "./loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Package, User, History, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Account() {
	return (
		// <Loading />

		<div className="py-10 px-5 w-full h-full lg:h-screen">
			<div className="flex flex-auto justify-between items-center border-b pb-3">
				<h2 className="mt-10 scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0">
					Account
				</h2>

				<SignOutButton>
					<Button variant="destructive" className="gap-3">
						<LogOut size={17} /> Log Out
					</Button>
				</SignOutButton>
			</div>

			<div className="flex flex-col lg:flex-row justify-center items-center pt-10 gap-5 lg:gap-20">
				<Card className="w-80 h-60 cursor-pointer hover:bg-zinc-900">
					<Link href={`/account/user`}>
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
					<Link href={`/account/orders`}>
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
					<Link href={`/account/purchases`}>
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
