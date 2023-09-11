"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { OAuthStrategy } from "@clerk/types";

export default function SignInOAuthButtons() {
	const { signIn } = useSignIn();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const signInWith = (strategy: OAuthStrategy) => {
		// @ts-ignore // TODO fix undefined
		return signIn.authenticateWithRedirect({
			strategy,
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/",
		});
	};

	// Render a button for each supported OAuth provider
	// you want to add to your app
	return (
		<>
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={() => signInWith("oauth_google")}
			>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.google className="mr-2 h-4 w-4" />
				)}{" "}
				Google
			</Button>
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={() => signInWith("oauth_github")}
			>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{" "}
				Github
			</Button>
		</>
	);
}
