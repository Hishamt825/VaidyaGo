import React from "react";
import { motion } from "framer-motion";

const Hero1 = () => {
  return (
    <div className="font-sans text-gray-800">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pb-0.4">

        {/* Background Image */}
        <img
          src="/bbg.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        {/* ---------------- NAVBAR ---------------- */}
        <section className="relative overflow-hidden ">
          {/* Background Image */}


          {/* Navbar */}
          <header className="relative flex items-center justify-between px-8 py-1 bg-[#19718A] border-b border-white/30">

            {/* Empty Left Space (Balance Maintain Karne Ke Liye) */}
            <div className="w-[280px]"></div>

            {/* CENTER NAVIGATION */}
            <nav className="absolute left-[500px] text-[20px] -translate-x-1/2 hidden md:flex items-center gap-[130px]">
              {["About", "Our Service", "Doctor", "FAQ"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-gray-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* RIGHT SECTION (Icons + Contact) */}
            <div className="flex items-center gap-8">

              <div className="w-px h-6 bg-white/40"></div>

              <button className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300">
                <img src="/search.svg" alt="Search" className="w-5 h-5 invert" />
              </button>

              <div className="w-px h-6 bg-white/40"></div>

              <button className="p-2 hover:bg-[#0C6173] rounded-full transition-all duration-300">
                <img src="/Bell.png" alt="Bell" className="w-5 h-5 invert" />
              </button>

              <button
                className=" border border-[#19718A]
               text-white
               px-7 py-1.5
              rounded-full
               transition-colors duration-300
                hover:bg-white
              hover:text-[#19718A]"

              >
                Contact Us
              </button>


            </div>

          </header>




        </section>

        {/* ---------------- HERO SECTION ---------------- */}
        <div className="relative flex flex-col md:flex-row items-center justify-center px-6 md:px-12 pt-6 md:pt-10">

          {/* Background Decorative Bubble Circles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute left-[-100px] top-1/3 w-72 h-72 bg-white/15 rounded-full blur-2xl border border-white/20"></div>
            <div className="absolute right-[-120px] top-10 w-96 h-96 bg-white/10 rounded-full blur-2xl border border-white/10"></div>
            <div className="absolute right-[-80px] bottom-0 w-80 h-80 bg-white/15 rounded-full blur-2xl border border-white/20"></div>
          </div>

          {/* Big Logo */}
          <h1 className="absolute text-[7rem] md:text-[11rem] font-[Playfair Display] font-extrabold text-[#08334A] opacity-90 z-0 select-none top-[14%] md:top-[12%] left-1/2 -translate-x-1/2">
            <img src="/VADYAGO.png" alt="VADYAGO" className="w-[990px] h-auto" />
          </h1>

          {/* Doctor Image */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            src="/bbg1.svg"
            alt="Doctor"
            className="relative z-10 w-[310px] md:w-[320px] drop-shadow-2xl -mr-[95px] -mt-10"
          />

          {/* Left Text */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute left-10 md:left-24 top-[50%] -translate-y-1/2 max-w-lg z-20"
          >
            <h2 className="text-[30px] -mt-16 font-extrabold text-[#08334A] leading-snug">
              Premium Treatments <br /> for a Healthy Lifestyle
            </h2>
            <p className="text-[1rem] text-[#0E4056] font-semibold mt-2">
              Leading Integrated Healthcare <br /> Services Provider in India.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ================= WHITE AREA BELOW HERO ================= */}
      <div className="h-9 bg-white"></div>

      {/* ===================================================== */}
      {/*               WHITE BOX + FLOATING CARDS              */}
      {/* ===================================================== */}

      <div className="w-full absolute flex justify-center mb-[100px] px-4">

        {/* Big White Box */}
        <div className=" absolute  top-[-200px]  bg-white flex flex-col md:flex-row  rounded-3xl shadow-xl border border-red-200 h-[270px] z-10 relative w-[920px]"></div>

        {/* Floating Cards */}
        <div className="absolute top-[-182px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full z-10">

          {/* --- Appointment --- */}
          <div className="w-[260px] h-[230px] bg-[#FEF4AB] shadow-lg rounded-2xl p-6 text-center border border-[#F3EFA4]">
            <img src="/app.png" className="w-12 mx-auto mb-1" />
            <h3 className="text-xl font-bold text-black">Appointment</h3>
            <p className="text-sm text-black mt-1">
              Book online appointment and get <br /> consultation to doctors
            </p>
            <button className="mt-4 w-full bg-white border border-[#FEF4AB] py-2 rounded-full font-semibold text-black">
              Make Appointment
            </button>
          </div>

          {/* --- Emergency --- */}
          <div className="w-[260px] h-[230px] bg-[#399CAA] shadow-lg rounded-2xl p-6 text-center border border-[#A5DDE0]">
            <img src="/light.png" className="w-12 mx-auto mb-1" />
            <h3 className="text-xl font-bold text-black">Emergency</h3>
            <p className="text-sm text-black mt-1">
              Call for Emergency <br /> +91 XXXXXXXXXX
            </p>
            <button className="mt-4 w-full bg-[#A9D3D9] border border-[#A9D3D9] py-2 rounded-full font-semibold text-black">
              Call Now
            </button>
          </div>

          {/* --- Doctors --- */}
          <div className="w-[260px] h-[230px] bg-[#FEC0AB] shadow-lg rounded-2xl p-6 text-center border border-[#F5C8B5]">
            <img src="/pe.png" className="w-12 mx-auto mb-1" />
            <h3 className="text-xl font-bold text-black">Emergency</h3>
            <p className="text-sm text-black mt-1">
              Best doctor of every department
            </p>
            <button className="mt-10 w-full bg-[#FFDACE] border border-[#EBC2B0] py-2 rounded-full font-semibold text-black ">
              Doctors
            </button>
          </div>
        </div>
      </div>


      {/* Department Category Section */}
      <section className="w-auto mx-auto mt-32 text-center">
        {/* Top Bar with Buttons */}
        <div className="flex justify-center items-center mb-8">


          <h2 className="text-[30px] font-bold tracking-[0.4em] text-gray-400 uppercase">
            DEPARTMENT
          </h2>


        </div>

        {/* Icon Boxes */}
        <div className="flex flex-wrap justify-center items-center gap-[100px]">
          {/* Box 1 */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border-2 rounded-md shadow-md hover:shadow-lg transition-all border border-gray-200">
            <img src="/img.png" alt="lungs" className="w-30 h-30 p-2 object-contain" />
          </div>

          {/* Box 2 */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border-2 rounded-md shadow-md hover:shadow-lg transition-all border border-gray-200">
            <img src="/pic.png" alt="bone" className="w-30 h-30 object-contain p-2" />
          </div>

          {/* Box 3 */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border-2 rounded-md shadow-md hover:shadow-lg transition-all border border-gray-200">
            <img src="/pic1.png" alt="tooth" className="w-30 h-30 object-contain p-2" />
          </div>

          {/* Box 4 */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border-2 rounded-md shadow-md hover:shadow-lg transition-all border border-gray-200">
            <img src="/heart.png" alt="eye" className="w-30 h-30 object-contain p-2" />
          </div>

          {/* Box 5 */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border-2 rounded-md shadow-md hover:shadow-lg transition-all border border-gray-200">
            <img src="/renal.png" alt="stomach" className="w-30 h-30 object-contain p-2" />
          </div>

          {/* Box 6 */}
          <div className="w-28 h-28 flex justify-center items-center bg-white border-2 rounded-md shadow-md hover:shadow-lg transition-all border border-gray-200">
            <img src="/pic3.png" alt="knee" className="w-30 h-30 object-contain p-2" />
          </div>
        </div>
      </section>


      <section className="w-full bg-[#75AAB9] relative  mt-40 ">
        <div className="w-full h-full flex flex-col lg:flex-row justify-between items-center px-[0%]">

          {/* LEFT SIDE TEXT */}
          <div className="lg:w-1/2  md:mb-[370px] text-black space-y-6 ">
            <h1 className="text-[20px] font-bold leading-snug ml-10">
              World-Class Healthcare<br />
              Services for you and your<br />
              loved ones
            </h1>

            <button className="bg-white text-black px-10  rounded-full shadow-md hover:bg-gray-200 flex items-center gap-2 ml-10">
              More Service
              <img src="/fr.png" alt="fr" className="h-10 w-10" />
            </button>

          </div>

          {/* RIGHT IMAGE + FLOATING CARDS */}
          <div className="relative ml-[500px] lg:w-1/2 flex justify-center">

            {/* IMAGE WRAPPER (Independent) */}
            <div className="relative  ml-28">
              <img
                src="/doc.png"
                alt="doctor"
                className="w-[400px] h-[600px]"
              />
            </div>

            {/* CARDS WRAPPER (Independent from image) */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none">


              {/* Top Right Card */}
              <div className="absolute   -top-[90px] -left-[190px] bg-white p-6 shadow-xl w-[300px] h-[230px] rounded-md shadow-lg hover:shadow-lg transition-all border-2 border-black-900">
                <div className="w-10 h-10 bg-[#75AAB9] flex items-center justify-center rounded-md ">
                  <img
                    src="/red.png"
                    alt="icon"
                    className="w-7 h-7 object-contain "
                  />
                </div>
                <h3 className="font-bold text-lg text-[#0e4056]">Radiology & imaging</h3>
                <p className="text-gray-700 text-sm mt-2">
                  Radiology is a branch of medicine that uses medical
                  imaging techniques, like X-rays, MRI, and
                  ultrasound, to diagnose and treat diseases.
                </p>
              </div>

              {/* Middle Right Card */}
              <div className="absolute top-[290px] right-[390px] bg-white p-6 rounded-md shadow-lg hover:shadow-lg transition-all border-2 border-black-900 w-[300px] h-[230px]">
                <div className="w-10 h-10 bg-[#75AAB9] flex items-center justify-center rounded-md ">
                  <img
                    src="/lab.png"
                    alt="icon"
                    className="w-7 h-7 object-contain "
                  />
                </div>
                <h3 className="font-bold text-lg text-[#0e4056]">Laboratory Services</h3>
                <p className="text-gray-700 text-sm mt-2">
                  A "Laboratory Services 2 line" is not a standard,
                  universally recognized term in the healthcare or
                  scientific fields. It most likely refers to the services
                  offered at a secondary-level clinical laboratory,
                  such as a district hospital
                </p>
              </div>

              {/* Left Upper Card */}

              <div className="absolute top-[100px] -left-[650px] bg-white p-6 rounded-lg shadow-lg hover:shadow-lg transition-all border-2 border-black-900 w-[300px] h-[230px]">
                <div className="w-10 h-10 bg-[#75AAB9] flex items-center justify-center rounded-md ">
                  <img
                    src="/lok.png"
                    alt="icon"
                    className="w-7 h-7 object-contain "
                  />
                </div>

                <h3 className="font-bold text-lg text-[#0e4056]">Emergency services</h3>
                <p className="text-gray-700 text-sm mt-2">
                  24/7 hospital emergency departments often highlight
                  the constant care, heroism of staff, and the emotional
                  nature of critical situations. These sayings can be
                  inspiring, compassionate, or even humorous.
                </p>
              </div>

              {/* Left Bottom Card */}
              <div className="absolute -bottom-[90px] -left-[700px] bg-white p-6 rounded-md shadow-lg hover:shadow-lg transition-all border-2 border-black-900 w-[300px] h-[230px]">
                <div className="w-10 h-10 bg-[#75AAB9] flex items-center justify-center rounded-md ">
                  <img
                    src="/phar.png"
                    alt="icon"
                    className="w-7 h-7 object-contain "
                  />
                </div>
                <h3 className="font-bold text-lg text-[#0e4056]">Pharmacy</h3>
                <p className="text-gray-700 text-sm mt-2">
                  Staffed by pharmacists and technicians, it oversees
                  drug procurement, inventory, and preparation,
                  including specialized and sterile products for
                  patient-specific needs.
                </p>
              </div>

              {/* WAVE */}

            </div>
          </div>


        </div>
      </section>
      <div className="flex items-center w-full mt-[40px]">
        <div className="flex-1 h-[2px] bg-[#1c9bb2]"></div>

        <div className="-mx-1">
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
            <path d="M1 10H10L14 3L20 17L26 3L30 10H39"
              stroke="#1c9bb2" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex-1 h-[2px] bg-[#1c9bb2]"></div>
      </div>



      {/* ABOUT US SECTION */}
      <section className="p-20">




        {/* HEADING */}
        <h2 className="text-3xl font-bold mb-6" style={{ color: "black", fontFamily: "Georgia, 'Times New Roman', serif" }}>
          About Us
        </h2>

        <p className="text-black text-[20px] leading-[2.3] text-justify font-[Georgia] tracking-[0.3px]">
          <span className="font-bold">VAIDYAGO HEALTHCARE</span> is a leading integrated healthcare
          delivery service provider in India. The healthcare verticals of the
          company primarily comprise hospitals, diagnostics, and day care
          specialty facilities. Currently, the company operates 33 healthcare
          facilities (including JVs and O&M facilities) across 11 states. The
          Company’s network comprises over 5,700 operational beds (including
          O&M beds) and 400 diagnostics labs.
        </p>

        {/* VISION & MISSION CARDS WRAPPER */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 mt-[80px] ">

          {/* VISION CARD */}
          <div className="relative bg-white border border-gray-300 rounded-xl p-8 w-[100px] h-[300px] lg:w-[45%] shadow-sm hover:shadow-md transition">

            {/* TOP CIRCLE ICON */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md border-2 border-[#19718A]">
              <img
                src="/eye.png"
                alt="Vision Icon"
                className="w-[100px] object-contain"
              />
            </div>
            <div
            >
              <h3 className="text-xl font-bold text-[#0e4056] text-center mt-20">Vision</h3>

              <p className="text-black text-center mt-4 leading-[1.9]">
                To create a world-class integrated healthcare delivery
                system in India, entailing the finest medical skills
                combined with compassionate patient care
              </p>
            </div>
          </div>


          {/* MISSION CARD */}
          <div className="relative bg-white border border-gray-300 rounded-xl p-8 w-[300px] h-[300px] lg:w-[45%] shadow-sm hover:shadow-md transition">

            {/* TOP CIRCLE ICON */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md border-2 border-[#19718A]">
              <img
                src="/goal.png"
                alt="Mission Icon"
                className="w-[100px] object-contain"
              />
            </div>

            <h3 className="text-xl font-bold text-[#0e4056] text-center mt-20">Mission</h3>

            <p className="text-black text-center mt-4 leading-[1.7]">
              To be a globally respected healthcare organisation known for Clinical
              Excellence and Distinctive Patient Care.
            </p>
          </div>

        </div>


      </section>


      {/* KEY FEATURES SECTION */}
      {/* KEY FEATURES SECTION */}
      <section className="w-full px-[2%] mt-[20px]">

        <h2
          className="text-3xl font-bold mb-[80px]"
          style={{ color: "black", fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Key Features
        </h2>

        {/* GRID WRAPPER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">

          {/* AI Chat */}
          <div
            className="group relative w-[430px] bg-white/70 backdrop-blur-md p-8 pt-12 rounded-2xl 
  shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-white/40
  transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.02]
  hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] cursor-pointer"
          >
            {/* Floating Circle (like image) */}
            <div className="absolute -top-16 right-[-35px]">
              {/* Outer Soft Circle */}
              <div className="w-[140px] h-[140px] bg-slate-200 rounded-full flex items-center justify-center shadow-inner">

                {/* Inner White Circle */}
                <div className="w-[110px] h-[110px] bg-white rounded-full flex items-center justify-center shadow-md relative">
                  <img
                    src="/ai1.png"
                    alt="AI Chat"
                    className="w-[70px] object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Soft Glow */}
                  <div className="absolute inset-0 rounded-full bg-[#19718A]/10 opacity-0 group-hover:opacity-100 blur-md transition duration-500"></div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-[30px] font-bold text-[#2C7A7B] mb-4">
              AI chat
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-[15px] max-w-[330px]">
              An "AI chat bot" can refer to a chatbot for the LINE messaging app,
              which uses AI to interact with users, or it can be a technical term
              for a line of code in a chatbot program.
            </p>
          </div>

          {/* Prescription Upload */}
          <div
            className="group relative bg-white p-8 rounded-xl shadow-md border-b-2 border-t-2 border-r-2 border-l-2 border-transparent 
  hover:border-[#088395] transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.03] 
  hover:shadow-[0_0_10px_#19718A,0_0_20px_rgba(25,113,138,0.4)] cursor-pointer"
            onClick={(e) => {
              const el = e.currentTarget;
              el.classList.remove("clicked");
              void el.offsetWidth;
              el.classList.add("clicked");
            }}
          >
            {/* ICON & GLOW */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2">
              <div className="relative w-[120px] h-[120px] bg-white border-2 border-[#19718A] rounded-full shadow-md flex items-center justify-center">
                <img
                  src="/pre1.png"
                  alt="Prescription Upload"
                  className="w-[75px] transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Glow Behind Icon */}
                <div className="absolute inset-0 rounded-full bg-[#C8D9E2]/40 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-bold text-[#0e4056] text-center mt-16 transition-colors duration-300 group-hover:text-[#19718A]">
              Prescription Upload
            </h3>

            {/* DESCRIPTION */}
            <p className="text-black text-center mt-4 leading-[1.7] group-hover:text-gray-800 transition-colors duration-300">
              Upload prescriptions digitally to access pharmacy and diagnostic services.
            </p>
          </div>


          {/* Medicine Reminder */}
          <div
            className="group relative bg-white p-8 rounded-xl shadow-md border-b-2 border-t-2 border-r-2 border-l-2 border-transparent 
  hover:border-[#088395] transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.03] 
  hover:shadow-[0_0_10px_#19718A,0_0_20px_rgba(25,113,138,0.4)] cursor-pointer"
            onClick={(e) => {
              const el = e.currentTarget;
              el.classList.remove('clicked');
              void el.offsetWidth;
              el.classList.add('clicked');
            }}
          >
            {/* ICON WITH GLOW */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2">
              <div className="relative w-[120px] h-[120px] bg-white border-2 border-[#19718A] rounded-full shadow-md flex items-center justify-center">
                <img
                  src="/med1.png"
                  alt="Medicine Reminder"
                  className="w-[75px] transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Glow Behind Icon */}
                <div className="absolute inset-0 rounded-full bg-[#C8D9E2]/40 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-bold text-[#0e4056] text-center mt-16 transition-colors duration-300 group-hover:text-[#19718A]">
              Medicine Reminder
            </h3>

            {/* DESCRIPTION */}
            <p className="text-black text-center mt-4 leading-[1.7] group-hover:text-gray-800 transition-colors duration-300">
              Smart reminders help patients take their medicines on time.
            </p>
          </div>


          {/* Book Appointment */}
          <div
            className="group relative bg-white p-8 rounded-xl shadow-md border-b-2 border-t-2 border-r-2 border-l-2 border-transparent 
  hover:border-[#088395] transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.03] 
  hover:shadow-[0_0_10px_#19718A,0_0_20px_rgba(25,113,138,0.4)] cursor-pointer"
            onClick={(e) => {
              const el = e.currentTarget;
              el.classList.remove('clicked');
              void el.offsetWidth;
              el.classList.add('clicked');
            }}
          >
            {/* ICON WITH GLOW */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="relative w-[120px] h-[120px] bg-white border-2 border-[#19718A] rounded-full shadow-md flex items-center justify-center">
                <img
                  src="/book1.png"
                  alt="Book Appointment"
                  className="w-[75px] transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Glow Behind Icon */}
                <div className="absolute inset-0 rounded-full bg-[#C8D9E2]/40 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-bold text-[#0e4056] text-center mt-16 transition-colors duration-300 group-hover:text-[#19718A]">
              Book Appointment
            </h3>

            {/* DESCRIPTION */}
            <p className="text-black text-center mt-4 leading-[1.7] group-hover:text-gray-800 transition-colors duration-300">
              Easily schedule appointments with healthcare specialists.
            </p>
          </div>


          {/* Voice Interaction */}
          <div
            className="group relative bg-white p-8 rounded-xl shadow-md border-b-2 border-t-2 border-r-2 border-l-2 border-transparent 
  hover:border-[#088395] transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.03] 
  hover:shadow-[0_0_10px_#19718A,0_0_20px_rgba(25,113,138,0.4)] cursor-pointer"
            onClick={(e) => {
              const el = e.currentTarget;
              el.classList.remove('clicked');
              void el.offsetWidth;
              el.classList.add('clicked');
            }}
          >
            {/* ICON WITH GLOW */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="relative w-[120px] h-[120px] bg-white border-2 border-[#19718A] rounded-full shadow-md flex items-center justify-center">
                <img
                  src="/voice1.png"
                  alt="Voice Interaction"
                  className="w-[75px] transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Glow Behind Icon */}
                <div className="absolute inset-0 rounded-full bg-[#C8D9E2]/40 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-bold text-[#0e4056] text-center mt-16 transition-colors duration-300 group-hover:text-[#19718A]">
              Voice Interaction
            </h3>

            {/* DESCRIPTION */}
            <p className="text-black text-center mt-4 leading-[1.7] group-hover:text-gray-800 transition-colors duration-300">
              Interact with the system using spoken voice commands.
            </p>
          </div>

        </div>
      </section>

      <section className="w-full px-[2%] mt-[50px]">

        {/* HEADING */}
        <h2
          className="text-3xl font-bold text-center mb-10"
          style={{ color: "black", fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Our Facilities
        </h2>

        {/* GRID BOX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">

          {/* 1 — Canteen */}
          <div
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border-2  border-[#79A9C4]
  hover:border-[#088395] transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.03]
  hover:shadow-[0_0_10px_#19718A,0_0_20px_rgba(25,113,138,0.4)] cursor-pointer"
          >
            {/* IMAGE WITH HOVER SCALE */}
            <div className="overflow-hidden rounded">
              <img
                src="/canteen.png"
                alt="Canteen"
                className="w-full h-[170px] object-cover rounded transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            {/* TITLE */}
            <p className="text-center mt-3 font-semibold text-[#0e4056] text-[20px] transition-colors duration-300 group-hover:text-[#19718A]">
              Canteen
            </p>
          </div>

          <div
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border-2  border-[#79A9C4]
  hover:border-[#088395] transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.03]
  hover:shadow-[0_0_10px_#19718A,0_0_20px_rgba(25,113,138,0.4)] cursor-pointer"
          >
            <div className="overflow-hidden rounded">
              <img
                src="/del.png"
                alt="Deluxe Room"
                className="w-full h-[170px] object-cover rounded transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <p className="text-center mt-3 font-semibold text-[#0e4056] text-[20px] transition-colors duration-300 group-hover:text-[#19718A]">
              Deluxe Room
            </p>
          </div>

          <div
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border-2  border-[#79A9C4]
  hover:border-[#088395] transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.03]
  hover:shadow-[0_0_10px_#19718A,0_0_20px_rgba(25,113,138,0.4)] cursor-pointer"
          >
            <div className="overflow-hidden rounded">
              <img
                src="/nur.png"
                alt="Nursing Staff"
                className="w-full h-[170px] object-cover rounded transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <p className="text-center mt-3 font-semibold text-[#0e4056] text-[20px] transition-colors duration-300 group-hover:text-[#19718A]">
              Nursing Staff
            </p>
          </div>

          <div
            className="group bg-white p-3 rounded-md shadow-md w-[260px] border-2 border-[#79A9C4]
  hover:border-[#088395] transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.03]
  hover:shadow-[0_0_10px_#19718A,0_0_20px_rgba(25,113,138,0.4)] cursor-pointer"
          >
            <div className="overflow-hidden rounded">
              <img
                src="/free.png"
                alt="Free Food"
                className="w-full h-[170px] object-cover rounded transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>

            <p className="text-center mt-3 font-semibold text-[#0e4056] text-[20px] transition-colors duration-300 group-hover:text-[#19718A]">
              Free Food for Patients
            </p>
          </div>

        </div>
      </section>


      <div className="h-9 bg-white"></div>


      {/* ===== Footer Section ===== */}
      <footer className="bg-[#19718A] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* === Logo + Description === */}
          <div className="flex flex-col items-start -mt-6">
            <img
              src="/logo.png"
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
            <h4 className="text-[20px] font-semibold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif">
              <li className="flex items-center gap-2 mb-4">
                <span className="text-white text-sm">▶</span>
                <a href="#" className="hover:text-[#AEE8F5] transition-colors">Home</a>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <a href="#" className="hover:text-[#AEE8F5] transition-colors">About Us</a>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <span className="text-white text-sm">▶</span>
                <a href="#" className="hover:text-[#AEE8F5] transition-colors">Services</a>
              </li>

              <li className="flex items-center gap-2 font-serif">
                <span className="text-white text-sm">▶</span>
                <a href="#" className="hover:text-[#AEE8F5] transition-colors">Gallery</a>
              </li>
            </ul>
          </div>

          {/* === Our Services === */}
          <div>
            <h4 className="text-[20px] font-semibold mb-4 font-serif">Our Services</h4>
            <ul className="space-y-2 text-[16px] font-[400] font-serif mb-4">
              <li>Ayurvedic Treatment</li>
              <li>Herbal Consultation</li>
              <li>Health Care Programs</li>
            </ul>
          </div>

          {/* === Contact Us === */}
          <div>
            <h4 className="text-[20px] font-semibold mb-4 font-serif">Contact Us</h4>
            <ul className="space-y-3 text-[16px] font-[400]">

              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/cl.png" alt="icon" className="w-4 h-4"></img>
                <span>+91 9879877801</span>
              </li>

              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/pack.png" alt="icon" className="w-4 h-4"></img>
                <span>vaidyaGo24@gmail.com</span>

              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <img src="/pack.png" alt="icon" className="w-4 h-4"></img>
                <span>vaidyaGo247@gmail.com</span>

              </li>
              <li className="flex items-center gap-2 font-serif mb-4">
                <i className="fa fa-map-marker text-sm"></i>
                <img src="/map.png" alt="icon" className="w-4 h-4"></img>
                <span>
                  xyz, xyz, Gorakhpur,<br />
                  Uttar Pradesh, 273015
                </span>
              </li>

              {/* ==== Social Icons ===== */}
              <li className="flex items-center gap-3 pt-2">
                <img src="/you.png" className="w-5 cursor-pointer" />
                <img src="/insta.png" className="w-5 cursor-pointer" />
                <img src="/map1.png" className="w-5 cursor-pointer" />
                <img src="/what.png" className="w-5 cursor-pointer" />
              </li>

            </ul>
          </div>
        </div>

        {/* === Bottom Line === */}

      </footer>
    </div>
  );
};

export default Hero1;
