import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from "./config/db.js";
import { generateResponse } from "./services/aiService.js";



// Step 1: Create app FIRST
const app = express();

// Step 2: Middleware
app.use(express.json());

// Step 3: Connect DB
connectDB();

// Step 4: Routes (NOW you can use app)
console.log("ENV KEY:", process.env.OPENAI_API_KEY);
app.get("/ai-test", async (req, res) => {
  try {
    console.log("AI route hit");

    const reply = await generateResponse([
      { role: "user", content: "Hello" }
    ]);

    res.json({ reply });
  } catch (error) {
    console.error("Route Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Step 5: Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});