import express from "express";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { name } = req.body;

  try {
    const channelsCollection = collection(db, "channels");
    const docRef = await addDoc(channelsCollection, {
      name,
      timestamp: new Date(),
    });

    res.status(201).json({
      message: "Channel created successfully",
      data: { name, channelId: docRef.id },
    });
  } catch (error: any) {
    console.error("Error creating channel to Firestore:", error);
    res
      .status(500)
      .json({ message: "Failed to create channel", error: error.message });
  }
});

export default router;
