import { Mastra } from "@mastra/core";

//import { chefAgent } from "./agents/chefAgent";
import { sip3dictAgent } from "./agents/sip3dictAgent";

/*
export const mastra = new Mastra({
  agents: { chefAgent },
});
*/

export const mastra = new Mastra({
  agents: { sip3dictAgent },
});
