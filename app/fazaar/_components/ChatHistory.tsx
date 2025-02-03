import { getMessages } from "~/server/queries";

export async function ChatHistory() {
  const messages = await getMessages();

  return (
    <div>
      {messages.map((message) => (<div key={message.id}>{message.body}</div>))}
    </div>
  );
};