'server-only';

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUser, createUser } from "~/server/queries";

export async function PUT() {
    const existingUser = await getUser();

    // If user does not exist, insert them into the database
    if (!existingUser) {
        const creadtedUser = await createUser();
        console.log("User added to database");
    } else {
        console.log("User already exists in the database");
    }

    return NextResponse.json({ message: "User updated" });
}