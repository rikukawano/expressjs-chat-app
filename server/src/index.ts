import express from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes";
import channelRoutes from "./routes/channelRoutes";

const app: express.Application = express();
const port: number = 3001;

app.use(express.json());
app.use(cors());

app.use("/api/messages", messageRoutes);
app.use("/api/channels", channelRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
