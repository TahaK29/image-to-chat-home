import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isChatOpen: boolean;
  toggleChat: () => void;
}

const Navbar = ({ isChatOpen, toggleChat }: NavbarProps) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateToHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-white dark:bg-gray-800 w-full py-3 px-6 md:px-12 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <img 
                src={`${import.meta.env.BASE_URL}lovable-uploads/cd313b9b-45f4-459c-8b63-bd24cc55cc94.png`}
                alt="Marlabs Logo" 
                className="h-8 w-auto mr-2 cursor-pointer"
                onClick={navigateToHome}
              />
            </div>
          </div>
          
          {isMobile ? (
            <>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <button 
                  onClick={toggleMenu} 
                  className="text-marlabs-blue dark:text-white p-1.5"
                  aria-label="Toggle menu"
                >
                  {menuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  )}
                </button>
              </div>

              {menuOpen && (
                <div className="absolute top-14 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50 py-3 px-6 flex flex-col space-y-3 animate-fade-in">
                  <a href="#" className="text-marlabs-blue dark:text-white hover:text-marlabs-green py-1.5">What we do</a>
                  <a href="#" className="text-marlabs-blue dark:text-white hover:text-marlabs-green py-1.5">What we think</a>
                  <a href="#" className="text-marlabs-blue dark:text-white hover:text-marlabs-green py-1.5">Who we are</a>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-6">
              <div className="flex space-x-8">
                <a href="#" className="text-marlabs-blue dark:text-white hover:text-marlabs-green">What we do</a>
                <a href="#" className="text-marlabs-blue dark:text-white hover:text-marlabs-green">What we think</a>
                <a href="#" className="text-marlabs-blue dark:text-white hover:text-marlabs-green">Who we are</a>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
