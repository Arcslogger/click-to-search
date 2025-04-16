"use client";

import { Entity, Text } from "@/lib/Response";
import starterContext from "@/lib/starterContext.json";

export default function Home() {
  let id = 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-[64rem] my-10">
        {starterContext.map((item, index) => {
          if ("id" in item) {
            return <Entity storeId={id++} name={item.entity} key={index} />;
          } else {
            return <Text value={item.text} key={index} />;
          }
        })}
      </div>
    </div>
  );
}
