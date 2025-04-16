"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { ResponseSchema } from "@/app/api/use-object/schema";
import { useState } from "react";
import { useStore, Text as StoreText, Entity as StoreEntity } from "./Store";
import { useShallow } from "zustand/react/shallow";

export const Entity = ({
  storeId,
  name,
}: {
  storeId?: number;
  name?: string;
}) => {
  // MARK: properties ================================

  const updateContext = useStore(useShallow((state) => state.updateContext));
  const generatePrompt = useStore(useShallow((state) => state.generatePrompt));
  const [overwrite, setOverwrite] = useState<boolean>(false);
  const [finalVal, setFinalVal] = useState<(StoreText | StoreEntity)[]>([]);
  const getNextEntityId = useStore((state) => state.getNextEntityId);
  const { object, submit, isLoading } = useObject({
    api: "/api/use-object",
    schema: ResponseSchema,
    onFinish: (object) => {
      if (object.error || !object.object) {
        throw new Error("Error on entity generation completion");
      }
      console.log(object);

      const newContext = object.object.insertion.map((item) => {
        if (item.type === "text") {
          return { text: item.value };
        } else {
          return { entity: item.value, id: getNextEntityId() };
        }
      });
      updateContext(newContext, storeId!);
      setFinalVal(newContext);
    },
  });

  // MARK: methods ================================
  const handleClick = () => {
    if (!storeId) return;

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
    <>
      {finalVal && finalVal.length > 0 ? (
        finalVal.map((response, index) => {
          if ("text" in response) {
            return <Text value={response.text} key={index} />;
          } else {
            return (
              <Entity
                storeId={response.id}
                name={response.entity}
                key={index}
              />
            );
          }
        })
      ) : (
        <span className="bg-yellow-200">
          {object?.insertion?.map((response, index) => {
            return <Text value={response?.value} key={index} />;
          })}
        </span>
      )}
    </>
  );
};

export const Text = ({ value }: { value?: string }) => {
  if (!value) {
    return null;
  }
  return <span className="font-serif text-2xl">{value}</span>;
};
