import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const api_key = process.env.STREAM_CLIENT_KEY;
const api_secret = process.env.STREAM_CLIENT_SECRET;

if (!api_key || !api_secret) {
  console.error("Please provide API_KEY and API_SECRET in the .env file.");
  process.exit(1);
}

const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});
app.post("/login");

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
