import { z } from "zod";

export const ResponseSchema = z.object({
  response: z.array(
    z
      .object({
        type: z
          .enum(["text", "entity"])
          .describe(
            "Entities are a special type of text that represent topics searchable on the wikipedia."
          ),
        value: z
          .string()
          .describe("Value of text (specfically a name/title for entities)."),
      })
      .describe(
        "Reply with text. When comming across any topics with a wikipedia page, switch to an entity and go back to text when done."
      )
  ),
});
