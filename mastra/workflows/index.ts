import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";

export const myWorkflow = new Workflow({
  name: "カルテについて聞いて",
  triggerSchema: z.object({
    inputValue: z.string(),
  }),
});

const inputDoc = new Step({
  id: "input",
  outputSchema: z.object({}),
  execute: async ({ context }) => {
    const dictInput = context.triggerData.inputValue + "\n解析済";
    return { dictInput };
  },
});

//myWorkflow.step(stepOne).then(stepTwo).commit();
myWorkflow.step(inputDoc).commit();
