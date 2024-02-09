import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SendMessageForm from "../components/SendMessageForm";
import MessageList from "../components/MessageList";
import { Channel, Message } from "../types";
import { fetchMessages, subscribeToMessages } from "../services/messageService";
import { fetchChannels, subscribeToChannels } from "../services/channelService";

export default function HomePage(){
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchAndSetChannels = async () => {
      const initialChannels = await fetchChannels();
      setChannels(initialChannels);
      if (initialChannels.length > 0) {
        setCurrentChannel(initialChannels[0].id);
      }
    };

    fetchAndSetChannels();
    const unsubscribe = subscribeToChannels(setChannels);
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentChannel) return;

    const fetchAndSubscribeToMessages = async () => {
      const initialMessages = await fetchMessages(currentChannel);
      setMessages(initialMessages);
    };

    fetchAndSubscribeToMessages();
    const unsubscribe = subscribeToMessages(currentChannel, setMessages);
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [currentChannel]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar
        channels={channels}
        currentChannel={currentChannel}
        setCurrentChannel={setCurrentChannel}
      />
      <div className="flex-1 flex-col overflow-auto lg:pl-72">
        <div className="h-full flex flex-col justify-end px-4 pb-4">
          <MessageList messages={messages} />
          <SendMessageForm currentChannel={currentChannel} />
        </div>
      </div>
    </div>
  );
};
