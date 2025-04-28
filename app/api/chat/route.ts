import { mastra } from "@/mastra"; // Adjust the import path if necessary

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

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

export async function POST(req: Request) {
  // Extract the messages from the request body
  const { messages } = await req.json();

  // 手動で入力文書をsip3辞書で拡張する。TODO: ベストではないので今後修正
  const text = messages[messages.length - 1].content[0].text;
  const s = await sip3dictAsString(text);
  messages[messages.length - 1].content[0].text = text + "\n\n# 辞書項目\n" + s;

  // Get the chefAgent instance from Mastra
  const agent = mastra.getAgent("sip3dictAgent");

  // Stream the response using the agent
  const result = await agent.stream(messages);

  // Return the result as a data stream response
  return result.toDataStreamResponse();
}
