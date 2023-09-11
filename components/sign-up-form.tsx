"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SignInOAuthButtons from "./SignInOAuthButtons";

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [pendingVerification, setPendingVerification] = React.useState(false);
	const [code, setCode] = React.useState("");
	const [emailAddress, setEmailAddress] = React.useState("");
	const [password, setPassword] = React.useState("");
	const router = useRouter();

	async function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		setIsLoading(true);

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			// send the email.
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			// change the UI to our pending section.
			setPendingVerification(true);
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
		}
	}

	const onPressVerify = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		setIsLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});
			if (completeSignUp.status !== "complete") {
				/*  investigate the response, to see if there was an error
             or if the user needs to complete more steps.*/
				console.log(JSON.stringify(completeSignUp, null, 2));
			}
			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId });
				router.push("/");
			}
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					{!pendingVerification && (
						<div>
							<div className="flex flex-col space-y-2 text-center">
								<h1 className="text-2xl font-semibold tracking-tight">
									Create an account
								</h1>
								<p className="text-sm text-muted-foreground">
									Enter your email below to create your account
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
										<Button disabled={isLoading} onClick={onSubmit}>
											{isLoading && (
												<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
											)}
											Submit
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
					)}
					{pendingVerification && (
						<div>
							<div className="flex flex-col space-y-2 text-center">
								<h1 className="text-2xl font-semibold tracking-tight">
									Verify Email
								</h1>
								<p className="text-sm text-muted-foreground">
									We have send you a code on your email address.
								</p>
							</div>
							<form>
								<div className="grid gap-2 py-4">
									<div className="grid gap-1">
										<Input
											value={code}
											id="code"
											placeholder="Enter your code"
											type="text"
											disabled={isLoading}
											onChange={(e) => setCode(e.target.value)}
										/>
										<Button disabled={isLoading} onClick={onPressVerify}>
											{isLoading && (
												<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
											)}
											Verify Email
										</Button>
									</div>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
