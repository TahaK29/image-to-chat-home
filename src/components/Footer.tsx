import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#003366] text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">

        {/* Middle Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo and Description */}
          <div>
            <img
              src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67eecaabdbea1afe67974ee9_Marlabs%20Logo%20White%20Text.png"
              alt="Marlabs Logo"
              className="w-44"
            />
            <p className="text-base mt-4 text-white leading-relaxed">
              A set of curious, collaborative problem-solvers, engineering creative digital solutions.
            </p>
            <div className="flex space-x-6 mt-4">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5a9355ad5538968bcab2f_facebook-blue.png"
                  alt="Facebook"
                  className="w-7 h-7 hover:scale-110 transition-transform"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5a49fe85d282594b3beb9_instagram-blue.png"
                  alt="Instagram"
                  className="w-7 h-7 hover:scale-110 transition-transform"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5a9369ea012e80c562148_linkedin-blue.png"
                  alt="LinkedIn"
                  className="w-7 h-7 hover:scale-110 transition-transform"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5a935b382a9beb6c2f5a2_youtube-blue.png"
                  alt="YouTube"
                  className="w-7 h-7 hover:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">COMPANY</h4>
            {["About Us", "Leadership", "Careers", "Events & Webinars", "CSR Policy", "LCA Notices"].map((item, idx) => (
              <p key={idx} className="text-base hover:underline cursor-pointer mb-2">{item}</p>
            ))}
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">SOLUTIONS</h4>
            {["Data & Analytics", "Enterprise Applications", "Digital Engineering", "Intelligent Automation", "Cloud, Infra, & Digital Security"].map((item, idx) => (
              <p key={idx} className="text-base hover:underline cursor-pointer mb-2">{item}</p>
            ))}
          </div>

          {/* Corporate Office */}
          <div>
            <h4 className="font-bold mb-4 text-lg">CORPORATE OFFICE</h4>
            <p className="text-base mb-3 leading-relaxed">
              One Corporate Place South, 3rd Floor - Piscataway NJ 08854 – 6116ty
            </p>
            <p className="text-base underline mb-4">contact@marlabs.com</p>
            <img
              src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5bc923558f4d2da3c52de_CMMI.png"
              alt="CMMI Certified"
              className="w-32 mt-3"
            />
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/30 pt-2 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-white">© 1994–{currentYear} Marlabs Inc.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Terms of Use</span>
            <span className="hover:underline cursor-pointer">Cookie Policy</span>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span>ENGLISH</span>
            <img
              src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5a935b572c78654e2fd25_translation-icon.png"
              alt="Translation"
              className="w-6"
            />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;