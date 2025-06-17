// Final React frontend (safe): Only sends userInput + history to backend with secure config
import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marked } from "marked";

interface MainChatbotProps {
  initialQuery?: string;
  onClose: () => void;
}

interface ChatMessage {
  type: "user" | "bot";
  text: string;
}

function formatBotMessage(text: string) {
  const urlRegex = /\[(\d+)\]: (https?:\/\/[^\s]+)\s+\"([^\"]+)\"/g;
  return text.replace(
    urlRegex,
    (_m, i, url, label) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#4FC3F7;text-decoration:underline;">[${i}] ${label}</a>`
  );
}

const AZURE_FUNCTION_URL = `https://marlabs-server-webbot.azurewebsites.net/api/HttpTrigger1?code=${import.meta.env.VITE_AZURE_FUNC_KEY}`;

const MainChatbot: React.FC<MainChatbotProps> = ({ initialQuery = "", onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (input: string) => {
    setBotTyping(true);

    const messagesPayload = [
      ...messages.map((m) => ({ role: m.type === "user" ? "user" : "assistant", content: m.text })),
      { role: "user", content: input },
    ];

    try {
      const response = await fetch(AZURE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input, history: messages }),
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { type: "bot", text: "Error contacting assistant." }]);
    } finally {
      setBotTyping(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;
    const input = userInput.trim();
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setUserInput("");
    sendMessage(input);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  useEffect(() => {
    if (initialQuery) {
      setMessages([{ type: "user", text: initialQuery }]);
      sendMessage(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 flex flex-col bg-black text-white rounded-lg overflow-hidden h-[calc(100vh-200px)]">
      <button onClick={onClose} className="fixed top-20 right-20 z-50 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 shadow-md" aria-label="Close chat">
        <X className="w-5 h-5" />
      </button>
      <div className="flex-1 overflow-y-auto space-y-4 px-6 pt-6 pb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 text-sm rounded-lg ${msg.type === "user" ? "bg-blue-600 rounded-br-none" : "bg-gray-900 rounded-bl-none"}`}>
              <div className="prose prose-invert text-sm" dangerouslySetInnerHTML={{ __html: marked.parse(formatBotMessage(msg.text)) }} />
            </div>
          </div>
        ))}
        {botTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-900 text-white px-4 py-3 rounded-lg rounded-bl-none">…typing</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="m-4 relative w-full max-w-4xl">
        <textarea
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
          rows={1}
          className="w-full pr-12 pl-6 py-4 text-white text-sm bg-gray-800 resize-none rounded-full border border-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <Button type="submit" className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-marlabs-green hover:bg-marlabs-blue text-white rounded-full h-8 w-8 p-0 flex items-center justify-center" disabled={botTyping}>
          <ArrowUp className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default MainChatbot;