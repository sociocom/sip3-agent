"use client";
//import { Assistant } from "./assistant";
import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { ThreadList } from "@/components/assistant-ui/thread-list";

export default function Home() {
  //return <Assistant />;

  // Point the runtime to the Mastra server endpoint
  const runtime = useChatRuntime({
    api: "http://localhost:4111/api/agents/sip3dictAgent/stream",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <main className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
        <ThreadList />
        <Thread />
      </main>
    </AssistantRuntimeProvider>
  );
}
