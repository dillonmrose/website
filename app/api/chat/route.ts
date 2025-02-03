'server-only';

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { insertMessage } from "~/server/queries";

export async function POST(req: Request) {
  try {
    // Get the authenticated user
    const user = await auth();

    // Parse the JSON body of the request
    const { body, attachments, chatId } = await req.json();

    if (!body) {
      return NextResponse.json({ message: "Missing required fields", body: body, req: req }, { status: 400 });
    }

    const response = insertMessage(body, attachments, chatId);

    return NextResponse.json(response, { status: 201 }); // Return the created user with status 201

  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}