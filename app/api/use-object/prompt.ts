import exampleResponse from "./example.json";

const rootPrompt = `
## Task 1

### Full paragraph:
Frank Ocean is a singer, songwriter, record producer, and visual artist known for his genre-blending music, introspective lyrics, and unique storytelling. His most acclaimed albums include [BLANK] and <Entity value="Blonde (2016)" />, which have cemented him as one of the most influential artists of his generation.

### Prefix:
Frank Ocean is a singer, songwriter, record producer, and visual artist known for his genre-blending music, introspective lyrics, and unique storytelling. His most acclaimed albums include 

### Suffix:
 and <Entity value="Blonde (2016)" />, which have cemented him as one of the most influential artists of his generation.

Fill in [BLANK] with an insertion summarizing <Entity value="Channel Orange (2012)" /> in a way that bridges between the prefix and suffix without repeating existing entities.

### Response:

${JSON.stringify(exampleResponse, null, 2)}

## Task 2

`;

const testPrompt1 = `
Joji is a singer, songwriter, and record producer known for his melancholic, <Entity value="lo-fi" />, and <Entity value="R&B" />-influenced music. Formerly a YouTube personality under the name <Entity value="Filthy Frank" />, he transitioned into music with his debut album [BLANK], which featured the hit <Entity value="Slow Dancing in the Dark" />. His later albums, <Entity value="Nectar (2020)" /> and <Entity value="Smithereens (2022)" />, further established his signature emotional and atmospheric sound.

### Prefix:
Joji is a singer, songwriter, and record producer known for his melancholic, <Entity value="lo-fi" />, and <Entity value="R&B" />-influenced music. Formerly a YouTube personality under the name <Entity value="Filthy Frank" />, he transitioned into music with his debut album 

### Suffix:
, which featured the hit <Entity value="Slow Dancing in the Dark" />. His later albums, <Entity value="Nectar (2020)" /> and <Entity value="Smithereens (2022)" />, further established his signature emotional and atmospheric sound.  

Fill in [BLANK] with an insertion summarizing <Entity value="Ballads 1 (2018)" /> in a way that bridges between the prefix and suffix without repeating existing entities.

### Response:

`;

export { rootPrompt, testPrompt1 };
