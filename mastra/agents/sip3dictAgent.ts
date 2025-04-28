import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { Agent } from "@mastra/core/agent";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: "http://localhost:1234/v1",
});

export const sip3dictAgent = new Agent({
  name: "SIP3 Dictionary Agent",
  instructions: `
        あなたは医療文書に書かれた内容について回答するアシスタントです。
        - 文書の末尾には、文書中に含まれる医療用語の辞書項目が付与されるので、それらの情報を活用してください。
        - 回答は簡潔に述べてください。
  `,
  //model: openai("gpt-4o"),
  //model: ollama.chat("qwen2.5:7b", {simulateStreaming: true,}),
  model: lmstudio.chatModel(process.env.LLM as string),
});
