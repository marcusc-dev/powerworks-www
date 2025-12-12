# OpenAI Web Search Skill

This skill enables real-time web search capabilities using OpenAI's GPT model with web search tools.

## Configuration

Requires `OPENAI_API_KEY` in `.env.local`:
```
OPENAI_API_KEY=your_api_key_here
```

## Usage

```typescript
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.responses.create({
    model: "gpt-4o",
    tools: [{ type: "web_search" }],
    input: "Your search query here",
});

console.log(response.output_text);
```

## Use Cases

- Research current events and news
- Find up-to-date information not in training data
- Verify facts and gather sources
- Research competitors, market trends, or industry news
- Find documentation or tutorials

## Notes

- The API key should never be exposed in frontend code
- For browser usage, create a backend API endpoint to proxy requests
- Results include web sources that can be cited
