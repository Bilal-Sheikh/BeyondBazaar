import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { UserWebhookEvent } from "@clerk/nextjs/server";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "";
if (!WEBHOOK_SECRET) {
	throw new Error("WEBHOOK_SECRET not found");
}

type Event = {
	type: UserWebhookEvent;
	object: "event";
	data: Record<string, string | number>;
};

export async function POST(req: Request) {
	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new SVIX instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);
	let evt: Event;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as Event;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", {
			status: 400,
		});
	}

	// Get the ID and type
	const eventType = evt.type;
	const { id, first_name, last_name, ...attributes } = evt.data;

	//@ts-ignore
	const email = evt.data.email_addresses[0].email_address;

	console.log("EVENT DATA :::", evt.data);
	console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
	console.log("EVENT TYPE ::: ", eventType);
	console.log("EMAIL ADDRESSES ::: ", email);

	if (
		String(eventType) === "user.created" ||
		String(eventType) === "user.updated"
	) {
		await prisma.user.upsert({
			where: { externalId: id as string },
			create: {
				externalId: id as string,
				firstName: first_name as string,
				lastName: last_name as string,
				email: email as string,
				attributes,
			},
			update: { attributes },
		});
	}

	return new Response("", { status: 201 });
}
