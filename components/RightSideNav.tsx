import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ui/dark-mode";
import { Search, ShoppingCart } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { User } from "@clerk/nextjs/server";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
	user: User | null;
	role: string;
}

export default function RightSideNav({ user, role }: NavbarProps) {
	return (
		<>
			<div className="flex flex-1 items-center justify-end gap-3">
				{role === "SELLER" ? (
					<></>
				) : (
					<Button
						variant={"outline"}
						className="text-xs w-full justify-start text-gray-400 sm:w-2/5 sm:text-sm"
					>
						<div className="p-1">
							<Search size={17} />
						</div>
						Search products...
					</Button>
				)}

				<div>
					<ModeToggle />
				</div>

				<div className="max-sm:hidden max-md:hidden max-lg:hidden lg:block">
					{/* <DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">Open</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<span>Profile</span>
									<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Billing</span>
									<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Settings</span>
									<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Keyboard shortcuts</span>
									<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<span>Team</span>
								</DropdownMenuItem>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<span>Invite users</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>
												<span>Email</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<span>Message</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<span>More...</span>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuItem>
									<span>New Team</span>
									<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<span>GitHub</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Support</span>
							</DropdownMenuItem>
							<DropdownMenuItem disabled>
								<span>API</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<span>Log out</span>
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu> */}

					{user ? (
						<div className="flex items-center justify-center gap-3">
							{role === "SELLER" ? (
								<>
									<UserButton afterSignOutUrl="/" />
								</>
							) : (
								<>
									<Button variant="outline" size="icon">
										<ShoppingCart size={17} />
									</Button>
									<UserButton afterSignOutUrl="/" />
								</>
							)}
						</div>
					) : (
						<div className="flex items-center justify-center gap-3">
							<Button variant="outline" size="icon">
								<ShoppingCart size={17} />
							</Button>
							<Link
								href={"/sign-in"}
								className={buttonVariants({
									variant: "default",
								})}
							>
								{" "}
								SignIn
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
