import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  
  // const user = await currentUser();
  // console.log(user?.firstName);

  return (
    <>
      <Navbar />
    </>
  );
}
