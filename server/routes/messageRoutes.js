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
const express_1 = __importDefault(require("express"));
const firebaseConfig_1 = require("../firebaseConfig");
const firestore_1 = require("firebase/firestore");
const router = express_1.default.Router();
router.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, senderUsername, content } = req.body;
    try {
        const messagesCollection = (0, firestore_1.collection)(firebaseConfig_1.db, "messages");
        const docRef = yield (0, firestore_1.addDoc)(messagesCollection, {
            senderId,
            senderUsername,
            content,
            timestamp: new Date(),
        });
        res.status(201).json({
            message: "Message sent successfully",
            data: { senderId, senderUsername, content, messageId: docRef.id },
        });
    }
    catch (error) {
        console.error("Error sending message to Firestore:", error);
        res
            .status(500)
            .json({ message: "Failed to send message", error: error.message });
    }
}));
exports.default = router;
