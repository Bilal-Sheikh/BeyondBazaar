import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { currentUser } from "@clerk/nextjs";
import axios from "axios";
import ProductsList from "@/components/ProductsList";

export default async function page() {
	return (
		<>
			<div className="flex h-screen p-14">
				<ProductsList />
			</div>
		</>
	);
}
