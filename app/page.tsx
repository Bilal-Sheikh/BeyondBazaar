import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
	// const user = await currentUser();
	// console.log(user?.firstName);

	return (
		<>
			<Navbar />

			<section className="space-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:py-40">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
						The
						<span className="px-2 bg-gradient-to-r from-green-400 to-indigo-600 bg-clip-text text-transparent md:px-4">
							BEST
						</span>
						E-commerce website in the world ;)
					</h1>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						Choose from a wide variety of products, including electronics,
						clothing, accessories, appliances, and more.
					</p>
				</div>
			</section>

			<section className="space-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:py-36">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
						Browse from Categories
					</h2>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						Find the products you're looking for in a variety of categories.
					</p>
				</div>
			</section>

			<div>
				<section className="space-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:py-36">
					<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
						<h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
							Browse from Categories
						</h2>
						<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
							Find the products you're looking for in a variety of categories.
						</p>
					</div>
				</section>
				<section className="space-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:py-36">
					<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
						<h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
							Browse from Categories
						</h2>
						<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
							Find the products you're looking for in a variety of categories.
						</p>
					</div>
				</section>
			</div>

			<Footer />
		</>
	);
}
