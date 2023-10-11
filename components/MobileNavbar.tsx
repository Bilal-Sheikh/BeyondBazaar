import React from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import logoBlack from "@/public/logoBlack.png";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { UserButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";
import { User } from "@clerk/nextjs/server";

interface NavbarProps {
	user: User | null;
	role: string;
}

export default function MobileNavbar({ user, role }: NavbarProps) {
	return (
		<>
			<Sheet>
				<SheetTrigger>
					<Menu />
				</SheetTrigger>
				<SheetContent side={"left"}>
					<SheetHeader>
						<SheetTitle>
							<div className="flex items-center justify-start">
								<div>
									<Link href={"/"}>
										<Image src={logoBlack} alt="Logo" width={130} />
									</Link>
								</div>
							</div>
						</SheetTitle>
						<Separator />
						<ScrollArea className="h-[calc(100vh-8rem)]">
							{role === "SELLER" ? (
								<div className="py-5">
									<Button variant="link" className="w-full py-7">
										<span className="items-center justify-between py-4 font-medium text-lg transition-all hover:underline">
											<SheetClose asChild>
												<Link href="/add-product">Add New Product</Link>
											</SheetClose>
										</span>
									</Button>
									<Separator />
									<Button variant="link" className="w-full py-7">
										<span className="items-center justify-between py-4 font-medium text-lg transition-all hover:underline">
											<SheetClose asChild>
												<Link href="/view-products">View Your Products</Link>
											</SheetClose>
										</span>
									</Button>
									<Separator />
									<Button variant="link" className="w-full py-7">
										<span className="items-center justify-between py-4 font-medium text-lg transition-all hover:underline">
											<SheetClose asChild>
												<Link href="/view-shop">View Your Shop</Link>
											</SheetClose>
										</span>
									</Button>
								</div>
							) : (
								<div className="pr-20">
									<Accordion type="multiple" className="w-full">
										<AccordionItem value="item-1">
											<AccordionTrigger>All Products</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products"}>All Products</Link>
													</SheetClose>
												</span>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-2">
											<AccordionTrigger>Clothing</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=MENS_TOP_WEAR"}>
															Men's Top Wear
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=MENS_BOTTOM_WEAR"}>
															Men's Bottom Wear
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=WOMENS_TOP_WEAR"}>
															Women's Top Wear
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link
															href={"/products?category=WOMENS_BOTTOM_WEAR"}
														>
															Women's Bottom Wear
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=MENS_FOOTWEAR"}>
															Men's Footwear
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=WOMENS_FOOTWEAR"}>
															Women's Footwear
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=KIDS"}>Kids</Link>
													</SheetClose>
												</span>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-3">
											<AccordionTrigger>Accessories</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=WALLETS"}>
															Wallets
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=WATCHES"}>
															Watches
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=BELTS"}>Belts</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=BAGS"}>Bags</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=PERFUMES"}>
															Perfumes
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-4">
											<AccordionTrigger>Electronics</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=GAMING"}>
															Gaming
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=POWERBANK"}>
															Powerbank
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=HEADPHONES"}>
															Headphones
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link
															href={"/products?category=MOBILE_ACCESSORIES"}
														>
															Mobile Accessories
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-5">
											<AccordionTrigger>Mobiles</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=MOBILES"}>
															Mobiles
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-6">
											<AccordionTrigger>Others</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<SheetClose asChild>
														<Link href={"/products?category=OTHERS"}>
															Others
														</Link>
													</SheetClose>
												</span>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>
							)}
						</ScrollArea>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</>
	);
}
