"use client";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { ResponseSchema } from "@/app/api/use-object/schema";
import { useState } from "react";

const Entity = ({ value, context }: { value?: string; context?: string }) => {
  const [overwrite, setOverwrite] = useState(false);
  const { object, submit, isLoading } = useObject({
    api: "/api/use-object",
    schema: ResponseSchema,
    onFinish: (object) => {
      console.log(object);
    },
  });
  const handleClick = () => {
    setOverwrite(true);
    submit(context || `What is ${value}?`);
  };

  if (!value) {
    return null;
  }
  if (!overwrite) {
    return (
      <button
        className="mx-1 px-1 rounded-md bg-gray-200 font-sans text-xl font-medium"
        onClick={handleClick}
      >
        {value}
      </button>
    );
  }
  if (isLoading && !object) {
    return (
      <span className="mx-1 px-1 rounded-md bg-gray-100 text-gray-500 font-sans text-xl font-medium animate-pulse">
        loading
      </span>
    );
  }
  return (
    object?.response &&
    object?.response.map((response, index) => {
      if (response?.type === "text") {
        return <Text value={response?.value} key={index} />;
      } else {
        // todo: rich prompting for generated entities
        return <Entity value={response?.value} key={index} />;
      }
    })
  );
};

const Text = ({ value }: { value?: string }) => {
  if (!value) {
    return null;
  }
  return <span className="font-serif text-2xl">{value}</span>;
};

export { Entity, Text };
