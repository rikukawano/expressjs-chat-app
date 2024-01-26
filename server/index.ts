import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDo31JSOv7ftdS8Wc4NkTftgJwNJt7LzTs",
  authDomain: "xyz-chat-app-bb36d.firebaseapp.com",
  projectId: "xyz-chat-app-bb36d",
  storageBucket: "xyz-chat-app-bb36d.appspot.com",
  messagingSenderId: "393761320303",
  appId: "1:393761320303:web:81d8ea267d7e10bd83cc9a",
  measurementId: "G-265MDKHDNQ",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
