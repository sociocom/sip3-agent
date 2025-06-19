import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const sip3dictInfo = createTool({
  id: "SIP3辞書でカルテ文書を解析する",
  inputSchema: z.object({
    text: z.string(),
  }),
  description: `SIP3辞書で入力のカルテ文書を解析する`,
  execute: async ({ context: { text } }) => {
    console.log("SIP3辞書APIを呼び出しています");
    const d = await sip3dictAsString(text);
    const newText = text + "\n\n# 辞書項目\n" + d;
    return newText;
  },
});

async function callSip3dict(text: string) {
  const url = process.env.SIP3DICT_API_URL as string;
  //const q = text.replace(/\r?\n/g, "\\n");
  const encoded = encodeURIComponent(text);
  const response = await fetch(`${url}?text=${encoded}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    // console.log(result);
    return result;
  } else {
    console.error("Error:", response.status, response.statusText);
    return [];
  }
}

async function sip3dictAsString(text: string) {
  const entries = await callSip3dict(text);
  const strs = [];
  for (const e of entries) {
    const o = {
      text: e.text,
      ...(e.standard_name && { standard_name: e.standard_name }),
      ...(e.to_icd10 && { to_icd10: e.to_icd10 }),
    };
    strs.push(JSON.stringify(o));
  }
  return strs.join("\n");
}
