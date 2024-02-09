import Message from "./Message";
import { Message as MessageType } from "../types";

interface MessageListProps {
  messages: MessageType[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col h-full overflow-auto mb-4">
      <ul className="space-y-5 mt-auto">
        {messages.map((message, index) => (
          <Message
            key={index}
            senderId={message.senderId}
            senderUsername={message.senderUsername}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
      </ul>
    </div>
  );
}
