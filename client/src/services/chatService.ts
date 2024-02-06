import { ServerResponse } from "http";

interface Message {
  senderId: string;
  content: string;
}

async function sendMessage(message: Message): Promise<ServerResponse> {
  try {
    const response = await fetch("http://localhost:3000/api/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Failed to send the message.");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error(
      "There was a problem sending your message. Please try again."
    );
  }
}

export default sendMessage;
