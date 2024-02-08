import { ServerResponse } from "http";

interface Message {
  senderId: string;
  senderUsername: string;
  content: string;
}

async function sendMessage(message: Message): Promise<ServerResponse> {
  try {
    const response = await fetch("http://localhost:3001/api/messages/send", {
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

async function createChannel(channelName: string): Promise<ServerResponse> {
  try {
    const response = await fetch("http://localhost:3001/api/channels/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: channelName }),
    });

    if (!response.ok) {
      throw new Error("Failed to create the channel.");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating channel:", error);
    throw new Error(
      "There was a problem creating the channel. Please try again."
    );
  }
}

export { sendMessage, createChannel };
