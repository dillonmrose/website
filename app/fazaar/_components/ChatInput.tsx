'use client'

import { Textarea } from "~/components/ui/textarea"

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const message = formData.get("query") as string;

  const data = {
    body: message,
    attachments: [],
  };

  try {
    // Make the POST request to the server API
    const response = await fetch("http://localhost:5000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      // Handle success (e.g., reset form, show success message)
      console.log("Message sent:", responseData);
    } else {
      // Handle error (e.g., show error message)
      console.error("Failed to send message:", responseData.message);
    }
  } catch (error) {
    console.error("Error during POST request:", error);
  }
}

export const ChatInput: React.FC = () => {
  return (
    <form onSubmit={handleSubmit} onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}>
      <Textarea name="query" placeholder="Type your message here." />
    </form>
  );
};