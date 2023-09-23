import React from "react";
import PcNavbar from "./PcNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs";
import RightSideNav from "./RightSideNav";

export default async function Navbar() {
	const user = await currentUser();
	const role = user?.publicMetadata?.role as string;

	return (
		<>
			<header className="sticky top-0 bg-background border-b z-50">
				<div className="container flex h-16 items-center gap-4">
					<div className="hidden lg:block ">
						<PcNavbar role={role} />
					</div>

					<div className="block lg:hidden">
						<MobileNavbar user={user} role={role}/>
					</div>

					<RightSideNav user={user} role={role} />
				</div>
			</header>
		</>
	);
}
