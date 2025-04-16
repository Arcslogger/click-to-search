"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { ResponseSchema } from "@/app/api/use-object/schema";
import { useState } from "react";
import { useStore } from "./Store";
import { useShallow } from "zustand/react/shallow";

export const Entity = ({
  storeId,
  name,
}: {
  storeId: number;
  name?: string;
}) => {
  // MARK: properties ================================

  const getNextEntityId = useStore(
    useShallow((state) => state.getNextEntityId)
  );
  const updateContext = useStore(useShallow((state) => state.updateContext));
  const generatePrompt = useStore(useShallow((state) => state.generatePrompt));

  const [overwrite, setOverwrite] = useState(false);
  const { object, submit, isLoading } = useObject({
    api: "/api/use-object",
    schema: ResponseSchema,
    onFinish: (object) => {
      if (object.error || !object.object) {
        throw new Error("Error on entity generation completion");
      }

      const newContext = object.object.insertion.map((item) => {
        if (item.type === "text") {
          return { text: item.value };
        } else {
          return { entity: item.value, id: getNextEntityId() };
        }
      });
      updateContext(newContext, storeId);
    },
  });

  // MARK: methods ================================
  const handleClick = () => {
    setOverwrite(true);
    const prompt = generatePrompt(storeId);
    console.log(prompt);
    submit(prompt);
  };

  // MARK: rendering logic ================================
  if (!overwrite) {
    return (
      <button
        className="mx-0.5 px-1 rounded-md bg-gray-200 font-sans text-xl font-medium"
        onClick={handleClick}
      >
        {name}
      </button>
    );
  }
  if (isLoading && !object) {
    return (
      <span className="mx-0.5 px-1 rounded-md bg-gray-100 text-gray-500 font-sans text-xl font-medium animate-pulse">
        loading
      </span>
    );
  }
  return (
    <span className="bg-yellow-200">
      {object?.insertion &&
        object?.insertion.map((response, index) => {
          if (response?.type === "text") {
            return <Text value={response?.value} key={index} />;
          } else {
            return (
              <Entity
                storeId={getNextEntityId()}
                name={response?.value}
                key={index}
              />
            );
          }
        })}
    </span>
  );
};

export const Text = ({ value }: { value?: string }) => {
  if (!value) {
    return null;
  }
  return <span className="font-serif text-2xl">{value}</span>;
};
