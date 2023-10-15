import React from "react";

export default function Footer() {
	return (
		<footer className="border-t z-50">
			<div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<p className="text-center text-sm leading-loose md:text-left">
						Built by using{" "}
						<a
							href="https://ui.shadcn.com/"
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							shadcn
						</a>{" "}
						UI and{" "}
						<a
							href="https://nextjs.org/blog/next-13-4"
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							Next.js
						</a>{" "}
						13.4 · Hosted on{" "}
						<a
							href="https://vercel.com"
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							Vercel
						</a>{" "}
						· The source code is available on{" "}
						<a
							href="https://github.com/Bilal-Sheikh/BeyondBazaar"
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							GitHub
						</a>
						.
					</p>
				</div>
			</div>
		</footer>
	);
}
