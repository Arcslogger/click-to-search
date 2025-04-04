import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { ResponseSchema } from "./schema";
import { rootPrompt } from "./prompt";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai("gpt-4o"),
    schema: ResponseSchema,
    prompt: rootPrompt + context,
  });

  return result.toTextStreamResponse();
}
