import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { sip3dictAgent } from "./agents/sip3dictAgent";

export const mastra = new Mastra({
  agents: { sip3dictAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
});
