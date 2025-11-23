import {
  OpenAIModelProvider,
  createZypherContext,
  ZypherAgent,
} from "jsr:@corespeed/zypher@0.5.1";
import { eachValueFrom } from "npm:rxjs-for-await";

export async function runPlannerChat(messages) {
  const zypher = await createZypherContext(Deno.cwd());
  const agent = new ZypherAgent(
    zypher,
    new OpenAIModelProvider({
      apiKey: Deno.env.get("OPENAI_API_KEY")!,
    }),
  );

  const history = messages
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  const prompt = `
You are a helpful planning assistant. Continue the conversation naturally.

Conversation so far:
${history}

Assistant:
  `;

  const event$ = agent.runTask(prompt, "gpt-4.1-mini");
  let output = "";

  for await (const event of eachValueFrom(event$)) {
    if (event.type === "message" && event.message?.role === "assistant") {
      for (const c of event.message.content ?? []) {
        if (c.type === "text") output += c.text;
      }
    }
  }

  return output.trim();
}
