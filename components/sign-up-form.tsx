"use client";

import * as z from "zod";
import Link from "next/link";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { BASE_URL } from "@/config";
import { Loader2 } from "lucide-react";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, SyntheticEvent, useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
	firstName: z.string().nonempty({ message: "First name is required" }),
	lastName: z.string().nonempty({ message: "Last name is required" }),
	emailAddress: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" })
		.max(30, { message: "Password must be at most 20 characters" }),
});

export function SignUpForm({ className, ...props }: SignUpFormProps) {
	const router = useRouter();
	const { toast } = useToast();
	const [code, setCode] = useState("");
	const { isLoaded, signUp, setActive } = useSignUp();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pendingVerification, setPendingVerification] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			emailAddress: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!isLoaded) {
			return;
		}
		// console.log("VALUES::::::::::::::::::::::", values);

		try {
			setIsLoading(true);
			await signUp.create({
				firstName: values.firstName,
				lastName: values.lastName,
				emailAddress: values.emailAddress,
				password: values.password,
			});

			// send the email.
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			// change the UI to our pending section.
			setPendingVerification(true);
			setIsLoading(false);
		} catch (err: any) {
			setIsLoading(false);
			console.error(JSON.stringify(err.errors[0].longMessage, null, 2));
			toast({
				variant: "destructive",
				title: "❌ Error",
				description: err.errors[0].longMessage,
				duration: 3000,
			});
		}
	}

	const onPressVerify = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		try {
			setIsLoading(true);
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
				router.push(`${BASE_URL}`);
			}
		} catch (err: any) {
			setIsLoading(false);
			console.error(JSON.stringify(err.errors[0].longMessage, null, 2));
			toast({
				variant: "destructive",
				title: "❌ Error",
				description: err.errors[0].longMessage,
				duration: 3000,
			});
		}
	};

	return (
		<div className="lg:p-8">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				{!pendingVerification && (
					<div>
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Create an account
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your details below to create your account
							</p>
						</div>
						<div className={cn("grid gap-6", className)} {...props}>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)}>
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem className="py-2">
												<FormLabel>First Name *</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter your First Name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem className="py-2">
												<FormLabel>Last Name *</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter your Last Name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="emailAddress"
										render={({ field }) => (
											<FormItem className="py-2">
												<FormLabel>Email Address *</FormLabel>
												<FormControl>
													<Input placeholder="Enter your Email" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem className="py-2 pb-6">
												<FormLabel>Password *</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="Enter your Password"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button className="w-full" type="submit" disabled={isLoading}>
										{isLoading && (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										)}
										Submit
									</Button>
								</form>
							</Form>

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
								href={`${BASE_URL}/seller-sign-up`}
								className={cn(
									buttonVariants({ variant: "link" }),
									"absolute w-max right-1/3 bottom-3 md:left-4 lg:top-8 lg:left-1/2"
								)}
							>
								Become a Seller ?
							</Link>
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
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
	);
}
