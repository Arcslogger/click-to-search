import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { rootPrompt } from "./prompt";
import { ResponseSchema } from "./schema";

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai("gpt-4.1-2025-04-14"),
    schema: ResponseSchema,
    prompt: rootPrompt + context,
  });

  return result.toTextStreamResponse();
}
