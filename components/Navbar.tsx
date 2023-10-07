import React from "react";
import PcNavbar from "./PcNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs";
import RightSideNav from "./RightSideNav";

export default async function Navbar() {
	const user = await currentUser();
	const role = user?.publicMetadata?.role as string;

	return (
		<header className="sticky top-0 bg-background border-b z-50">
			<div className="px-3 md:px-10 flex flex-auto h-16 justify-center items-center w-full gap-4">
				<div className="max-sm:hidden max-md:hidden max-lg:hidden lg:block">
					<PcNavbar role={role} />
				</div>

				<div className="max-sm:block max-md:block max-lg:block lg:hidden gap-4">
					<MobileNavbar user={user} role={role} />
				</div>

				<RightSideNav user={user} role={role} />
			</div>
		</header>
	);
}
