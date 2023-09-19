import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";

export async function POST(request: Request) {
	const { role, userId } = await request.json();
	console.log("ROLE AND USERID ::::::::::::::::", role, userId);

	await clerkClient.users.updateUserMetadata(userId, {
		publicMetadata: {
			role,
		},
	});

	return NextResponse.json({ success: true });
}
