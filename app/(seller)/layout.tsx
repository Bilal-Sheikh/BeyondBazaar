import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs";
import Unauthorized from "../unauthorized/page";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await currentUser();

	return (
		<section>
			{user?.publicMetadata.role !== "SELLER" ? (
				<Unauthorized />
			) : (
				<>
					<Navbar />
					{children}
					<Footer />
				</>
			)}
		</section>
	);
}
