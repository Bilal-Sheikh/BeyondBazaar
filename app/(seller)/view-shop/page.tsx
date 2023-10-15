import DashboardPage from "@/components/seller/DashboardPage";
import React, { Suspense } from "react";
import Loading from "./loading";

export default function ViewShop() {
	return (
		<div>
			<Suspense
				fallback={
					// <Loading />
					<p>Loading shop...</p>
				}
			>
				<DashboardPage />
			</Suspense>
		</div>
	);
}
