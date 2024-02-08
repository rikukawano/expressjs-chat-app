"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const channelRoutes_1 = __importDefault(require("./routes/channelRoutes"));
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/messages", messageRoutes_1.default);
app.use("/api/channels", channelRoutes_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
