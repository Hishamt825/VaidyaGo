import Profile from "./Profile";
import Account from "./Account";
import Notification from "./notification";
import phImg from "../../assets/ph.png";

const Disease = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'account' | null
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navLinks = ["Home", "Find Doctors", "Lab test", "Health Record", "Diet Chart", "Medicines"];

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen w-full overflow-x-hidden">

      {/* ==================== TOP NAVBAR ==================== */}
      <header className="flex items-center justify-between px-6 md:px-10 py-3 bg-white">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/MainPage")}>
          <img src="/assets/name.png" className="h-10 md:h-12 object-contain" alt="VaidyaGo Logo" />
        </div>

        {/* Right Section: Settings, Notifications, Profile */}
        <div className="flex items-center gap-[32px]">
          <button onClick={() => navigate('/Setting')} className="text-[#64748B] hover:text-[#1A7785] transition-colors">
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          <button onClick={() => setIsNotificationOpen(true)} className="text-[#64748B] hover:text-[#1A7785] transition-colors relative">
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div className="absolute top-[2px] right-[2px] w-[6px] h-[6px] bg-[#E85B5A] rounded-full" />
          </button>

          <div
            onClick={() => setActiveModal('profile')}
            className="flex items-center gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl px-4 py-1 cursor-pointer hover:bg-gray-50 transition-all group"
          >
            <span className="text-[18px] font-semibold text-gray-700">Dasy William</span>
            <img
              src={phImg}
              alt="Profile"
              className="w-11 h-11 rounded-full border-black/50 shadow-[0_2px_6px_rgba(0,0,0,0.12)] object-cover group-hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </header>

      {/* ==================== SECONDARY NAV ==================== */}
      <nav className="flex items-center justify-center gap-14 md:gap-20 py-3 bg-white border-b border-gray-200 overflow-x-auto px-4">
        {navLinks.map((link, index) => (
          <button
            key={index}
            className={`text-[14px] md:text-[15px] font-medium whitespace-nowrap transition-colors duration-300 
              ${link === "Home"
                ? "text-[#19718A] border-b-2 border-[#19718A] pb-1"
                : "text-gray-600 hover:text-[#19718A]"
              }`}
          >
            {link}
          </button>
        ))}
      </nav>

      {/* ==================== HERO BANNER WITH 2 IMAGES + OVERLAY + SEARCH ==================== */}
      <section className="relative w-full h-[180px] md:h-[220px] overflow-hidden">
        {/* Two images side by side */}
        <div className="flex w-full h-full">
          {/* Left image - fruit.png */}
          <div className="w-1/2 h-full relative">
            <img
              src={fruitImg}
              alt="Fruits in capsules"
              className="w-full h-full object-cover"
            />
            {/* Transparent overlay on fruit image */}
            <div className="absolute inset-0 bg-[#19718A]/30"></div>
          </div>

          {/* Right image - pat.png */}
          <div className="w-1/2 h-full relative">
            <img
              src={patImg}
              alt="Laboratory Techniques"
              className="w-full h-full object-cover"
            />
            {/* Transparent overlay on pat image */}
            <div className="absolute inset-0 bg-[#19718A]/30"></div>
          </div>
        </div>

        {/* Search Bar overlaid on images */}
        <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
          <div className="flex items-center w-full max-w-[480px] bg-white rounded-full shadow-lg px-5 py-3">
            {/* Search Icon */}
            <svg
              className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none text-gray-700 text-[15px] bg-transparent placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      {/* ==================== ACTION CARDS ==================== */}
      <section className="flex flex-wrap justify-center gap-4 md:gap-6 px-4 -mt-6 relative z-20">

        {/* Card 1 - Doctor Appointment */}
        <div className="flex items-center gap-3 bg-[#19718A] text-white px-5 py-3 rounded-xl shadow-lg cursor-pointer hover:bg-[#15637a] transition-all duration-300 hover:-translate-y-1 min-w-[200px]">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src="/assets/book.png" alt="Doctor" className="w-5 h-5 object-contain" />
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-tight">Doctor Appointment</p>
            <p className="text-[11px] font-medium bg-[#E8A317] text-white px-2 py-0.5 rounded mt-1 inline-block">BOOK NOW</p>
          </div>
          <svg className="w-4 h-4 text-white/70 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Card 2 - Lab Test */}
        <div className="flex items-center gap-3 bg-white text-gray-800 px-5 py-3 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-w-[200px]">
          <div className="w-9 h-9 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
            <img src="/assets/lab.png" alt="Lab" className="w-5 h-5 object-contain" />
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-tight">Lab Test</p>
            <p className="text-[11px] font-medium bg-[#E8A317] text-white px-2 py-0.5 rounded mt-1 inline-block">BOOK NOW</p>
          </div>
          <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Card 3 - Lab Test (highlighted) */}
        <div className="flex items-center gap-3 bg-[#E8A317] text-white px-5 py-3 rounded-xl shadow-lg cursor-pointer hover:bg-[#d4940f] transition-all duration-300 hover:-translate-y-1 min-w-[200px]">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src="/assets/lab.png" alt="Lab" className="w-5 h-5 object-contain" />
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-tight">Lab Test</p>
            <p className="text-[11px] font-medium bg-white text-[#E8A317] px-2 py-0.5 rounded mt-1 inline-block">BOOK NOW</p>
          </div>
          <svg className="w-4 h-4 text-white/70 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </section>

      {/* ==================== FIND DISEASE BY LETTERS ==================== */}
      <section className="mt-10 md:mt-14 px-6 md:px-16 pb-16">
        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-semibold mb-8 md:mb-10">
          Find <span className="text-[#19718A] font-bold italic">Disease</span> By{" "}
          <span className="text-[#19718A] font-bold italic">Letters</span>
        </h2>

        {/* Alphabet Grid */}
        <div className="max-w-[520px]">
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-x-6 gap-y-8">
            {alphabet.map((letter) => (
              <button
                key={letter}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#19718A]/60 text-[#19718A]
                  font-medium text-base md:text-lg flex items-center justify-center
                  hover:bg-[#19718A] hover:text-white hover:border-[#19718A] transition-all duration-300
                  hover:scale-110 hover:shadow-lg active:scale-95"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Profile Modal */}
      {activeModal === 'profile' && (
        <Profile 
          onClose={() => setActiveModal(null)} 
          onAccountSettings={() => setActiveModal('account')} 
        />
      )}
      {activeModal === 'account' && (
        <Account onClose={() => setActiveModal(null)} />
      )}
      {isNotificationOpen && <Notification onClose={() => setIsNotificationOpen(false)} />}
    </div>
  );
};

export default Disease;
