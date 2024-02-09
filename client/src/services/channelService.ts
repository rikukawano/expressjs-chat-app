import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import db from "./firebaseConfig";
import { Channel } from "../types";

export const fetchChannels = async (): Promise<Channel[]> => {
  const channelsCollection = collection(db, "channels");
  const channelsQuery = query(channelsCollection, orderBy("timestamp", "asc"));
  const snapshot: QuerySnapshot = await getDocs(channelsQuery);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};

export const subscribeToChannels = (setChannels: (channels: Channel[]) => void) => {
  const channelsCollection = collection(db, "channels");
  const channelsQuery = query(channelsCollection, orderBy("timestamp", "asc"));
  return onSnapshot(channelsQuery, (snapshot: QuerySnapshot) => {
    const updatedChannels = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    setChannels(updatedChannels);
  });
};