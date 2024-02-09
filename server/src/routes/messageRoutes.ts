import express from "express";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { senderId, senderUsername, content, channelId } = req.body.message;

  try {
    const channelMessagesCollection = collection(
      db,
      `channels/${channelId}/messages`
    );
    const docRef = await addDoc(channelMessagesCollection, {
      senderId,
      senderUsername,
      content,
      timestamp: new Date(),
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: { senderId, senderUsername, content, messageId: docRef.id },
    });
  } catch (error: any) {
    console.error("Error sending message to Firestore:", error);
    res
      .status(500)
      .json({ message: "Failed to send message", error: error.message });
  }
});

export default router;
