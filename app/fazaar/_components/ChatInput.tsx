'use client'

import { Textarea } from "~/components/ui/textarea"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,  // Retry connection
  timeout: 20000,  // Increase timeout
});

export const ChatInput: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("response", (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("query") as string;
  
    const data = {
      body: message,
      attachments: [],
    };
  
    try {
      console.log("Here ", message);
      // Make the POST request to the server API
      socket.emit("message", message);
    }
    catch (error) {
      console.error("Error sending message", error);
    }
  }

  return (
    <div>
      {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      <form onSubmit={handleSubmit} onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}>
        <Textarea name="query" placeholder="Type your message here." />
      </form>      
    </div>
  );
};