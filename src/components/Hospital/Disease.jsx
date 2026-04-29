import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";

const HospitalDisease = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [expandedDisease, setExpandedDisease] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  
  const initialLetter = searchParams.get("letter") || "";
  const [searchQuery, setSearchQuery] = useState(initialLetter);

  useEffect(() => {
    const letter = searchParams.get("letter");
    if (letter) {
      setSearchQuery(letter);
      setExpandedDisease(null); // Reset expansion on filter change
    }
  }, [searchParams]);

  useEffect(() => {
    setExpandedDisease(null); // Reset expansion on any search change
  }, [searchQuery]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Mock data for demonstration
  const allDiseases = [
    { name: "Abdominal Pain", category: "Gastrointestinal" },
    { name: "Acne", category: "Dermatology" },
    { name: "Arthritis", category: "Orthopedic" },
    { name: "Asthma", category: "Respiratory" },
    { name: "Back Pain", category: "Orthopedic" },
    { name: "Bronchitis", category: "Respiratory" },
    { name: "Bipolar Disorder", category: "Psychiatry" },
    { name: "Cancer", category: "Oncology" },
    { name: "Cataracts", category: "Ophthalmology" },
    { name: "Chickenpox", category: "Infectious Disease" },
    { name: "Diabetes", category: "Endocrinology" },
    { name: "Depression", category: "Psychiatry" },
    { name: "Dengue", category: "Infectious Disease" },
    { name: "Eczema", category: "Dermatology" },
    { name: "Epilepsy", category: "Neurology" },
    { name: "Ear Infection", category: "Otolaryngology" },
    { name: "Flu", category: "Infectious Disease" },
    { name: "Fracture", category: "Orthopedic" },
    { name: "Fungal Infection", category: "Dermatology" },
    { name: "Gastritis", category: "Gastrointestinal" },
    { name: "Glaucoma", category: "Ophthalmology" },
    { name: "Gout", category: "Rheumatology" },
    { name: "Hypertension", category: "Cardiology" },
    { name: "Hepatitis", category: "Hepatology" },
    { name: "Headache", category: "Neurology" },
    { name: "Influenza", category: "Infectious Disease" },
    { name: "Insomnia", category: "Psychiatry" },
    { name: "Iron Deficiency", category: "Hematology" },
    { name: "Jaundice", category: "Hepatology" },
    { name: "Joint Pain", category: "Orthopedic" },
    { name: "Kidney Stones", category: "Urology" },
    { name: "Knee Injury", category: "Orthopedic" },
    { name: "Leukemia", category: "Oncology" },
    { name: "Liver Cirrhosis", category: "Hepatology" },
    { name: "Lupus", category: "Immunology" },
    { name: "Malaria", category: "Infectious Disease" },
    { name: "Migraine", category: "Neurology" },
    { name: "Measles", category: "Infectious Disease" },
    { name: "Nausea", category: "Gastrointestinal" },
    { name: "Neuralgia", category: "Neurology" },
    { name: "Obesity", category: "Endocrinology" },
    { name: "Osteoporosis", category: "Orthopedic" },
    { name: "Pneumonia", category: "Respiratory" },
    { name: "Psoriasis", category: "Dermatology" },
    { name: "Paralysis", category: "Neurology" },
    { name: "Quinsy", category: "Otolaryngology" },
    { name: "Quadriceps Strain", category: "Sports Medicine" },
    { name: "Rheumatism", category: "Orthopedic" },
    { name: "Ringworm", category: "Dermatology" },
    { name: "Sinusitis", category: "Otolaryngology" },
    { name: "Spondylitis", category: "Orthopedic" },
    { name: "Tuberculosis", category: "Infectious Disease" },
    { name: "Thyroid Disorder", category: "Endocrinology" },
    { name: "Ulcer", category: "Gastrointestinal" },
    { name: "Urticaria", category: "Dermatology" },
    { name: "Varicose Veins", category: "Vascular" },
    { name: "Vertigo", category: "Neurology" },
    { name: "Warts", category: "Dermatology" },
    { name: "Whooping Cough", category: "Respiratory" },
    { name: "Xerostomia", category: "Oral Health" },
    { name: "X-Linked Disorder", category: "Genetics" },
    { name: "Yellow Fever", category: "Infectious Disease" },
    { name: "Yeast Infection", category: "Infectious Disease" },
    { name: "Zika Virus", category: "Infectious Disease" },
    { name: "Zoster (Shingles)", category: "Infectious Disease" },
  ];

  const filteredDiseases = allDiseases.filter((d) => {
    if (!searchQuery) return true;
    // If it's a single letter from the alphabet navigator, filter by start letter
    if (searchQuery.length === 1) {
      return d.name.toLowerCase().startsWith(searchQuery.toLowerCase());
    }
    // If it's a search term, filter by inclusion
    return d.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full bg-[#F8FAFC]">
      {/* Navbar */}
      <section className="relative overflow-hidden ">
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
                className={`relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${item === "Home" ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
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

      {/* Hero Header - With Background Image */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/faq_hero_1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        {/* Teal Overlay */}
        <div className="absolute inset-0 bg-[#19718A]/70"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">
            Medical Directory
          </h1>
          <p className="text-blue-50 text-lg max-w-2xl mx-auto px-6 font-medium drop-shadow-sm">
            Find comprehensive information about diseases and conditions by their first letter or full medical name.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[32px] shadow-xl p-8 md:p-12 -mt-24 relative z-10 border border-gray-100">
          
          {/* Alphabet Buttons */}
          <div className="mb-12 text-center">
            <h2 className="text-[#0B2132] font-bold text-xl mb-6">Browse by Alphabet</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSearchQuery(letter)}
                  className={`w-12 h-12 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center border ${
                    searchQuery.toUpperCase() === letter
                      ? "bg-[#19718A] text-white border-[#19718A] shadow-lg scale-110"
                      : "bg-[#F8FAFC] text-[#19718A] border-gray-200 hover:bg-[#19718A] hover:text-white hover:border-[#19718A] hover:-translate-y-1"
                  }`}
                >
                  {letter}
                </button>
              ))}
              <button
                onClick={() => setSearchQuery("")}
                className={`px-6 h-12 rounded-xl font-bold text-sm transition-all duration-300 border ${
                  searchQuery === ""
                    ? "bg-[#19718A] text-white border-[#19718A] shadow-lg"
                    : "bg-[#F8FAFC] text-[#19718A] border-gray-200 hover:bg-[#19718A] hover:text-white"
                }`}
              >
                Show All
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="flex items-center w-full bg-[#F8FAFC] p-2 rounded-full border-2 border-gray-200 focus-within:border-[#19718A]/40 transition-all duration-300">
              <input
                type="text"
                placeholder="Search for a disease..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full outline-none text-gray-700 bg-transparent text-[16px] px-6 py-2"
              />
              <button className="bg-[#19718A] text-white px-10 py-3 rounded-full font-bold hover:bg-[#0C6173] transition-colors shadow-md">
                Search
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <h2 className="text-2xl font-extrabold text-[#0B2132] mb-8 border-b pb-4">
              {searchQuery ? `Results for "${searchQuery}"` : "All Diseases & Conditions"}
              <span className="ml-4 text-sm font-normal text-gray-400">({filteredDiseases.length} Found)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {filteredDiseases.length > 0 ? (
                filteredDiseases.map((disease) => {
                  const isExpanded = expandedDisease === disease.name;
                  return (
                    <div
                      key={disease.name}
                      className={`p-6 bg-white border rounded-2xl shadow-sm transition-all duration-500 overflow-hidden ${
                        isExpanded 
                          ? "border-[#19718A] shadow-md ring-1 ring-[#19718A]/20" 
                          : "border-gray-300 hover:shadow-md hover:border-[#19718A]/20"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-lg font-bold transition-colors mb-2 ${isExpanded ? "text-[#19718A]" : "text-[#0B2132]"}`}>
                            {disease.name}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-blue-50 text-[#19718A] text-xs font-bold rounded-full">
                            {disease.category}
                          </span>
                        </div>
                        <button 
                          onClick={() => setExpandedDisease(isExpanded ? null : disease.name)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isExpanded ? "bg-[#19718A] text-white rotate-90 shadow-lg" : "bg-[#F8FAFC] text-gray-300 hover:bg-[#19718A] hover:text-white"
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Dropdown Content */}
                      <div 
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          isExpanded ? "max-h-[500px] mt-6 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Detailed information about <strong>{disease.name}</strong> including its symptoms, causes, and recommended treatments. Consult with our specialists for a personalized care plan.
                          </p>
                          <div className="bg-[#F8FAFC] p-4 rounded-xl mb-4">
                            <p className="text-[11px] font-bold text-[#19718A] uppercase tracking-wider mb-2">Key Highlights</p>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="w-1 h-1 rounded-full bg-[#19718A]"></div>
                                Specialized {disease.category} Department
                              </li>
                              <li className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="w-1 h-1 rounded-full bg-[#19718A]"></div>
                                Expert Consultation Available
                              </li>
                            </ul>
                          </div>
                          <button 
                            onClick={() => setSelectedDisease(disease)}
                            className="w-full bg-[#19718A] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#0C6173] transition-colors shadow-sm"
                          >
                            View Full Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No results found for your search.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-[#19718A] font-bold hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

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
            <ul className="space-y-2 text-[16px] font-[400] font-serif mb-4">
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

      {/* Disease Detail Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-[#0B2132]/60 backdrop-blur-sm" onClick={() => setSelectedDisease(null)}></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#19718A] to-[#0C6173] p-8 text-white relative">
              <button 
                onClick={() => setSelectedDisease(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="flex items-center gap-4 mb-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">{selectedDisease.category}</span>
                <div className="h-1 w-1 rounded-full bg-white/40"></div>
                <span className="text-blue-100 text-sm">Medical Reference ID: #VD-{(selectedDisease.name.length * 123).toString().slice(0, 4)}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold">{selectedDisease.name}</h2>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Info */}
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-xl font-bold text-[#0B2132] mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#19718A] flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      Overview
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedDisease.name} is a medical condition classified under {selectedDisease.category}. It requires professional diagnosis and may involve various stages of management. Our hospital provides state-of-the-art facilities for early detection and comprehensive care of this condition.
                    </p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                      <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        Common Symptoms
                      </h4>
                      <ul className="space-y-2">
                        {["Persistent discomfort", "Fatigue or lethargy", "Inflammation", "Restricted movement"].map((s, i) => (
                          <li key={i} className="text-sm text-red-700 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                      <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                        Recommended Tests
                      </h4>
                      <ul className="space-y-2">
                        {["Advanced Imaging", "Diagnostic Blood Panels", "Physical Assessment", "Genetic Screening"].map((s, i) => (
                          <li key={i} className="text-sm text-green-700 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                {/* Right Column: Actions */}
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                    <h4 className="font-bold text-[#0B2132] mb-4">Department Info</h4>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#19718A]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Expertise Unit</p>
                        <p className="text-[#0B2132] font-bold">{selectedDisease.category} Clinic</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { 
                        setSelectedDisease(null); 
                        navigate("/Makeapp");
                        window.scrollTo(0, 0);
                      }}
                      className="w-full bg-[#19718A] text-white py-3 rounded-xl font-bold hover:bg-[#0C6173] transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Book Appointment
                    </button>
                  </div>

                  <div className="p-6 bg-[#E9F3F6] rounded-2xl border border-[#19718A]/10">
                    <p className="text-[#19718A] font-bold text-sm mb-2">Need Help?</p>
                    <p className="text-gray-600 text-xs mb-4">Talk to our medical advisors for any queries related to this condition.</p>
                    <button className="text-[#19718A] font-black text-sm flex items-center gap-2 hover:translate-x-1 transition-transform">
                      Contact Advisor <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-gray-400 italic">Disclaimer: This information is for general awareness only. Please consult a qualified medical professional for diagnosis and treatment.</p>
              <button 
                onClick={() => setSelectedDisease(null)}
                className="px-8 py-2 text-gray-500 font-bold hover:text-[#0B2132] transition-colors"
              >
                Close Reference
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modals */}
      {showLoginModal && <Finallogin onClose={() => setShowLoginModal(false)} onSignup={() => { setShowLoginModal(false); setShowSignupModal(true); }} onForget={() => { setShowLoginModal(false); setShowForgetModal(true); }} />}
      {showSignupModal && <Signup1 onClose={() => setShowSignupModal(false)} onLogin={() => { setShowSignupModal(false); setShowLoginModal(true); }} />}
      {showForgetModal && <Forget onClose={() => setShowForgetModal(false)} onLogin={() => { setShowForgetModal(false); setShowLoginModal(true); }} />}
    </div>
  );
};

export default HospitalDisease;
