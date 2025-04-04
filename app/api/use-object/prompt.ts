const rootPrompt = `
## Example task

Frank Ocean is a singer, songwriter, record producer, and visual artist known for his genre-blending music, introspective lyrics, and unique storytelling. His most acclaimed albums include [blank] and Blonde (2016), which have cemented him as one of the most influential artists of his generation.

Fill in [blank] with a description of Channel Orange (2012) that flows with the rest of the paragraph:

### Example response:

[
  {
    "type": "text",
    "value": "works such as "
  },
  {
    "type": "entity",
    "value": "Channel Orange (2012)"
  },
  {
    "type": "text",
    "value": ", which is the debut studio album by Frank Ocean. It blends "
  },
  {
    "type": "entity", 
    "value": "R&B"
  },
  {
    "type": "text",
    "value": ", "
  },
  {
    "type": "entity",
    "value": "soul"
  },
  {
    "type": "text", 
    "value": ", "
  },
  {
    "type": "entity",
    "value": "jazz"
  },
  {
    "type": "text",
    "value": ", and psychedelic influences, featuring introspective storytelling and themes of love, identity, and social commentary. The album includes standout tracks like "
  },
  {
    "type": "entity",
    "value": "Thinkin Bout You, "
  },
  {
    "type": "entity",
    "value": "Pyramids, "
  },
  {
    "type": "text",
    "value": "and "
  },
  {
    "type": "entity",
    "value": "Bad Religion."
  },
  {
    "type": "text",
    "value": "It received critical acclaim, won a 
 }, {
  "type": "entity",
  "value": "Grammy"
 }, {
  "type": "text",
  "value": "for Best Urban Contemporary Album, and solidified Ocean as one of the most innovative artists of his generation. He went on to release a variety of other works, such as collaborations "
 } 
]

## Task 1
`;

const testPrompt1 = `
Joji is a singer, songwriter, and record producer known for his melancholic, lo-fi, and R&B-influenced music. Formerly a YouTube personality under the name Filthy Frank, he transitioned into music with his debut album [blank], which featured the hit Slow Dancing in the Dark. His later albums, Nectar (2020) and Smithereens (2022), further established his signature emotional and atmospheric sound.

Fill in [blank] with a description of Ballads 1 (2018) that flows with the rest of the paragraph:

### Response:

`;

export { rootPrompt, testPrompt1 };
