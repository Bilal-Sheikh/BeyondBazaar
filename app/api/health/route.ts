import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ server: "Server is OK" }, { status: 200 });
}
