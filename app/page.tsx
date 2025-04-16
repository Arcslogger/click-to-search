"use client";

import { Entity, Text } from "@/lib/Response";
import { useStore } from "@/lib/Store";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const context = useStore(useShallow((state) => state.context));
  const printContext = useStore(useShallow((state) => state.printContext));

  useEffect(() => {
    printContext();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-[64rem] my-10">
        {context.map((item, index) => {
          if ("id" in item) {
            return <Entity storeId={item.id} name={item.entity} key={index} />;
          } else {
            return <Text value={item.text} key={index} />;
          }
        })}
      </div>
    </div>
  );
}
