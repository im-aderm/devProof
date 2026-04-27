import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello, reply with JSON: {\"status\": \"ok\"}" }],
      response_format: { type: "json_object" },
    });
    console.log("SUCCESS:", response.choices[0].message.content);
  } catch (error) {
    console.error("OPENAI_ERROR:", error);
  }
}

test();
