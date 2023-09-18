"use client";

import * as z from "zod";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useForm } from "react-hook-form";

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

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
	const { isLoaded, signUp, setActive } = useSignUp();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [pendingVerification, setPendingVerification] = React.useState(false);
	const [code, setCode] = React.useState("");

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			emailAddress: "",
			password: "",
		},
	});

	// async function onSubmit(e: React.SyntheticEvent) {
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// e.preventDefault();
		if (!isLoaded) {
			return;
		}

		// console.log(values);

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
				title: "Error",
				description: err.errors[0].longMessage,
			});
		}
	}

	const onPressVerify = async (e: React.SyntheticEvent) => {
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
				router.push("/");
				setIsLoading(false);
			}
		} catch (err: any) {
			setIsLoading(false);
			console.error(JSON.stringify(err.errors[0].longMessage, null, 2));
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
										<Button className="w-full" type="submit">
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
