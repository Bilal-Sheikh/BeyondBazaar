import { NextResponse } from "next/server";

export async function GET() {

	// return new Response(JSON.stringify({server : 'Server is OK'}));
    return NextResponse.json({ server : 'Server is OK' })
}
