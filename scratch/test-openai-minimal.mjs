import OpenAI from "openai";

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello, reply with JSON: {\"status\": \"ok\"}" }],
      response_format: { type: "json_object" },
    });
    console.log("SUCCESS:", response.choices[0].message.content);
  } catch (error) {
    console.error("OPENAI_ERROR:", error.message);
    if (error.response) {
      console.error("DATA:", error.response.data);
    }
  }
}

test();
