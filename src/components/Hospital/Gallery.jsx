import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Maximize2, Camera, User, Home, Award } from "lucide-react";
import Finallogin from "../Login-hospital/Finallogin";
import Signup1 from "../Signup-hospital/Signup1";
import Forget from "../Login-hospital/Forget";

const Gallery = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { name: "All", icon: <Maximize2 className="w-4 h-4" /> },
    { name: "Infrastructure", icon: <Home className="w-4 h-4" /> },
    { name: "Medical Team", icon: <User className="w-4 h-4" /> },
    { name: "Patient Care", icon: <Camera className="w-4 h-4" /> },
    { name: "Awards", icon: <Award className="w-4 h-4" /> }
  ];

  const galleryImages = [
    { id: 1, title: "Modern ICU Unit", category: "Infrastructure", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Our Specialists", category: "Medical Team", url: "https://images.unsplash.com/photo-1559839734-2b71f1e598c6?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "Advanced Operation Theater", category: "Infrastructure", url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Compassionate Nursing", category: "Patient Care", url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Hospital Reception", category: "Infrastructure", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800" },
    { id: 6, title: "Best Hospital Award 2023", category: "Awards", url: "https://images.unsplash.com/photo-1531050171651-0fb620c4623c?auto=format&fit=crop&q=80&w=800" },
    { id: 7, title: "Diagnostic Lab", category: "Infrastructure", url: "https://images.unsplash.com/photo-1581594693702-fbdc51b2ad49?auto=format&fit=crop&q=80&w=800" },
    { id: 8, title: "Emergency Response", category: "Patient Care", url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800" },
    { id: 9, title: "Pediatrics Ward", category: "Infrastructure", url: "https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&q=80&w=800" }
  ];

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full bg-[#FBFDFF]">
      {/* Navbar - Original from MainPage */}
      <section className="relative overflow-hidden ">
        <header className="relative flex items-center justify-between px-8 py-2.5 bg-[#19718A] border-b border-white/30">
          <div className="w-[280px]"></div>
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
                className={`relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${item === "Gallery" ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                {item}
              </button>
            ))}
          </nav>

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
              <button onClick={() => navigate("/ContactUs")} className="border-[1.2px] border-white text-white px-5 py-1.5 rounded-full font-bold text-sm transform transition-all duration-300 hover:scale-105 active:scale-95">
                Contact Us
              </button>
              <div className="flex items-center text-white/90 text-[14px] font-medium ml-6 xl:ml-10 bg-[#0C6173]/60 px-5 py-1.5 rounded-full border border-white/20 shadow-inner">
                <button onClick={() => setShowLoginModal(true)} className="hover:text-white">Log in</button>
                <div className="w-[1.5px] h-3.5 bg-white/40 mx-4"></div>
                <button onClick={() => setShowSignupModal(true)} className="hover:text-white">Sign up</button>
              </div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1.5 text-white border border-white/30 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </header>

        {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setIsMobileMenuOpen(false)}></div>}
        <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#19718A] z-[70] transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="mb-8 text-white"><X /></button>
            <div className="flex flex-col space-y-6">
              {["Home", "About", "Our Service", "Doctor", "FAQ"].map(item => (
                <button key={item} onClick={() => { navigate(item === "Home" ? "/MainPage" : `/${item.replace(/\s+/g, "")}`); setIsMobileMenuOpen(false); }} className="text-white text-left text-[18px] font-medium">{item}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-[#19718A] py-16 md:py-24 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Gallery</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            A visual tour of VaidyaGo's state-of-the-art facilities, expert medical team, and life-changing patient care milestones.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm border ${
                selectedCategory === cat.name 
                  ? "bg-[#19718A] text-white border-[#19718A] scale-105" 
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#19718A] hover:text-[#19718A]"
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Image Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <div 
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-md cursor-pointer aspect-[4/3]"
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">{image.category}</p>
                <h4 className="text-white text-xl font-bold">{image.title}</h4>
                <div className="mt-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setSelectedImage(null)}></div>
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white hover:text-blue-400 transition-colors z-[110]"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative z-[110] max-w-5xl w-full max-h-full flex flex-col items-center">
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center">
              <p className="text-blue-400 text-sm font-bold uppercase tracking-[0.3em] mb-2">{selectedImage.category}</p>
              <h3 className="text-white text-2xl md:text-3xl font-bold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section - Original from FAQ */}
      <footer className="bg-[#19718A] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-start md:-mt-6">
            <img src="/assets/logo.png" alt="VaidyaGo Logo" className="w-48 md:w-56 mb-4 ml-[-12px] md:-ml-5" />
            <p className="text-[14px] leading-relaxed max-w-xs font-serif text-blue-50/80">
              Committed to compassionate care, advanced technology, and healthier lives serving Eastern U.P. with trust, excellence, and integrity since 1989.
            </p>
          </div>
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif text-blue-50/80">
              <li className="flex items-center gap-2 mb-4"><span className="text-white text-sm">▶</span><button onClick={() => navigate("/MainPage")} className="hover:text-[#AEE8F5]">Home</button></li>
              <li className="flex items-center gap-2 mb-4"><span className="text-white text-sm">▶</span><button onClick={() => navigate("/About")} className="hover:text-[#AEE8F5]">About Us</button></li>
              <li className="flex items-center gap-2 mb-4"><span className="text-white text-sm">▶</span><button onClick={() => navigate("/Service")} className="hover:text-[#AEE8F5]">Services</button></li>
              <li className="flex items-center gap-2 mb-4"><span className="text-white text-sm">▶</span><button onClick={() => navigate("/Gallery")} className="text-white font-bold underline underline-offset-8">Gallery</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Our Services</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif mb-4 text-blue-50/80">
              <li>Ayurvedic Treatment</li>
              <li>Herbal Consultation</li>
              <li>Health Care Programs</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[18px] font-semibold mb-4 font-serif">Contact Us</h4>
            <ul className="space-y-3 text-[16px] font-[400]">
              <li className="flex items-center gap-2 font-serif mb-4"><img src="/assets/cl.png" alt="icon" className="w-4 h-4"></img><span>+91 9879877801</span></li>
              <li className="flex items-center gap-2 font-serif mb-4"><img src="/assets/pack.png" alt="icon" className="w-4 h-4"></img><span>vaidyaGo24@gmail.com</span></li>
              <li className="flex items-center gap-2 font-serif mb-4"><img src="/assets/map.png" alt="icon" className="w-4 h-4"></img><span>xyz, xyz, Gorakhpur,<br />Uttar Pradesh, 273015</span></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showLoginModal && <Finallogin onClose={() => setShowLoginModal(false)} onSignup={() => { setShowLoginModal(false); setShowSignupModal(true); }} onForget={() => { setShowLoginModal(false); setShowForgetModal(true); }} />}
      {showSignupModal && <Signup1 onClose={() => setShowSignupModal(false)} onLogin={() => { setShowSignupModal(false); setShowLoginModal(true); }} />}
      {showForgetModal && <Forget onClose={() => setShowForgetModal(false)} onLogin={() => { setShowForgetModal(false); setShowLoginModal(true); }} />}
    </div>
  );
};

export default Gallery;
