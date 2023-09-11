import React from "react";
import PcNavbar from "./PcNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs";
import RightSideNav from "./RightSideNav";

export default async function navbar() {
	const user = await currentUser();

	return (
		<>
			<header className="sticky top-0 bg-background border-b">
				<div className="container flex h-16 items-center gap-4">
					<div className="hidden lg:block ">
						<PcNavbar />
					</div>

					<div className="block lg:hidden">
						<MobileNavbar user={user} />
					</div>

					<RightSideNav user={user} />
				</div>
			</header>
		</>
	);
}
