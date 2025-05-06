import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  startChatWithQuery: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ startChatWithQuery }) => {
  const [input, setInput] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const words = ["Healthcare", "Banking", "Insurance", "Retail", "Manufacturing"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (typedWord === currentWord) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50);
        }, 2000);
      } else {
        timeout = setTimeout(() => {
          setTypedWord(currentWord.slice(0, typedWord.length + 1));
          setTypingSpeed(150);
        }, typingSpeed);
      }
    } else {
      if (typedWord === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(150);
      } else {
        timeout = setTimeout(() => {
          setTypedWord(currentWord.slice(0, typedWord.length - 1));
          setTypingSpeed(50);
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedWord, currentWordIndex, isDeleting, typingSpeed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startChatWithQuery(input.trim());
    }
  };

  const prompts = [
    "What services does Marlabs offer?",
    "Tell me about Marlabs' expertise in healthcare",
    "How can Marlabs help with digital transformation?",
  ];

  return (
    <section className="relative z-10 flex flex-col items-center justify-center py-6 md:py-16">

      {/* Heading */}
      <div className="w-full max-w-xl text-center mb-4">
        <h1 className="text-[32px] md:text-[48px] font-light leading-tight whitespace-nowrap">
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
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hello! How may I help you?"
          className="w-full bg-black text-white placeholder-white text-base py-2.5 pl-5 pr-12 rounded-full border border-white focus:outline-none"
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
        <div className="mt-2 flex flex-col gap-1.5 max-w-xl w-full items-start">
          {prompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => startChatWithQuery(prompt)}
              className="border border-white rounded-full px-4 py-1.5 text-white italic text-sm text-left hover:bg-white hover:text-black transition self-start"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-6 text-center text-sm text-gray-300 font-semibold tracking-wide max-w-md mx-auto leading-relaxed">
        This chatbot is powered by Marlabs. Be aware AI-generated responses may be inaccurate
      </p>

    </section>
  );
};

export default Hero;