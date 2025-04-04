"use client";

import { Entity } from "@/components/Response";
import { rootPrompt, testPrompt1 } from "./api/use-object/prompt";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-[64rem] my-10">
        <p className="font-serif text-2xl">
          Joji is a singer, songwriter, and record producer known for his
          melancholic, <Entity value="lo-fi" />, and <Entity value="R&B" />
          -influenced music. Formerly a YouTube personality under the name{" "}
          <Entity value="Filthy Frank" />, he transitioned into music with his
          debut album
          <Entity value="Ballads 1 (2018)" context={rootPrompt + testPrompt1} />
          , which featured the hit <Entity value="Slow Dancing in the Dark" />.
          His later albums,
          <Entity value="Nectar (2020)" /> and{" "}
          <Entity value="Smithereens (2022)" />, further established his
          signature emotional and atmospheric sound.
        </p>
      </div>
    </div>
  );
}
