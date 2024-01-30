"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const firebase = (0, app_1.initializeApp)(firebaseConfig);
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        if (!username || typeof username !== "string")
            return res.status(400).json({ error: "Invalid username" });
        const userRef = yield writeUserData(username);
        res.status(201).json({
            message: "User created successfully",
            userId: userRef.key
        });
    }
    catch (e) {
        console.error("An error occurred:", e);
        res.status(500).json({ error: e.message });
    }
}));
app.delete("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id || typeof id !== "string") {
            return res.status(400).json({ error: "Invalid or missing user id in request body." });
        }
        const db = (0, database_1.getDatabase)(firebase);
        const userRef = (0, database_1.ref)(db, `users/${id}`);
        yield (0, database_1.remove)(userRef);
        res.status(200).json({
            message: "User deleted successfully"
        });
    }
    catch (e) {
        console.error("An error occurred:", e);
        res.status(500).json({ error: e.message });
    }
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
function writeUserData(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, database_1.getDatabase)(firebase);
        const userRef = (0, database_1.ref)(db, `users/${username}`);
        yield (0, database_1.set)(userRef, {
            username: username,
            createdAt: (0, database_1.serverTimestamp)(),
            updatedAt: (0, database_1.serverTimestamp)(),
        });
        return userRef;
    });
}
