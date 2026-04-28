import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";

const ContactUs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("feedback");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab") === "queries") {
      setActiveTab("queries");
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.search]);
  return (
    <div className="font-sans text-gray-800">


      {/* ================= HEADER SECTION ================= */}


      <section className="relative overflow-hidden ">
        {/* Background Image */}


        {/* Navbar */}
        <header className="relative flex items-center justify-between px-8 py-2.5 bg-[#19718A] border-b border-white/30">

          {/* Empty Left Space (Balance Maintain Karne Ke Liye) */}
          <div className="w-[280px]"></div>

          {/* CENTER NAVIGATION */}
          <nav className="absolute left-[420px] xl:left-[460px] text-[18px] -translate-x-1/2 hidden lg:flex items-center gap-10 xl:gap-[60px]">
            {["Home", "About", "Our Service", "Doctor", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Home") navigate("/MainPage");
                  else if (item === "Our Service") navigate("/Service");
                  else if (item === "Doctor") navigate("/Makeapp");
                  else navigate(`/${item.replace(/\s+/g, "")}`);
                }}
                className={`relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${item === "Contact Us" ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* RIGHT SECTION (Icons + Contact) */}
          <div className="flex items-center justify-end w-full lg:w-auto lg:mr-8 xl:mr-16">

            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <div className="w-px h-6 bg-white/40"></div>

              <button className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300">
                <img src="/assets/search.svg" alt="Search" className="w-5 h-5 invert" />
              </button>

              <div className="w-px h-6 bg-white/40"></div>

              <button className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300">
                <img src="/assets/Bell.png" alt="Bell" className="w-5 h-5 invert" />
              </button>

              <button
                onClick={() => navigate("/ContactUs")}
                className="border-[1.2px] border-white text-white px-5 py-1.5 rounded-full font-bold text-sm transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Contact Us
              </button>

              {/* Authentication Buttons */}
              <div className="flex items-center text-white/90 text-[14px] font-medium ml-6 xl:ml-10 bg-[#0C6173]/60 px-5 py-1.5 rounded-full border border-white/20 shadow-inner">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Log in
                </button>
                <div className="w-[1.5px] h-3.5 bg-white/40 mx-4"></div>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Sign up
                </button>
              </div>
            </div>

            {/* Hamburger for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 ml-1 text-white hover:bg-white/10 rounded-md border border-white/30 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>

        </header>

        {/* MOBILE MENU SIDEBAR (OVERLAP) */}
        {/* Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Sidebar Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[280px] bg-[#19718A] z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col py-6 px-6 shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Close Button Inside Drawer */}
          <div className="flex justify-end mb-8 pb-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-white hover:bg-white/10 rounded-md transition-colors border border-white/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-6 flex-1">
            <button onClick={() => { navigate("/MainPage"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Home</button>
            <button onClick={() => { navigate("/About"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">About</button>
            <button onClick={() => { navigate("/Service"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Our Service</button>
            <button onClick={() => { navigate("/Makeapp"); setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">Doctor</button>
            <button onClick={() => { setIsMobileMenuOpen(false); }} className="text-white font-medium hover:text-gray-300 text-left text-[18px]">FAQ</button>
          </div>

          <div className="flex gap-6 mt-auto pt-6 border-t border-white/20 justify-center">
            <button className="p-3 hover:bg-[#0C6173] rounded-full transition-all duration-300">
              <img src="/assets/search.svg" alt="Search" className="w-5 h-5 invert" />
            </button>
            <button className="p-3 hover:bg-[#0C6173] rounded-full transition-all duration-300">
              <img src="/assets/Bell.png" alt="Bell" className="w-5 h-5 invert" />
            </button>
          </div>

          <button
            onClick={() => { navigate("/ContactUs"); setIsMobileMenuOpen(false); }}
            className="border-[1.2px] border-white text-white px-8 py-3 rounded-full font-bold transform transition-all duration-300 hover:scale-105 mt-6 text-[16px] w-full"
          >
            Contact Us
          </button>
        </div>
      </section>

      <section className="relative w-full ">

        {/* TOP BANNER */}
        <div
          className=" h-[420px] bg-cover bg-center flex flex-col  items-center justify-center text-center px-4"
          style={{
            backgroundImage: "url('/assets/contact.png')",
            backgroundPosition: "center -60px"

          }}
        >
          <img
            src="/assets/banner.png"
            alt="Overlay"
            className="absolute -top-1 w-full h-full object-cover opacity-90"
          />
          <h1 className=" z-10 -translate-y-10 md:-translate-y-16 text-4xl md:text-6xl font-extrabold text-[#08334A]">
            Contact us
          </h1>

          <p className=" z-10 -translate-y-10 md:-translate-y-16 max-w-3xl text-[16px] text-gray-700 mt-3">
            Our service can refer to a company’s specific category of offerings,
            a physical pipe for utilities like water, or a line on a sports court.
          </p>
        </div>

        {/* INFO CARD (OVERLAPPING BANNER) */}
        <div className="relative -mt-32 z-20">

          {/* faint background heading */}
          <h2
            className="absolute top-[70px] left-1/2 -translate-x-1/2 
                 text-6xl font-bold text-[#cfdfe3] opacity-60 select-none pointer-events-none"
          >
            contact us
          </h2>

          <div className="relative max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 min-h-[320px] flex flex-col justify-center">

              {/* HEADER */}
              <div className="flex items-center gap-3 bg-[#0E6F83] px-6 py-4">
                <img src="/assets/name.png" alt="Logo" className="w-20" />
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-6">

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-[##E0E0E0] shadow-sm flex items-center justify-center flex-shrink-0">
                    <svg fill="none" stroke="#689FA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <p className="text-[16px]">
                    <strong className="text-gray-900 font-bold">For Appointment Related Queries :</strong>{" "}
                    <span className="text-[#19718A] font-semibold">+91 XXXXXXXXXX</span>
                  </p>
                </div>

                {/* Working Hours */}
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-[##E0E0E0] shadow-sm flex items-center justify-center flex-shrink-0">
                    <svg fill="none" stroke="#689FA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                  </div>
                  <p className="text-[16px]">
                    <strong className="text-gray-900 font-bold">Working Hours</strong> &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-gray-600 font-medium">Monday to Saturday(</span><span className="text-[#19718A] font-semibold">10:00 AM – 6:00 PM</span><span className="text-gray-600 font-medium">)</span> &nbsp;,&nbsp;
                    <span className="text-gray-600 font-medium">Sunday: </span><span className="text-[#19718A] font-semibold">Closed</span>
                  </p>
                </div>

                {/* Email Section */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-[##E0E0E0] shadow-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <svg fill="none" stroke="#689FA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>

                  <div className="w-full">
                    <strong className="text-gray-900 font-bold block mb-3 pt-1 text-[16px]">Email Address</strong>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-6 text-[14px]">
                      <ul className="list-disc pl-5 space-y-4">
                        <li className="text-gray-600 marker:text-gray-400 font-medium">
                          For feedback/complaints please write to:<br />
                          <span className="text-[#19718A] font-semibold block mt-1">feedbackVaidyaGo@gmail.com</span>
                        </li>
                        <li className="text-gray-600 marker:text-gray-400 font-medium">
                          For general/business related queries contact:<br />
                          <span className="text-[#19718A] font-semibold block mt-1">reachusVaidyaGo@gmail.com</span>
                        </li>
                      </ul>

                      <ul className="list-disc pl-5 space-y-4">
                        <li className="text-gray-600 marker:text-gray-400 font-medium">
                          For investors related queries contact:<br />
                          <span className="text-[#19718A] font-semibold block mt-1">investor.relations@gmail.com</span>
                        </li>
                        <li className="text-gray-600 marker:text-gray-400 font-medium">
                          For international patient queries contact:<br />
                          <span className="text-[#19718A] font-semibold block mt-1">QueriesVaidyaGo@gmail.com</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </section>
      {/* ================= FORM SECTION ================= */}
      <div ref={formRef} className="max-w-5xl mx-auto px-4 mt-16 mb-16">
        <h2 className="text-[20px] md:text-[22px] font-[800] text-black mb-4 uppercase tracking-wide">
          GET IN TOUCH
        </h2>
        <div className="flex mb-6 w-full md:w-[280px]">
          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex-1 py-1.5 text-[16px] border-l border-y border-[#A4D7E1] rounded-l-md font-semibold transition-all ${activeTab === "feedback"
                ? "bg-[#E6F3F5] text-gray-800"
                : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
          >
            Feedback/Complaint
          </button>
          <button
            onClick={() => setActiveTab("queries")}
            className={`flex-1 py-1.5 text-[16px] border border-[#D1D5DB] rounded-r-md font-medium transition-all ${activeTab === "queries"
                ? "bg-[#E6F3F5] text-gray-800 border-[#A4D7E1]"
                : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
          >
            Queries
          </button>
        </div>

        <div className="relative border-2 border-[#EAEFFF] rounded-[24px] shadow-sm px-6 pt-10 pb-8 mt-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="md:col-span-2">
              <label className="text-[14px] text-gray-800 font-semibold mb-1 block ml-1">
                {activeTab === "queries" ? "Types of Query" : "Types of Feedback"}
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-[#19718A] text-[16px]"
              />
            </div>

            <div>
              <label className="text-[14px] text-gray-800 font-semibold mb-1 block ml-1">First Name</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-[#19718A] text-[16px]"
              />
            </div>

            <div>
              <label className="text-[14px] text-gray-800 font-semibold mb-1 block ml-1">Last Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-[#19718A] text-[16px] pr-10"
                />
                <span className="absolute right-4 top-1/2 -mt-1 text-gray-500 pointer-events-none">
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-[14px] text-gray-800 font-semibold mb-1 block ml-1">Mobile Number</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-[#19718A] text-[16px]"
              />
            </div>

            <div>
              <label className="text-[14px] text-gray-800 font-semibold mb-1 block ml-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-[#19718A] text-[16px]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[14px] text-gray-800 font-semibold mb-1 block ml-1">
                {activeTab === "queries" ? "Query" : "Feedback"}
              </label>
              <textarea
                rows="4"
                className="w-full border border-gray-200 rounded-[20px] px-4 py-3 focus:outline-none focus:border-[#19718A] text-[16px]"
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="bg-[#19718A] text-white font-medium px-8 py-2.5 rounded-full hover:bg-[#08334A] transition-all text-[16px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= LOCATION SECTION ================= */}
      <div className="max-w-4xl mx-auto px-4 mb-24">
        <h2 className="text-[20px] md:text-[22px] font-[800] text-black mb-4 uppercase tracking-wide">
          LOCATION
        </h2>
        <div className="relative border border-gray-200 rounded-[24px] overflow-hidden shadow-sm h-[380px]">
          <iframe
            src="https://www.google.com/maps?q=Rheinstraße&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="absolute bottom-6 right-6 flex items-center gap-3">
            <button className="bg-white p-2.5 rounded-md shadow-md hover:bg-gray-50 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#19718A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <a
              href="https://www.google.com/maps?q=Rheinstraße"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#19718A] text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:bg-[#08334A] transition-all text-[16px]"
            >
              View in Google Map
            </a>
          </div>
        </div>
      </div>



      {/* ===== Footer Section ===== */}
      <footer className="bg-[#19718A] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* === Logo + Description === */}
          <div className="flex flex-col items-start -mt-6">
            <img
              src="/assets/logo.png"
              alt="VaidyaGo Logo"
              className="w-56 mb-4 -ml-5"
            />

            <p className="text-[14px] leading-relaxed max-w-xs font-serif">
              Committed to compassionate care, advanced
              technology, and healthier lives serving
              Eastern U.P. with trust, excellence,
              and integrity since 1989.
            </p>
          </div>

          {/* === Quick Links === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif">
              <li className="flex items-center gap-2 mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => navigate("/MainPage")}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Home
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => navigate("/About")}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  About Us
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => navigate("/Service")}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Services
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif">
                <span className="text-white text-sm">▶</span>
                <a href="#" className="hover:text-[#AEE8F5] transition-colors">Gallery</a>
              </li>
            </ul>
          </div>

          {/* === Our Services === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Our Services</h4>
            <ul className="space-y-2 text-[14px] font-[400] font-serif mb-4">
              <li>Ayurvedic Treatment</li>
              <li>Herbal Consultation</li>
              <li>Health Care Programs</li>
            </ul>
          </div>

          {/* === Contact Us === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Contact Us</h4>
            <ul className="space-y-3 text-[14px] font-[400]">

              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/cl.png" alt="icon" className="w-4 h-4"></img>
                <span>+91 9879877801</span>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/pack.png" alt="icon" className="w-4 h-4"></img>
                <span>vaidyaGo24@gmail.com</span>

              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/assets/pack.png" alt="icon" className="w-4 h-4"></img>
                <span>vaidyaGo247@gmail.com</span>

              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <i className="fa fa-map-marker text-sm"></i>
                <img src="/assets/map.png" alt="icon" className="w-5 h-5"></img>
                <span>
                  xyz, xyz, Gorakhpur,<br />
                  Uttar Pradesh, 273015
                </span>
              </li>

              {/* ==== Social Icons ===== */}
              <li className="flex items-center gap-3 pt-2">
                <img src="/assets/you.png" className="w-5 cursor-pointer" />
                <img src="/assets/insta.png" className="w-5 cursor-pointer" />
                <img src="/assets/map1.png" className="w-5 cursor-pointer" />
                <img src="/assets/what.png" className="w-5 cursor-pointer" />
              </li>

            </ul>
          </div>
        </div>

        {/* === Bottom Line === */}

      </footer>
      {/* Render Modals */}
      {showLoginModal && (
        <Finallogin
          isModal={true}
          onClose={() => setShowLoginModal(false)}
          onSwitchToForget={() => {
            setShowLoginModal(false);
            setShowForgetModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <Signup1
          isModal={true}
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showForgetModal && (
        <Forget
          isModal={true}
          onClose={() => setShowForgetModal(false)}
          onSwitchToLogin={() => {
            setShowForgetModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
};

export default ContactUs;
