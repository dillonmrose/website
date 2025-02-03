import "server-only";

import { db } from "./db";
import { users, messages, chats } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getMessages() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const messages = await db.query.messages.findMany({
    where: (messages, { eq }) => eq(messages.user_id, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return messages;
}

export async function getUser() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const userInDb = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return userInDb;
}

export async function createUser() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const userInDb = await db.insert(users).values({
    id: user.userId,
    email: "temp",
    full_name: "temp",
    created_at: new Date(),
  });

  return userInDb;
}

export async function insertMessage(messageBody: string, attachaments: string[], existingChatId : number | undefined) {
  const user = await auth();
  const transaction = await db.transaction(async (tx)=>{
    // Insert into messages
    const insertedMessage = await tx.insert(messages).values({
      user_id: user.userId!,
      body: messageBody,
      attachments: [],
    }).returning({ id: messages.id });

    if (insertedMessage?.length !== 1) {
      tx.rollback();
    }

    const insertedMessageId = insertedMessage[0].id;

    let insertedChatId : number | undefined = undefined;
    if (existingChatId)
    {
      const insertedChat = await tx.insert(chats).values({
        id: existingChatId,
        message_id: insertedMessageId,
        name: "New chat",
      }).returning({ id: chats.id });
      if (insertedChat?.length !== 1) {
        tx.rollback();
      }
      insertedChatId = insertedChat[0].id;
    }
    else{
      const insertedChat = await tx.insert(chats).values({
        message_id: insertedMessageId,
        name: "New chat",
      }).returning({ id: chats.id });

      if (insertedChat?.length !== 1) {
        tx.rollback();
      }
      insertedChatId = insertedChat[0].id;
    }

    return {
      insertedMessageId,
      insertedChatId
    };
  });

  return transaction;
}