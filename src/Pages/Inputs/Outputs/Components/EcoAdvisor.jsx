import React, { useState, useRef, useEffect } from "react";

export default function EcoAdvisor({ context }) {
    const [messages, setMessages] = useState([
        {
            role: "bot",
            text: "Hi! I'm EcoAdvisor 🌱 Ask me anything about your simulation results, break-even timeline, or sustainability options.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function sendMessage() {
        if (!input.trim()) return;
        const userMsg = { role: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, context }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: data.reply ?? "Sorry, I couldn't get a response.",
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-2xl bg-white/60 border border-black/10 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-[#324D3E] px-6 py-4">
                <h2 className="text-white text-xl font-black">🌱 EcoAdvisor</h2>
                <p className="text-white/70 text-xs mt-0.5">
                    AI-powered sustainability insights
                </p>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto px-4 py-4 space-y-3 bg-[#f9fbf9]">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`flex ${
                            m.role === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                                m.role === "user"
                                    ? "bg-[#324D3E] text-white rounded-br-sm"
                                    : "bg-white border border-black/10 text-gray-700 rounded-bl-sm"
                            }`}
                        >
                            {m.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-black/10 text-gray-400 px-4 py-2 rounded-2xl rounded-bl-sm text-sm animate-pulse">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-black/10 bg-white flex gap-2">
                <input
                    className="flex-1 border border-black/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#324D3E]/30"
                    placeholder="Ask about your results..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={loading}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-[#324D3E] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-40"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
