import { useEffect, useState } from "react";
import {
  QuerySnapshot,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Message from "./Message";
import db from "../services/firebaseConfig";

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<{ content: string; senderId: string; senderUsername: string; timestamp: string }[]>([]);

  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    const messagesQuery = query(messagesCollection, orderBy("timestamp"));

    // Fetch all messages once on component mount
    const fetchMessages = async () => {
      getDocs(messagesQuery).then((snapshot: QuerySnapshot) => {
        const initialMessages = snapshot.docs.map((doc) => ({
          content: doc.data().content,
          senderId: doc.data().senderId,
          senderUsername: doc.data().senderUsername,
          timestamp: doc.data().timestamp.toDate().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        }));
        setMessages(initialMessages);
      });
    };

    // Subscribe to changes after initial fetch
    const subscribeToMessages = () => {
      onSnapshot(messagesQuery, (snapshot: QuerySnapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => ({
          content: doc.data().content,
          senderId: doc.data().senderId,
          senderUsername: doc.data().senderUsername,
          timestamp: doc.data().timestamp.toDate().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        }));
        setMessages(updatedMessages);
      });
    };

    fetchMessages();
    const unsubscribe = subscribeToMessages();
    
    // Cleanup subscription on component unmount
    return () => unsubscribe;
  }, []);

  return (
    <div className="flex flex-col h-full overflow-auto mb-4">
      <ul className="space-y-5 mt-auto">
        {messages.map((message, i) => {
          return (
            <Message
              key={i}
              senderId={message.senderId}
              senderUsername={message.senderUsername}
              content={message.content}
              timestamp={message.timestamp}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MessageList;
