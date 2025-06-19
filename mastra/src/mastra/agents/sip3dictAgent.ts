import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { Agent } from "@mastra/core/agent";
import { sip3dictInfo } from "../tools/sip3dictInfo";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: "http://localhost:1234/v1",
});

export const sip3dictAgent = new Agent({
  name: "SIP3 Dictionary Agent",
  instructions: `
        あなたは医療文書に書かれた内容について回答するアシスタントです。
        - 入力された文書をsip3dictInfoで解析し、結果のテキストを利用して回答してください。。
        - 回答は簡潔に述べてください。
  `,
  //model: openai("gpt-4o"),
  //model: ollama.chat("qwen2.5:7b", {simulateStreaming: true,}),
  model: lmstudio.chatModel(process.env.LLM as string),
  tools: { sip3dictInfo },
});
