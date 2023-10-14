"use client";

import Link from "next/link";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { HTMLAttributes, SyntheticEvent, useState } from "react";

interface SignInFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: SignInFormProps) {
	const router = useRouter();
	const { toast } = useToast();
	const [password, setPassword] = useState("");
	const { isLoaded, signIn, setActive } = useSignIn();
	const [emailAddress, setEmailAddress] = useState("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// start the sign In process.
	const handleSubmit = async (e: SyntheticEvent) => {
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
				// console.log(result);
				await setActive({ session: result.createdSessionId });
				router.push(`/`);
				setIsLoading(true);
			} else {
				/*Investigate why the login hasn't completed */
				console.log(result);
			}
		} catch (error: any) {
			setIsLoading(false);
			console.log("ERROR IN SIGN IN FORM::::::", error.errors[0].longMessage);
			toast({
				variant: "destructive",
				title: "❌ Error",
				description: error.errors[0].longMessage,
				duration: 3000,
			});
		}
	};

	return (
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
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

						<Link
							href={`/seller-sign-up`}
							className={cn(
								buttonVariants({ variant: "link" }),
								"absolute w-max right-1/3 bottom-36 md:left-4 lg:top-8 lg:left-1/2"
							)}
						>
							Become a Seller ?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
