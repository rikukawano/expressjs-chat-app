import { useState } from "react";
import { sendMessage } from "../services/chatService";
import { useUser } from "@clerk/clerk-react";

const SendMessageForm: React.FC = () => {
  const [message, setMessages] = useState("");

  const { user } = useUser();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleClick();
    }
  };

  const handleClick = async () => {
    if (!message.trim()) return;
    if (user == null) return new Error("User was not found");

    try {
      await sendMessage({
        senderId: user.id,
        senderUsername: user.username!,
        content: message,
      });
    } catch (error) {
      throw new Error("Failed to send message");
    }
    setMessages("");
  };

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-lg shadow-md">
      <textarea
        placeholder="Type your message..."
        className="flex-1 rounded-md border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none h-12 p-2"
        value={message}
        onChange={(e) => setMessages(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleClick}
      >
        Send
      </button>
    </div>
  );
};

export default SendMessageForm;
