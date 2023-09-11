"use client";

import * as React from "react";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useToast } from "./ui/use-toast";

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: SignInFormProps) {
	const { toast } = useToast();
	const { isLoaded, signIn, setActive } = useSignIn();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const router = useRouter();
	// start the sign In process.
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		try {
			setIsLoading(true);
			const result = await signIn.create({
				identifier: emailAddress,
				password,
			});

			if (result.status === "complete") {
				console.log(result);
				await setActive({ session: result.createdSessionId });
				router.push("/");
				setIsLoading(true);
			} else {
				/*Investigate why the login hasn't completed */
				console.log(result);
			}
		} catch (err: any) {
			setIsLoading(false);
			console.error("error", err.errors[0].longMessage);
			toast({
				variant: "destructive",
				title: "Error",
				description: err.errors[0].longMessage,
			});
		}
	};

	return (
		<>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div>
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Login using your email
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your email below
							</p>
						</div>
						<div className={cn("grid gap-6", className)} {...props}>
							<form>
								<div className="grid gap-2">
									<div className="grid gap-1 py-4">
										<Label className="sr-only" htmlFor="email">
											Email
										</Label>
										<Input
											id="email"
											placeholder="Enter your email"
											type="email"
											autoCapitalize="none"
											autoComplete="email"
											autoCorrect="off"
											disabled={isLoading}
											onChange={(e) => setEmailAddress(e.target.value)}
										/>
										<Input
											id="password"
											placeholder="Enter your password"
											type="password"
											autoCapitalize="none"
											autoComplete="password"
											autoCorrect="off"
											disabled={isLoading}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									<Button disabled={isLoading} onClick={handleSubmit}>
										{isLoading && (
											<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
										)}
										Sign In
									</Button>
								</div>
							</form>
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div>
							<SignInOAuthButtons />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
