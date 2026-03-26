import OpenAI from "openai";

// NVIDIA's API is OpenAI-compatible — same library, different baseURL
const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

const SYSTEM_PROMPT = {
  role: "system",
  content: `You are a helpful, friendly AI assistant.
  You give clear and concise answers.
  If you don't know something, you say so honestly.`,
};

const generateResponse = async (messages) => {
  try {
    const response = await client.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct", // free NVIDIA model
      messages: [
        SYSTEM_PROMPT,
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;
    return reply;

  } catch (error) {
    console.error("❌ NVIDIA API Error:", error.message);
    throw error;
  }
};

export default generateResponse;