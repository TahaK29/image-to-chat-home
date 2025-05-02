import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#003366] text-white text-sm w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

        {/* Top 2 Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="bg-white text-black rounded-xl p-6 flex-1 shadow-md">
            <h3 className="font-bold text-lg mb-2">Let’s Talk - Contact us now</h3>
            <p className="mb-4">We’re ready when you are; talk to an expert in your industry today.</p>
            <a href="#" className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition">
              <img src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67eeee0b196d1c3045c8cc5b_north_east_arrow-wide.svg" alt="arrow" className="w-4 h-4 mr-2" />
              Talk to an expert
            </a>
          </div>

          <div className="bg-white text-black rounded-xl p-6 flex-1 shadow-md">
            <h3 className="font-bold text-lg mb-2">Work with us</h3>
            <p className="mb-4">View current job openings and take the first step toward a new career.</p>
            <a href="#" className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition">
              <img src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67eeee0b196d1c3045c8cc5b_north_east_arrow-wide.svg" alt="arrow" className="w-4 h-4 mr-2" />
              View openings
            </a>
          </div>
        </div>

        {/* Middle Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo and Description */}
          <div>
            <img
              src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67eecaabdbea1afe67974ee9_Marlabs%20Logo%20White%20Text.png"
              alt="Marlabs Logo"
              className="w-40"
            />
            <p className="text-sm mt-4 text-white">
              A set of curious, collaborative problem-solvers, engineering creative digital solutions.
            </p>
            <div className="flex space-x-3 mt-4">
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img
      src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5a9355ad5538968bcab2f_facebook-blue.png"
      alt="Facebook"
      className="w-6 h-6 hover:scale-110 transition-transform"
    />
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img
      src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5a49fe85d282594b3beb9_instagram-blue.png"
      alt="Instagram"
      className="w-6 h-6 hover:scale-110 transition-transform"
    />
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img
      src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5a9369ea012e80c562148_linkedin-blue.png"
      alt="LinkedIn"
      className="w-6 h-6 hover:scale-110 transition-transform"
    />
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img
      src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5a935b382a9beb6c2f5a2_youtube-blue.png"
      alt="YouTube"
      className="w-6 h-6 hover:scale-110 transition-transform"
    />
  </a>
</div>

          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-3">COMPANY</h4>
            {["About Us", "Leadership", "Careers", "Events & Webinars", "CSR Policy", "LCA Notices"].map((item, idx) => (
              <p key={idx} className="text-white text-sm hover:underline cursor-pointer mb-2">{item}</p>
            ))}
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="font-bold mb-3">SOLUTIONS</h4>
            {["Data & Analytics", "Enterprise Applications", "Digital Engineering", "Intelligent Automation", "Cloud, Infra, & Digital Security"].map((item, idx) => (
              <p key={idx} className="text-white text-sm hover:underline cursor-pointer mb-2">{item}</p>
            ))}
          </div>

          {/* Corporate Office */}
          <div>
            <h4 className="font-bold mb-3">CORPORATE OFFICE</h4>
            <p className="text-white text-sm mb-2">
              One Corporate Place South, 3rd Floor - Piscataway NJ 08854 – 6116ty
            </p>
            <p className="text-white text-sm underline mb-4">contact@marlabs.com</p>
            <img
              src="https://cdn.prod.website-files.com/67ed2fa2e6078a8a08b4e1fd/67f5bc923558f4d2da3c52de_CMMI.png"
              alt="CMMI Certified"
              className="w-24 mt-4"
            />
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/30 pt-6 flex flex-col md:flex-row items-center justify-between text-xs">
          <p className="text-white">© 1994–{currentYear} Marlabs Inc.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Terms of Use</span>
            <span className="hover:underline cursor-pointer">Cookie Policy</span>
          </div>
          <div className="flex items-center gap-2 mt-3 md:mt-0">
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