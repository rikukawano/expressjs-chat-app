import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, serverTimestamp } from "firebase/database";

import express from "express";
import { Request, Response } from "express";

import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
  databaseURL: process.env.DATABASE_NAME,
  projectId: process.env.PROJECT_ID,
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const app: express.Application = express();
const port: number = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function writeUserData(username: string) {
  const db = getDatabase(firebase);
  const userRef = ref(db, `users/${username}`);
  await set(userRef, {
    username: username,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return userRef;
}

app.post("/create-user", async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username || typeof username !== "string")
      return res.status(400).json({ error: "Invalid username" });

    const userRef = await writeUserData(username);

    res.status(201).json({
      message: "User created successfully",
      userId: userRef.key
    });
  } catch (e: any) {
    console.error("An error occurred:", e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
