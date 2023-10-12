"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { BASE_URL } from "@/config";

export default function AddToCartButton({
	productId,
	stock,
}: {
	productId: number;
	stock: number;
}) {
	const router = useRouter();
	const { toast } = useToast();
	const { isSignedIn, user } = useUser();
	const [exist, setExist] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	function handleAddToCart(productId: number) {
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
						// console.log("RES DATA :::::::::::::::::::::::", res.data);
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
					"ERRORS in AXIOS components/user/AddToCartButton.tsx /api/add-to-cart:::::::::::::::::::",
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
					"ERROR in AXIOS components/user/AddToCartButton.tsx /api/check-cart::::::::::::::::::::",
					error
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
