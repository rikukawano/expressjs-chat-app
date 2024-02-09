import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import db from "./firebaseConfig";
import { Message } from "../types";

export const fetchMessages = async (currentChannel: string): Promise<Message[]> => {
  const messagesCollection = collection(db, `channels/${currentChannel}/messages`);
  const messagesQuery = query(messagesCollection, orderBy("timestamp"));
  const snapshot: QuerySnapshot = await getDocs(messagesQuery);
  return snapshot.docs.map((doc) => ({
    content: doc.data().content,
    senderId: doc.data().senderId,
    senderUsername: doc.data().senderUsername,
    timestamp: doc.data().timestamp.toDate().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  }));
};

export const subscribeToMessages = (currentChannel: string, setMessages: (messages: Message[]) => void) => {
  const messagesCollection = collection(db, `channels/${currentChannel}/messages`);
  const messagesQuery = query(messagesCollection, orderBy("timestamp"));
  return onSnapshot(messagesQuery, (snapshot: QuerySnapshot) => {
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