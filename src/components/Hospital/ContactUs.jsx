import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import HospitalNavbar from "./HospitalNavbar";

const ContactUs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("feedback");
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


      <HospitalNavbar />

      <section className="relative w-full ">

        {/* TOP BANNER */}
        <div
          className="h-[280px] sm:h-[350px] md:h-[420px] bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
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
          <h1 className="z-10 -translate-y-4 sm:-translate-y-10 md:-translate-y-16 text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#08334A]">
            Contact us
          </h1>

          <p className="z-10 -translate-y-4 sm:-translate-y-10 md:-translate-y-16 max-w-3xl text-[13px] sm:text-[15px] md:text-[16px] text-gray-700 mt-3">
            Our service can refer to a company’s specific category of offerings,
            a physical pipe for utilities like water, or a line on a sports court.
          </p>
        </div>

        {/* INFO CARD (OVERLAPPING BANNER) */}
        <div className="relative -mt-16 sm:-mt-24 md:-mt-32 z-20">

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
      <div className="max-w-7xl mx-auto px-4 mb-24">
        <h2 className="text-[20px] md:text-[22px] font-[800] text-black mb-4 uppercase tracking-wide">
          LOCATION
        </h2>
        <div className="relative border border-gray-200 rounded-[24px] overflow-hidden shadow-sm h-[260px] sm:h-[320px] md:h-[380px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57002.327668612!2d83.33230635!3d26.757041749999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991446a0c332127%3A0x81de3d9633298193!2sGorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1714399000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 sm:gap-3">
            <button className="bg-white p-2 rounded-md shadow-md hover:bg-gray-50 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#19718A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <a
              href="https://www.google.com/maps/place/Gorakhpur,+Uttar+Pradesh/@26.7570417,83.3323063,13z"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#19718A] text-white font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg shadow-md hover:bg-[#08334A] transition-all text-[14px] sm:text-[16px]"
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
                  onClick={() => { navigate("/MainPage"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Home
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/About"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  About Us
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/Service"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Services
                </button>
              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/FAQ"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  FAQ
                </button>
              </li>

              <li className="flex items-center gap-2 font-serif">
                <span className="text-white text-sm">▶</span>
                <button
                  onClick={() => { navigate("/ContactUs"); window.scrollTo(0, 0); }}
                  className="hover:text-[#AEE8F5] transition-colors"
                >
                  Contact Us
                </button>
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

    </div>
  );
};

export default ContactUs;
