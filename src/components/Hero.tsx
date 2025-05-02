import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  startChatWithQuery: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ startChatWithQuery }) => {
  const [input, setInput] = useState("");
  const [typedWord, setTypedWord] = useState("Data");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const prompts = [
    "How can you help manufacturers improve supply chain management with AI?",
    "What is your approach to Data Governance for Healthcare?",
    "Give me examples of your enterprise AI case studies.",
  ];

  const words = ["Data", "AI", "Engineering", "Strategy", "Products"];

  useEffect(() => {
    let timeout: number;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      timeout = window.setTimeout(() => {
        setTypedWord((prev) => prev.slice(0, -1));
      }, 80);
    } else {
      if (typedWord.length < currentWord.length) {
        timeout = window.setTimeout(() => {
          setTypedWord(currentWord.slice(0, typedWord.length + 1));
        }, 150);
      } else {
        timeout = window.setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    if (isDeleting && typedWord.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [typedWord, isDeleting, wordIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startChatWithQuery(input.trim());
      setInput("");
    }
  };

  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12 py-24">
      {/* Heading */}
      <div className="w-full max-w-xl text-center mb-8">
        <h1 className="text-[36px] md:text-[56px] font-light leading-tight whitespace-nowrap">
          Driving Digital Agility in{" "}
          <span
            className="font-bold text-white border-l-4 border-green-500 pl-2"
            style={{
              minWidth: "100px",
              display: "inline-block",
              textAlign: "left",
            }}
          >
            {typedWord}
          </span>
        </h1>
      </div>

      {/* Input field */}
      {/* Input field (with arrow inside box) */}
<form
  onSubmit={handleSubmit}
  className="relative w-full max-w-xl"
>
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Hello! How may I help you?"
    className="w-full bg-black text-white placeholder-white text-base py-3 pl-5 pr-12 rounded-full border border-white focus:outline-none"
  />
  <button
    type="submit"
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
    aria-label="Send"
  >
    <ArrowRight className="w-4 h-4" />
  </button>
</form>


      {/* Prompt buttons */}
      {input.trim() === "" && (
        <div className="mt-4 flex flex-col gap-3 max-w-xl w-full items-start">
          {prompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => startChatWithQuery(prompt)}
              className="border border-white rounded-full px-5 py-2 text-white italic text-sm text-left hover:bg-white hover:text-black transition self-start"
            >
              “{prompt}”
            </button>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-gray-400 text-xs mt-10 max-w-md text-left leading-relaxed">
        This chatbot is powered by Marlabs. AI-generated responses may be inaccurate,
        please double-check information. We may collect your personal information, by
        using this chat you confirm that you agree to Marlabs’{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </section>
  );
};

export default Hero;