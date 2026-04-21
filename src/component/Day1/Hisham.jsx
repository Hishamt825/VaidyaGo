import React from "react";

function Hisham() {
  return (
    <div>

      {/* Header */}
      <header style={{background:"#222", color:"#fff", padding:"15px"}}>
        <h1>My React Website</h1>
      </header>

      {/* Hero Section */}
      <section style={{padding:"40px", textAlign:"center"}}>
        <h2>Welcome to My Website</h2>
        <p>This is a simple React page example.</p>
        <button>Get Started</button>
      </section>

      {/* Features Section */}
      <section style={{padding:"40px", background:"#f4f4f4"}}>
        <h2>Features</h2>
        <ul>
          <li>Fast Performance</li>
          <li>Secure System</li>
          <li>Mobile Friendly</li>
          <li>Easy to Use</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section style={{padding:"40px"}}>
        <h2>Contact Us</h2>
        <p>Email: example@email.com</p>
        <p>Phone: +91 1234567890</p>
      </section>

      {/* Footer */}
      <footer style={{background:"#222", color:"#fff", padding:"15px", textAlign:"center"}}>
        <p>© 2026 My React Website</p>
      </footer>

    </div>
  );
}

export default Hisham;