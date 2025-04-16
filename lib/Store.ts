import { create } from "zustand";
import initContext from "./starterContext.json";

export type Text = {
  text: string;
};
export type Entity = {
  entity: string;
  id: number;
};
type Store = {
  context: (Text | Entity)[];
  printContext: () => void; // for debug purposes
  generatePrompt: (replaceId: number) => string;
  nextEntityId: number;
};
type Action = {
  updateContext: (context: (Text | Entity)[], fromEntityId: number) => void;
  getNextEntityId: () => number;
};

export const useStore = create<Store & Action>()((set, get) => ({
  context: initContext,
  nextEntityId: 7,

  printContext: () => {
    console.log(
      get()
        .context.map((item) => {
          return "id" in item ? `<[${item.id}] ${item.entity}>` : item.text;
        })
        .join()
    );
  },

  generatePrompt: (replaceId: number) => {
    let prefix = "";
    let suffix = "";
    let replacedEntity = "";
    let passedReplaceId = false;
    for (const item of get().context) {
      if ("id" in item && item.id === replaceId) {
        passedReplaceId = true;
        replacedEntity = item.entity;
        continue;
      }
      if (!passedReplaceId) {
        prefix +=
          "id" in item ? `<Entity value={${item.entity}} />` : item.text;
      } else {
        suffix +=
          "id" in item ? `<Entity value={${item.entity}} />` : item.text;
      }
    }

    const fullPrompt = `${prefix}[BLANK]${suffix}\n\n### Prefix:\n${prefix}\n\n### Suffix:\n${suffix}\n\nFill in [BLANK] with an insertion summarizing <Entity value={${replacedEntity}} /> in a way that bridges between the prefix and suffix without repeating existing entities.`;
    return fullPrompt;
  },

  getNextEntityId: () => {
    const current = get().nextEntityId;
    console.log(`incrementing nextEntityId from ${current} to ${current + 1}`);
    set((state) => ({ nextEntityId: state.nextEntityId + 1 }));
    return current;
  },

  updateContext: (context: (Text | Entity)[], fromEntityId: number) => {
    set((state) => {
      const matchEntityId = (item: Text | Entity) => {
        return "id" in item && item.id === fromEntityId;
      };

      // check id uniqueness
      const matches = state.context.filter(matchEntityId);
      if (matches.length > 1) {
        throw new Error("Entity id not unique");
      } else if (matches.length === 0) {
        throw new Error("Entity not found");
      }

      // replace entity with new context
      const entityIndex = state.context.findIndex(matchEntityId);
      const newContext = [...state.context];
      const deleted = newContext.splice(entityIndex, 1, ...context);

      // sanity check of splice params
      if (deleted.length !== 1 || deleted[0] !== matches[0]) {
        throw new Error("Correct entity not deleted");
      }

      return { context: newContext };
    });
  },
}));
