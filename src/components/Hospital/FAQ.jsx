import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Search, MessageCircle, Phone } from "lucide-react";
import HospitalNavbar from "./HospitalNavbar";

const FAQ = () => {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/assets/faq_hero_1.png",
    "/assets/faq_hero_3.png",
    "/assets/faq_hero_4.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const faqs = [
    {
      question: "How do I book an appointment with a specialist?",
      answer: "You can book an appointment through our website by clicking on the 'Doctor' or 'Make Appointment' buttons. Alternatively, you can use our mobile app or call our 24/7 helpline at +91 9879877801.",
      category: "General"
    },
    {
      question: "What medical specialties are available at VaidyaGo?",
      answer: "We offer a wide range of specialties including Cardiology, Dentistry, Gastroscience, Neuroscience, Orthopedics, Liver Care, Renal Care, Gynaecology, and Paediatrics.",
      category: "Services"
    },
    {
      question: "Do you offer emergency services 24/7?",
      answer: "Yes, our emergency department and trauma center are open 24 hours a day, 7 days a week, with a dedicated team of emergency physicians and nurses ready to provide immediate care.",
      category: "General"
    },
    {
      question: "How can I access my medical records and test results?",
      answer: "Once you are registered with us, you can access your patient portal using your login credentials. All your medical history, prescriptions, and lab reports are securely stored and available for download in the 'Records' section.",
      category: "Patient Portal"
    },
    {
      question: "Which insurance providers do you partner with?",
      answer: "We are empanelled with most major health insurance providers and TPAs. Please check our 'Insurance' page or contact our billing desk for the complete list of accepted providers.",
      category: "Billing"
    },
    {
      question: "Is there a tele-consultation service available?",
      answer: "Yes, we offer video consultations for many of our specialties. You can select the 'Tele-consult' option while booking your appointment through the portal.",
      category: "Services"
    },
    {
      question: "What are the visiting hours for inpatients?",
      answer: "General visiting hours are from 10:00 AM to 12:00 PM and 5:00 PM to 7:00 PM. However, these may vary depending on the department (e.g., ICU). Only one visitor is allowed at a time with a valid visitor pass.",
      category: "General"
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full bg-[#F8FAFC]">
      <HospitalNavbar />

      {/* Hero Header - With Carousel Background */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Carousel Images */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentImageIndex === idx ? "opacity-100" : "opacity-0"}`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        ))}

        {/* Teal Overlay */}
        <div className="absolute inset-0 bg-[#19718A]/70"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight drop-shadow-md">
            Frequently Asked Questions
          </h1>
          <p className="text-blue-50 text-sm md:text-lg max-w-2xl mx-auto mb-8 font-medium drop-shadow-sm">
            Find quick answers to your questions about our hospital services and patient portal.
          </p>

          {/* Compact Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-4 bg-white rounded-xl text-gray-900 shadow-xl outline-none text-sm md:text-base font-medium"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section - Compact */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl border transition-all duration-300 ${expandedIndex === index ? "border-[#19718A] shadow-md" : "border-gray-300 shadow-sm"}`}
              >
                <button 
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className={`text-base font-bold ${expandedIndex === index ? "text-[#19718A]" : "text-[#0B2132]"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${expandedIndex === index ? "bg-[#19718A] text-white rotate-180" : "bg-gray-50 text-gray-400"}`}>
                    {expandedIndex === index ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedIndex === index ? "max-h-[300px]" : "max-h-0"}`}>
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">No FAQs found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#19718A] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* === Logo + Description === */}
          <div className="flex flex-col items-start md:-mt-6">
            <img
              src="/assets/logo.png"
              alt="VaidyaGo Logo"
              className="w-48 md:w-56 mb-4 ml-[-12px] md:-ml-5"
            />

            <p className="text-[14px] leading-relaxed max-w-xs font-serif text-blue-50/80">
              Committed to compassionate care, advanced
              technology, and healthier lives serving
              Eastern U.P. with trust, excellence,
              and integrity since 1989.
            </p>
          </div>

          {/* === Quick Links === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif text-blue-50/80">
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
            <ul className="space-y-2 text-[16px] font-[400] font-serif mb-4 text-blue-50/80">
              <li>Ayurvedic Treatment</li>
              <li>Herbal Consultation</li>
              <li>Health Care Programs</li>
            </ul>
          </div>

          {/* === Contact Us === */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Contact Us</h4>
            <ul className="space-y-3 text-[16px] font-[400]">

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
                <img src="/assets/map.png" alt="icon" className="w-4 h-4"></img>
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
      </footer>


    </div>
  );
};

export default FAQ;
