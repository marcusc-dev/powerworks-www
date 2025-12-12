import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Get search query from command line arguments
const query = process.argv.slice(2).join(" ") || "What is the latest news today?";

console.log(`\nSearching for: "${query}"\n`);

const response = await client.responses.create({
    model: "gpt-4o",
    tools: [{ type: "web_search" }],
    input: query,
});

console.log(response.output_text);
