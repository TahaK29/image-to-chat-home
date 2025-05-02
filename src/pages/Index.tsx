import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MainChatbot from "@/components/MainChatbot";
import Footer from "@/components/Footer";

const Index = () => {
  const [chatMode, setChatMode] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");
  const chatbotRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const startChatWithQuery = (query: string) => {
    setInitialQuery(query);
    setChatMode(true);
    setTimeout(() => {
      chatbotRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ✅ ADD THIS FUNCTION 👇
  const handleChatClose = () => {
    setChatMode(false);
    setInitialQuery("");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setChatMode(false);
      setInitialQuery("");
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Navbar always visible */}
      <Navbar isChatOpen={chatMode} toggleChat={() => setChatMode(!chatMode)} />
  
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full overflow-auto">
        {/* Show Hero only when chat is NOT active */}
        {!chatMode ? (
          <div className="w-full max-w-6xl px-4 py-16">
            <Hero startChatWithQuery={startChatWithQuery} />
          </div>
        ) : (
          <div 
            ref={chatbotRef} 
            className="w-full max-w-6xl px-4 py-8 flex-1 flex flex-col"
          >
            <MainChatbot initialQuery={initialQuery} onClose={handleChatClose} />
          </div>
        )}
      </main>
  
      {/* Show footer ONLY when chat is NOT active */}
      {!chatMode && <Footer />}
      
      {/* Decorative elements to match Globant style */}
      {/* ✅ Replace green glow with faint bg image in same region */}
<div className="fixed right-0 bottom-59.6 w-[1400px] h-[1400px] z-0 pointer-events-none opacity-10">
  <img
    src="bgimg.png"
    alt="background-glow"
    className="w-full h-full object-contain"
  />
</div>

    </div>
  );
  
};

export default Index;
