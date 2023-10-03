import Footer from "@/components/Footer";
import { currentUser } from "@clerk/nextjs";
import UserDashboard from "@/components/user/UserDashboard";
import SellerDashboard from "@/components/seller/SellerDashboard";

export default async function Home() {
	const user = await currentUser();
	const role = user?.publicMetadata?.role;
	console.log("ROLE FROM FRONTEND ::::::::::::::", role);

	return (
		<>
			{role === "SELLER" ? <SellerDashboard /> : <UserDashboard />}
			<Footer />
		</>
	);
}
