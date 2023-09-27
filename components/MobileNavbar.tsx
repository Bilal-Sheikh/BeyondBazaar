import React from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import logoBlack from "../public/logoBlack.png";
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
							<div className="flex items-center justify-around">
								<div>
									<Link href={"/"}>
										<Image src={logoBlack} alt="Logo" width={130} />
									</Link>
								</div>
								<div>
									{user ? (
										<UserButton afterSignOutUrl="/" />
									) : (
										<Link
											href={"/sign-in"}
											className={buttonVariants({
												variant: "outline",
											})}
										>
											{" "}
											Sign In
										</Link>
									)}
								</div>
							</div>
						</SheetTitle>
						<Separator />
						<ScrollArea className="h-[calc(100vh-8rem)]">
							{role === "SELLER" ? (
								<div className="py-5">
									<Button variant="link" className="w-full py-7">
										<span className="items-center justify-between py-4 font-medium text-lg transition-all hover:underline">
											<Link href="/add-product">Add New Product</Link>
										</span>
									</Button>

									<Separator />
									<Button variant="link" className="w-full py-7">
										<span className="items-center justify-between py-4 font-medium text-lg transition-all hover:underline">
											<Link href="/view-products">View Your Products</Link>
										</span>
									</Button>

									<Separator />
									<Button variant="link" className="w-full py-7">
										<span className="items-center justify-between py-4 font-medium text-lg transition-all hover:underline">
											<Link href="/">View Your Shop</Link>
										</span>
									</Button>
								</div>
							) : (
								<div className="pr-20">
									<Accordion type="multiple" className="w-full">
										<AccordionItem value="item-1">
											<AccordionTrigger>Clothing</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Men's Top Wear</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Men's Bottom Wear</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Women's Top Wear</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Women's Bottom Wear</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Men Footwear</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Women Footwear</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Kids</Link>
												</span>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-2">
											<AccordionTrigger>Accessories</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Wallets</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Watches</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Belts</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Bags</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Perfumes</Link>
												</span>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-3">
											<AccordionTrigger>Electronics?</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Gaming</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Powerbank</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Headphones</Link>
												</span>
											</AccordionContent>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Mobile Accessories</Link>
												</span>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-4">
											<AccordionTrigger>Mobiles</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Mobiles</Link>
												</span>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-5">
											<AccordionTrigger>Wierd Stuff</AccordionTrigger>
											<AccordionContent>
												<span className="text-gray-500 hover:text-gray-300">
													<Link href={"/"}>Wierd Stuff</Link>
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
