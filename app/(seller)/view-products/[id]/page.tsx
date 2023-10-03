"use client";

import { OurFileRouter } from "@/app/api/(seller)/uploadthing/core";
import { useState } from "react";
import Image from "next/image";
import {
	Check,
	ChevronsUpDown,
	CircuitBoard,
	Glasses,
	HelpCircle,
	Shirt,
	Smartphone,
	Trash,
} from "lucide-react";
import { Tags, Loader2, Delete } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Category } from "@prisma/client";
import { UploadDropzone } from "@uploadthing/react";
import { UploadThingError } from "@uploadthing/shared";
import { UploadFileResponse } from "uploadthing/client";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { categories } from "@/lib/categories";

const formSchema = z.object({
	name: z.string().nonempty({ message: "Name is required" }),
	description: z.string().nonempty({ message: "Description is required" }),
	price: z.string().nonempty({ message: "Price is required" }),
	imageUrl: z.string().nonempty({ message: "Image is required" }),
	stockQuantity: z.string().nonempty({ message: "Stock Quantity is required" }),
	category: z.string().nonempty({ message: "Category is required" }),
});

export default function EditProducts({ params }: { params: { id: string } }) {
	const productId = params.id;
	const [open, setOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { toast } = useToast();
	const [uploadComplete, setUploadComplete] = useState(true);
	const [product, setProduct] = useState([]);
	const [images, setImages] = useState<
		{
			fileUrl: string;
			fileKey: string;
		}[]
	>([]);

	React.useEffect(() => {
		try {
			axios
				.get("http://localhost:3000/api/get-seller-product", {
					headers: {
						ProductId: productId,
					},
				})
				.then((res) => {
					setProduct(res.data.data);
				});
		} catch (error) {
			console.log("ERRORS :::::::::::::::::", error);
		}
	}, []);

	console.log("DATA::::::::::::::::::::::::::::::", product);

	const handleClientUploadComplete = (res?: UploadFileResponse[]) => {
		if (res) {
			setImages(res);

			const imgUrl = res[0].url;
			form.setValue("imageUrl", imgUrl);

			const json = JSON.stringify(res);
			// Do something with the response
			console.log("UPLOAD THING::::::::::", json);
			console.log("UPLOAD THING::::::::::", res);

			// Set the uploadComplete state to true
			setUploadComplete(true);
		}
		// alert("Upload Completed");
	};

	const handleUploadError = (error: Error) => {
		// Do something with the error.
		toast({
			variant: "destructive",
			title: "Error",
			description: "❌ Something went wrong. Please go back and try again",
		});
		// alert(`ERROR! ${error.message}`);
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: product.name,
			description: product.description,
			price: product.price,
			imageUrl: product.imageUrl,
			stockQuantity: product.stockQuantity,
			category: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		console.log("VALUES::::::::::::::::::::::", values);

		const { name, description, price, imageUrl, stockQuantity, category } =
			values;

		const product = {
			name,
			description,
			price,
			imageUrl,
			stockQuantity,
			category,
		};

		try {
			const { data } = await axios.post("/api/edit-product", product, {
				headers: {
					ProductId: productId,
				},
			});

			console.log("RESPONSE AXIOS :::::::::::::::::", data);

			if (data.success === true) {
				setIsLoading(false);
				toast({
					variant: "default",
					title: "Success",
					description: "✅ Product Edited Successfully",
				});
			} else {
				setIsLoading(false);
				toast({
					variant: "destructive",
					title: "Error",
					description: "❌ Product was not updated. Please try again",
				});
			}
		} catch (error) {
			console.log("ERRORS :::::::::::::::::", error);
			toast({
				variant: "destructive",
				title: "Error",
				description: "❌ Something went wrong. Please go back and try again",
			});
		}
	}

	return (
		<>
			<div className="my-10 flex justify-center items-center">
				<Card className="w-5/6">
					<CardHeader>
						<CardTitle>Edit Product</CardTitle>
						<CardDescription>
							Change your products in one-click.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="py-2">
											<FormLabel>Product's name *</FormLabel>
											<FormControl>
												<Input
													placeholder="Name"
													defaultValue={product.name}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem className="py-2">
											<FormLabel>Product's description *</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Type your description here."
													defaultValue={product.description}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="lg:grid lg:grid-flow-col lg:justify-stretch lg:gap-4">
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem className="py-2">
												<FormLabel>Price *</FormLabel>
												<FormControl>
													<Input
														type="number"
														min={1}
														placeholder="$ Price"
														defaultValue={product.price}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="stockQuantity"
										render={({ field }) => (
											<FormItem className="py-2 pb-6">
												<FormLabel>Stock Quantity *</FormLabel>
												<FormControl>
													<Input
														min={1}
														max={100}
														type="number"
														placeholder="Available Stocks"
														defaultValue={product.stockQuantity}
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Enter the number of stocks between 5 to 100
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="category"
										render={({ field }) => (
											<FormItem className="py-2 pb-6">
												<FormLabel>Category *</FormLabel>
												<FormControl>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="outline"
																role="combobox"
																aria-expanded={open}
																className="w-full justify-between"
															>
																{field.value
																	? categories
																			.flatMap((section) =>
																				Object.values(section)
																			)
																			.flat()
																			.find(
																				(category) =>
																					category.value === field.value
																			)?.label
																	: "Select category..."}

																<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align="end"
															className="w-[200px]"
														>
															<DropdownMenuGroup>
																<DropdownMenuSub>
																	<DropdownMenuSubTrigger>
																		<Shirt className="mr-2 h-4 w-4" />
																		Clothing
																	</DropdownMenuSubTrigger>
																	<DropdownMenuSubContent className="p-0">
																		<DropdownMenuGroup>
																			<Command>
																				<CommandInput placeholder="Search category..." />
																				<CommandEmpty>
																					No category found.
																				</CommandEmpty>
																				<CommandGroup>
																					{categories[0].clothing.map(
																						(category) => (
																							<CommandItem
																								value={category.label}
																								key={category.value}
																								onSelect={() => {
																									form.setValue(
																										"category",
																										category.value
																									);
																								}}
																							>
																								<Check
																									className={cn(
																										"mr-2 h-4 w-4",
																										category.value ===
																											field.value
																											? "opacity-100"
																											: "opacity-0"
																									)}
																								/>
																								{category.label}
																							</CommandItem>
																						)
																					)}
																				</CommandGroup>
																			</Command>
																		</DropdownMenuGroup>
																	</DropdownMenuSubContent>
																</DropdownMenuSub>

																<DropdownMenuSub>
																	<DropdownMenuSubTrigger>
																		<Glasses className="mr-2 h-4 w-4" />
																		Accessories
																	</DropdownMenuSubTrigger>
																	<DropdownMenuSubContent className="p-0">
																		<DropdownMenuItem>
																			<Command>
																				<CommandInput placeholder="Search category..." />
																				<CommandEmpty>
																					No category found.
																				</CommandEmpty>
																				<CommandGroup>
																					{categories[1].accessories.map(
																						(category) => (
																							<CommandItem
																								value={category.label}
																								key={category.value}
																								onSelect={() => {
																									form.setValue(
																										"category",
																										category.value
																									);
																								}}
																							>
																								<Check
																									className={cn(
																										"mr-2 h-4 w-4",
																										category.value ===
																											field.value
																											? "opacity-100"
																											: "opacity-0"
																									)}
																								/>
																								{category.label}
																							</CommandItem>
																						)
																					)}
																				</CommandGroup>
																			</Command>
																		</DropdownMenuItem>
																	</DropdownMenuSubContent>
																</DropdownMenuSub>

																<DropdownMenuSub>
																	<DropdownMenuSubTrigger>
																		<CircuitBoard className="mr-2 h-4 w-4" />
																		Electronics
																	</DropdownMenuSubTrigger>
																	<DropdownMenuSubContent className="p-0">
																		<DropdownMenuItem>
																			<Command>
																				<CommandInput placeholder="Search category..." />
																				<CommandEmpty>
																					No category found.
																				</CommandEmpty>
																				<CommandGroup>
																					{categories[2].electronics.map(
																						(category) => (
																							<CommandItem
																								value={category.label}
																								key={category.value}
																								onSelect={() => {
																									form.setValue(
																										"category",
																										category.value
																									);
																								}}
																							>
																								<Check
																									className={cn(
																										"mr-2 h-4 w-4",
																										category.value ===
																											field.value
																											? "opacity-100"
																											: "opacity-0"
																									)}
																								/>
																								{category.label}
																							</CommandItem>
																						)
																					)}
																				</CommandGroup>
																			</Command>
																		</DropdownMenuItem>
																	</DropdownMenuSubContent>
																</DropdownMenuSub>

																<DropdownMenuSub>
																	<DropdownMenuSubTrigger>
																		<Smartphone className="mr-2 h-4 w-4" />
																		Mobiles
																	</DropdownMenuSubTrigger>
																	<DropdownMenuSubContent className="p-0">
																		<DropdownMenuItem>
																			<Command>
																				<CommandInput placeholder="Search category..." />
																				<CommandEmpty>
																					No category found.
																				</CommandEmpty>
																				<CommandGroup>
																					{categories[3].mobiles.map(
																						(category) => (
																							<CommandItem
																								value={category.label}
																								key={category.value}
																								onSelect={() => {
																									form.setValue(
																										"category",
																										category.value
																									);
																								}}
																							>
																								<Check
																									className={cn(
																										"mr-2 h-4 w-4",
																										category.value ===
																											field.value
																											? "opacity-100"
																											: "opacity-0"
																									)}
																								/>
																								{category.label}
																							</CommandItem>
																						)
																					)}
																				</CommandGroup>
																			</Command>
																		</DropdownMenuItem>
																	</DropdownMenuSubContent>
																</DropdownMenuSub>

																<DropdownMenuSub>
																	<DropdownMenuSubTrigger>
																		<HelpCircle className="mr-2 h-4 w-4" />
																		Others
																	</DropdownMenuSubTrigger>
																	<DropdownMenuSubContent className="p-0">
																		<DropdownMenuItem>
																			<Command>
																				<CommandInput placeholder="Search category..." />
																				<CommandEmpty>
																					No category found.
																				</CommandEmpty>
																				<CommandGroup>
																					{categories[4].others.map(
																						(category) => (
																							<CommandItem
																								value={category.label}
																								key={category.value}
																								onSelect={() => {
																									form.setValue(
																										"category",
																										category.value
																									);
																								}}
																							>
																								<Check
																									className={cn(
																										"mr-2 h-4 w-4",
																										category.value ===
																											field.value
																											? "opacity-100"
																											: "opacity-0"
																									)}
																								/>
																								{category.label}
																							</CommandItem>
																						)
																					)}
																				</CommandGroup>
																			</Command>
																		</DropdownMenuItem>
																	</DropdownMenuSubContent>
																</DropdownMenuSub>
															</DropdownMenuGroup>
														</DropdownMenuContent>
													</DropdownMenu>
												</FormControl>
												<FormDescription>
													Select the category of your product
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="imageUrl"
									render={({ field }) => (
										<FormItem className="py-2 pb-6">
											<FormLabel>Image *</FormLabel>
											<FormDescription>
												Add an image of your product.
											</FormDescription>
											<FormControl>
												<div className="lg:flex lg:flex-col lg:items-start lg:justify-start">
													{uploadComplete ? (
														<>
															{images.length === 0 ? (
																<Image
																	src={product.imageUrl}
																	alt="product_img"
																	objectFit="contain"
																	width={250}
																	height={150}
																	className="rounded-xl"
																/>
															) : (
																<Image
																	src={images[0].fileUrl}
																	alt="product_img"
																	objectFit="contain"
																	width={250}
																	height={150}
																	className="rounded-xl"
																/>
															)}
															<Button
																onClick={() => setUploadComplete(false)}
																variant="destructive"
																className="mt-2"
																size="sm"
															>
																<Trash
																	size={20}
																	strokeWidth={2}
																	stroke="currentColor"
																	className="mr-2"
																/>
																Upload Another
															</Button>
														</>
													) : (
														// If upload is not complete, show UploadDropzone
														<UploadDropzone<OurFileRouter>
															className="cursor-pointer ut-uploading:cursor-not-allowed border-dashed border-gray-700 border-2 ut-button:ut-uploading:cursor-not-allowed"
															endpoint="imageUploader"
															onClientUploadComplete={
																handleClientUploadComplete
															}
															onUploadError={handleUploadError}
														/>
													)}
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex py-9 justify-center gap-6">
									<Button variant="outline" className="w-52" asChild>
										<Link href={"/view-products"}>Cancel</Link>
									</Button>

									<Button disabled={isLoading} className="w-52" type="submit">
										{isLoading && (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										)}
										Edit Product
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
