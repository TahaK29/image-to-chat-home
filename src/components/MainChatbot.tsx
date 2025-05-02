import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createDirectLine } from "botframework-webchat";
import { marked } from "marked";

interface MainChatbotProps {
  initialQuery?: string;
  onClose: () => void;
}

interface ChatMessage {
  type: "user" | "bot";
  text: string;
}

// ✅ DO NOT TOUCH THIS FUNCTION
function formatBotMessage(text: string) {
  const urlRegex = /\[(\d+)\]: (https?:\/\/[^\s]+)\s+"([^"]+)"/g;
  return text.replace(
    urlRegex,
    (_match, index, url, label) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#4FC3F7; text-decoration:underline;">[${index}] ${label}</a>`
  );
}

const MainChatbot: React.FC<MainChatbotProps> = ({ initialQuery = "", onClose }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [directLine, setDirectLine] = useState<any>(null);
  const [botTyping, setBotTyping] = useState(false);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch(import.meta.env.VITE_TOKEN_ENDPOINT);
      const data = await res.json();
      const token = data.token || data;
      const dl = createDirectLine({ token });
      setDirectLine(dl);

      dl.activity$.subscribe((activity: any) => {
        if (activity.type === "message" && activity.from.role === "bot") {
          setTimeout(() => {
            setMessages((prev) => [...prev, { type: "bot", text: activity.text }]);
            setBotTyping(false);
          }, 600);
        }
      });
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (initialQuery && directLine) {
      setMessages([{ type: "user", text: initialQuery }]);
      setBotTyping(true);
      directLine.postActivity({
        from: { id: "user1", name: "User" },
        type: "message",
        text: initialQuery,
      }).subscribe();
    }
  }, [initialQuery, directLine]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const input = userInput.trim();
    if (!input || !directLine) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setUserInput("");
    setBotTyping(true);

    directLine.postActivity({
      from: { id: "user1", name: "User" },
      type: "message",
      text: input,
    }).subscribe();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 flex flex-col bg-black text-white rounded-lg overflow-hidden">

      {/* ✅ Fixed top-right Close button */}
      <button
        onClick={onClose}
        className="fixed top-20 right-750 z-50 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 shadow-md"
        aria-label="Close chat"
      >
        <X className="w-5 h-5" />
      </button>

      {/* ✅ Chatbox */}
      <div
        ref={chatboxRef}
        className="flex-1 overflow-y-auto space-y-4 px-6 pt-6 pb-2 h-[450px] bg-black"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 text-sm rounded-lg ${
                msg.type === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-black text-white border border-black rounded-bl-none"
              }`}
            >
              <div
                className="prose prose-invert text-sm"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(formatBotMessage(msg.text)),
                }}
              />
            </div>
          </div>
        ))}

        {/* ✅ Typing dots */}
        {botTyping && (
          <div className="flex justify-start">
            <div className="bg-black text-white text-sm px-4 py-3 rounded-lg border border-gray-700 rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* ✅ Input area */}
      <form onSubmit={handleSubmit} className="m-4 relative w-full max-w-4xl">
        <textarea
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          rows={1}
          className="w-full pr-12 pl-6 py-4 text-white text-sm bg-black resize-none rounded-full border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-700 shadow-none leading-tight"
        />
        <Button
          type="submit"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-marlabs-green hover:bg-marlabs-blue text-white rounded-full h-8 w-8 p-0 flex items-center justify-center"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default MainChatbot;
