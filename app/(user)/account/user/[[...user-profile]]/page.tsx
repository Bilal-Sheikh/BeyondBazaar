import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
	<div className="container flex justify-center items-center">
		<UserProfile path="/account/user" routing="path" />
	</div>
);

export default UserProfilePage;
