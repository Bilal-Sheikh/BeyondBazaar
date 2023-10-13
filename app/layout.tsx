import "@uploadthing/react/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Beyond Bazzar",
	description:
		"A E-commerce website for buying and selling products build using Nextjs 13 and Shadcn UI",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body className={inter.className}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						{children}
					</ThemeProvider>
					<Toaster />
				</body>
			</html>
			<Script src="https://checkout.razorpay.com/v1/checkout.js" />
		</ClerkProvider>
	);
}
