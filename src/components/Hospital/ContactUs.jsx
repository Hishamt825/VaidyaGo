import React from "react";
import { MdPhonelinkLock } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="font-sans text-gray-800">


      {/* ================= HEADER SECTION ================= */}
      

        <section className="relative overflow-hidden ">
          {/* Background Image */}


          {/* Navbar */}
          <header className="relative flex items-center justify-between px-8 py-1 bg-[#19718A] border-b border-white/30">

            {/* Empty Left Space (Balance Maintain Karne Ke Liye) */}
            <div className="w-[280px]"></div>

            {/* CENTER NAVIGATION */}
            <nav className="absolute text-[20px] left-[500px] -translate-x-1/2 hidden md:flex items-center gap-[130px]">
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

<section className="relative w-full ">

  {/* TOP BANNER */}
  <div
    className=" h-[420px] bg-cover bg-center flex flex-col  items-center justify-center text-center px-4"
    style={{ backgroundImage: "url('/contact.png')",
      backgroundPosition: "center -60px"

     }}
  >
    <img
    src="/banner.png"
    alt="Overlay"
    className="absolute -top-1 w-full h-full object-cover opacity-90"
  />
    <h1 className=" z-10 -translate-y-10 md:-translate-y-16 text-4xl md:text-6xl font-extrabold text-[#08334A]">
      Contact us
    </h1>

    <p className=" z-10 -translate-y-10 md:-translate-y-16 max-w-3xl text-sm text-gray-700 mt-3">
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
          <img src="/name.png" alt="Logo" className="w-20" />
        </div>

        {/* CONTENT */}
       <div className="p-6 space-y-6">

    {/* Phone */}
    <div className="flex items-start gap-3">
      <span className="text-xl">📱</span>
      <p>
        <strong>For Appointment Related Queries :</strong>{" "}
        <span className="text-[#2c7a8b]">+91 XXXXXXXXXX</span>
      </p>
    </div>

    {/* Working Hours */}
    <div className="flex items-start gap-3">
      <span className="text-xl">⏰</span>
      <p>
        <strong>Working Hours</strong> &nbsp;
        Monday to Saturday
        <span className="text-[#2c7a8b]">(10:00 AM – 6:00 PM)</span>,
        Sunday: <span className="text-[#2c7a8b]">Closed</span>
      </p>
    </div>

    {/* Email Section */}
    <div className="flex items-start gap-3">
      <span className="text-xl">✉️</span>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        <ul className="list-disc pl-5 space-y-3">
          <li>
            For feedback/complaints please write to:
            <br />
            <span className="text-[#2c7a8b]">feedbackVaidyaGo@gmail.com</span>
          </li>

          <li>
            For general/business related queries contact:
            <br />
            <span className="text-[#2c7a8b]">reachusVaidyaGo@gmail.com</span>
          </li>
        </ul>

        <ul className="list-disc pl-5 space-y-3">
          <li>
            For investors related queries contact:
            <br />
            <span className="text-[#2c7a8b]">investor.relations@gmail.com</span>
          </li>

          <li>
            For international patient queries contact:
            <br />
            <span className="text-[#2c7a8b]">QueriesVaidyaGo@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
      </div>
    </div>
  </div>

</section>
        {/* ================= FORM SECTION ================= */}

        <div className="max-w-4xl mx-auto border-2  rounded-2xl shadow-xl p-8 md:p-12 mt-[70px]">

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* First Name */}
            <div>
              <label className="text-sm text-black font-medium">
                First Name
              </label>
              <input
                type="text"
                className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#19718A]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm text-black font-medium">
                Last Name
              </label>
              <input
                type="text"
                className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#19718A]"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm text-black font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#19718A]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-black font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#19718A]"
              />
            </div>

            {/* Feedback */}
            <div className="md:col-span-2">
              <label className="text-sm text-black font-medium">
                Feedback
              </label>
              <textarea
                rows="3"
                className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#19718A]"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-[#0C6173] text-black px-4 py-1 rounded-full hover:bg-[#08334A] transition-all"
              >
                Submit
              </button>
            </div>

          </form>
        </div>
        {/* Our Location Section */}
        <div className="max-w-7xl  mx-auto mt-24">

          {/* Heading */}
          <h2 className="text-3xl font-bold text-black mb-4">
            Our Location
          </h2>

          {/* Map Container */}
          <div className="relative border rounded-2xl overflow-hidden shadow-lg">

            {/* Google Map Iframe */}
            <iframe
              src="https://www.google.com/maps?q=Rheinstraße&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* View on Google Map Button */}
            <a
              href="https://www.google.com/maps?q=Rheinstraße"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-[#19718A] text-white text-sm px-4 py-2 rounded-full shadow-md hover:bg-[#08334A] transition-all"
            >
              View on Google Map
            </a>
          </div>
        </div>

      

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

            <p className="text-[13px] leading-relaxed max-w-xs font-serif">
              Committed to compassionate care, advanced
              technology, and healthier lives serving
              Eastern U.P. with trust, excellence,
              and integrity since 1989.
            </p>
          </div>

          {/* === Quick Links === */}
          <div>
            <h4 className="text-[15px] font-semibold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-[14px] font-[400] font-serif">
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
            <h4 className="text-[15px] font-semibold mb-4 font-serif">Our Services</h4>
            <ul className="space-y-2 text-[14px] font-[400] font-serif mb-4">
              <li>Ayurvedic Treatment</li>
              <li>Herbal Consultation</li>
              <li>Health Care Programs</li>
            </ul>
          </div>

          {/* === Contact Us === */}
          <div>
            <h4 className="text-[15px] font-semibold mb-4 font-serif">Contact Us</h4>
            <ul className="space-y-3 text-[14px] font-[400]">

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
               <img src="/map.png" alt="icon" className="w-5 h-5"></img>
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

export default ContactUs;
