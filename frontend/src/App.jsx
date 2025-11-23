// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m your Task Breakdown Agent. Tell me a goal and I’ll turn it into a structured plan.",
    },
  ]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (!chatRef.current) return;

    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });

  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const reply = data.reply || "(No response from agent)";

      setMessages([
        ...newMessages,
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Oops, I couldn’t reach the backend. Please check that the Deno server is running on /chat.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`app ${darkMode ? "app--dark" : "app--light"}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__logo">CoreSpeed Agent</div>
        <div className="sidebar__sectionTitle">Conversations</div>
        <div className="sidebar__item sidebar__item--active">
          <span className="sidebar__dot" />
          Task Breakdown
        </div>
        <div className="sidebar__sectionTitle">Status</div>
        <div className="sidebar__status">
          <span className={`statusDot ${loading ? "statusDot--busy" : ""}`} />
          {loading ? "Thinking…" : "Ready"}
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <div>
            <div className="header__title">Task Breakdown Agent</div>
            <div className="header__subtitle">
              Give me a goal, I’ll give you a plan.
            </div>
          </div>
          <button
            className="header__toggle"
            onClick={() => setDarkMode((d) => !d)}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* Chat Area */}
        <section className="chat" ref={chatRef}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`messageRow messageRow--${m.role}`}
            >
              {m.role === "assistant" && (
                <div className="avatar avatar--agent">A</div>
              )}

              <div className={`bubble bubble--${m.role}`}>
                <div className="bubble__role">
                  {m.role === "user" ? "You" : "Agent"}
                </div>
                <div className="bubble__content">{m.content}</div>
              </div>

              {m.role === "user" && (
                <div className="avatar avatar--user">Y</div>
              )}
            </div>
          ))}
          {loading && (
            <div className="typingRow">
              <div className="avatar avatar--agent">A</div>
              <div className="typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </section>

        {/* Input Area */}
        <footer className="inputBar">
          <textarea
            className="inputBar__textarea"
            placeholder="Describe your goal… (Press Enter to send, Shift+Enter for new line)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="inputBar__button"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Thinking…" : "Send"}
          </button>
        </footer>
      </main>
    </div>
  );
}
