 # 🌐 CoreSpeed Zypher Agent — Technical Assessment  
 ### _Built by: AshleyD_

 This project is my submission for the **CoreSpeed Technical Assessment**, implementing a fully functional AI Agent using **Zypher**, CoreSpeed’s agent framework.  

 The agent takes any **user goal** and converts it into a structured, actionable plan — with a beautiful **glassmorphism UI**, smooth animations, neon accents, and a responsive layout.

 ---

 ## 🚀 Features

 ### 🤖 AI Agent (Zypher + OpenAI)
 - Goal → Task breakdown  
 - Multi-turn conversation memory  
 - Assistant typing indicator  
 - Error handling + fallback messages  
 - Clean backend architecture using Deno  

 ### 🎨 Modern React Frontend  
 - **Glassmorphism + Neon Glow UI**  
 - Slack-style layout  
 - Smooth animations  
 - Dark/Light mode toggle  
 - Typing indicator  
 - Avatars (User + Agent)  
 - Beautiful custom scroll bars  
 - Auto-scrolling  
 - Fully responsive  

 ### 🌐 Network-friendly
 - Works with **LAN IP**  
 - Vite configured with:
   - `host: true`  
   - proxy to backend  
 - Compatible with Windows proxies  

 ---

 ## 📁 Folder Structure (High-Level)

 - `backend/` — Deno + Zypher + OpenAI agent backend  
 - `frontend/` — React + Vite UI for interacting with the agent  
 - `README.md` — this file  
 - `.gitignore` — ignores node_modules, dist, env, etc.

 ---

 ## 🔑 Environment Variables

Create `backend/.env`:

 ```bash
 OPENAI_API_KEY=your_key_here
 ```

 _(This file should NOT be committed to GitHub.)_

 ---

 ## 🖥️ Backend Setup (Deno)

 1. Install Deno if needed: https://deno.com/runtime  
 2. Install dependencies (if any deno.json tasks are used).  
 3. From the `backend/` folder, run:

 ```bash
 deno run -A --env server.ts
 ```

 The backend will start on:

 ```text
 http://localhost:8080
 ```

 ---

 ## 🎨 Frontend Setup (React + Vite)

 1. From the `frontend/` folder, install dependencies:

 ```bash
 npm install
 ```

 2. Start the dev server:

 ```bash
 npm run dev
 ```

 Vite will print something like:

 ```text
 Local:   http://localhost:5173/
 Network: http://192.168.xx.xx:5173/
 ```

 If you're behind a proxy / on Windows corporate WiFi, open the **Network** URL in your browser.

 ---

 ## 🔧 Vite Proxy Setup

 The `vite.config.js` is configured so that frontend calls to `/chat` automatically proxy to the backend:

 ```js
 server: {
   host: true,
   port: 5173,
   proxy: {
     "/chat": {
       target: "http://localhost:8080",
       changeOrigin: true,
     },
   },
 },
 ```

 This means the React app just does:

 ```js
 fetch("/chat", { ... })
 ```

 and Vite forwards it to the Deno backend.

 ---

 ## 💬 How to Use the Agent

 1. Start the backend (`deno run -A --env server.ts` in `backend/`).  
 2. Start the frontend (`npm run dev` in `frontend/`).  
 3. Open the URL from Vite (usually `http://localhost:5173/` or the Network URL).  
 4. Type a goal, e.g.:

    > I want to go to Japan

 5. The agent responds with a structured, step-by-step plan.  
 6. You can continue the conversation with follow-up questions.  
 7. Toggle dark/light mode and enjoy the modern UI.

 ---

 ## 🎥 Demo Video

 A short demo video (screen recording) can be linked here:

  `https://www.loom.com/share/20f98b200b304f36a76484a4a5fbc684`

 ---

 ## 🧠 Tech Stack

 - **Agent:** Zypher (CoreSpeed), OpenAI  
 - **Runtime:** Deno  
 - **Frontend:** React + Vite  
 - **Styling:** Custom CSS (glassmorphism, neon theme)  
 - **Language:** TypeScript / JavaScript

 ---

 ## 📜 License

 This project is created solely for the **CoreSpeed Technical Assessment**.

 ---

 ## 👋 Author

 - GitHub: https://github.com/DevAshleyD
