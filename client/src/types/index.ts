export interface Channel {
    id: string;
    name: string;
  }
  
export interface Message {
    content: string;
    senderId: string;
    senderUsername: string;
    timestamp: string;
  }