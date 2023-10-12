import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";

export async function POST(request: Request) {
	const { role, userId } = await request.json();
	console.log("ROLE AND USERID ::::::::::::::::", role, userId);

	try {
		await clerkClient.users.updateUserMetadata(userId, {
			publicMetadata: {
				role,
			},
		});
		return NextResponse.json(
			{
				success: true,
				message: "Successfully created seller account",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log("ERROR IN app/api/(seller)/seller-sign-in/route.ts", error);
	}

	return NextResponse.json(
		{
			success: true,
			message: "Error in creating seller account",
		},
		{ status: 500 }
	);
}
