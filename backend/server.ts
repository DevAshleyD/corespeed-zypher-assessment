import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { runPlannerChat } from "./zypherAgent.ts";

serve(async (req) => {
  const url = new URL(req.url);

  if (req.method === "POST" && url.pathname === "/chat") {
    const body = await req.json();
    const reply = await runPlannerChat(body.messages);
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }

  return new Response("Not Found", { status: 404 });
}, { port: 8080, hostname: "0.0.0.0" });

console.log("Chat backend running at http://0.0.0.0:8080/chat");
