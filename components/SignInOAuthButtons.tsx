"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useSignIn } from "@clerk/nextjs";
import { Icons } from "@/components/icons";
import { OAuthStrategy } from "@clerk/types";

export default function SignInOAuthButtons() {
	const { signIn } = useSignIn();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signInWith = (strategy: OAuthStrategy) => {
		return signIn?.authenticateWithRedirect({
			strategy,
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/",
		});
	};

	return (
		<>
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={() => signInWith("oauth_google")}
			>
				<Icons.google className="mr-2 h-4 w-4" />
				Google
			</Button>
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={() => signInWith("oauth_github")}
			>
				<Icons.gitHub className="mr-2 h-4 w-4" />
				Github
			</Button>
		</>
	);
}
