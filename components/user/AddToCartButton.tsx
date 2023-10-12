"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { BASE_URL } from "@/config";

export default function AddToCartButton({ productId, stock }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [exist, setExist] = useState(false);
	const { toast } = useToast();
	const { isSignedIn, user } = useUser();

	function handleAddToCart(productId) {
		if (!isSignedIn) {
			toast({
				variant: "default",
				title: "Sign In",
				description: " ❗ Please Sign In first",
				duration: 3000,
			});
			router.push(`${BASE_URL}/sign-in`);
		} else {
			setIsLoading(true);
			try {
				axios
					.post(
						`${BASE_URL}/api/add-to-cart`,
						{},
						{
							headers: {
								ClerkId: user.id,
								ProductId: productId,
							},
						}
					)
					.then((res) => {
						console.log("RES DATA :::::::::::::::::::::::", res.data);
						setIsLoading(false);
						setExist(true);
						toast({
							variant: "default",
							title: "Success",
							description: " ✅ Added to Cart",
							duration: 3000,
						});
					});
			} catch (error) {
				console.log(
					"ERRORS in http://localhost:3000/api/add-to-cart::::::::::::::::::::::::::::::::",
					error
				);
			}
		}
	}

	useEffect(() => {
		if (isSignedIn) {
			setIsFetching(true);
			try {
				axios
					.get(`${BASE_URL}/api/check-cart`, {
						headers: {
							ClerkId: user.id,
							ProductId: productId,
						},
					})
					.then((res) => {
						if (res.data.exists === true) {
							setExist(true);
						}
						setIsFetching(false);
					});
			} catch (error) {
				console.log(
					"ERROR in AXIOS components/user/AddToCartButton.tsx http://localhost:3000/api/check-cart"
				);
			}
		}
	}, [user]);

	return (
		<>
			{isFetching ? (
				<div className="flex items-center justify-center">
					<Loader2 className="mr-2 animate-spin" />
				</div>
			) : (
				<>
					{exist ? (
						<Button variant={"outline"} className="w-full">
							Already in Cart
						</Button>
					) : (
						<Button
							disabled={isLoading || stock <= 0}
							className="w-full"
							onClick={() => handleAddToCart(productId)}
						>
							{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Add to Cart
						</Button>
					)}
				</>
			)}
		</>
	);
}
