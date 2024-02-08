import express from "express";
import chatRoutes from "./routes/chatRoutes";
import cors from "cors";

const app: express.Application = express();
const port: number = 3001;

app.use(express.json());
app.use(cors());

app.use("/api/messages", chatRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
