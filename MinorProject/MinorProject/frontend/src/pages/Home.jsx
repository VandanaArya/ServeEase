import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, QrCode, HeartPulse, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '4rem 1rem', background: 'linear-gradient(135deg, rgba(240, 101, 67, 0.1), rgba(255, 126, 95, 0.05))', borderRadius: '30px', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>Sip, Savor & Smile.</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
          Experience the future of dine-in. Scan the QR at your table, order seamlessly, and let us serve you without the wait.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/menu" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>View Menu</Link>
          <Link to="/book-table" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Book a Table</Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--primary)' }}>How it Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem auto', background: 'rgba(240, 101, 67, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <QrCode size={40} />
            </div>
            <h3>1. Scan QR</h3>
            <p style={{ color: '#666', marginTop: '1rem' }}>Just scan the code on your table to instantly view our rich menu.</p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem auto', background: 'rgba(153, 19, 19, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <ChefHat size={40} />
            </div>
            <h3>2. Order Seamlessly</h3>
            <p style={{ color: '#666', marginTop: '1rem' }}>Add your favorites to cart & send them directly to the chef's screen.</p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem auto', background: 'rgba(240, 101, 67, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Clock size={40} />
            </div>
            <h3>3. Real-Time Status</h3>
            <p style={{ color: '#666', marginTop: '1rem' }}>Track when your food goes from 'Preparing' directly to your table.</p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
             <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem auto', background: 'rgba(240, 101, 67, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
               <HeartPulse size={40} />
             </div>
             <h3>4. Earn Loyalty</h3>
             <p style={{ color: '#666', marginTop: '1rem' }}>Collect stamps every time you eat and get free rewards on us!</p>
          </div>

        </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={{ padding: '4rem 1rem', background: 'linear-gradient(135deg, rgba(125, 46, 107, 0.05), rgba(247, 216, 196, 0.1))', borderRadius: '30px', marginBottom: '4rem', scrollMarginTop: '110px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center' }}>About ServeEase</h2>
          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            ServeEase revolutionizes the dining experience by combining cutting-edge QR code technology with seamless ordering. Our mission is to bring speed, convenience, and joy to every table.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            With real-time order tracking and an exclusive loyalty rewards program, we ensure that every visit to your favorite restaurant becomes an unforgettable journey. From the moment you scan to when your meal arrives, everything is at your fingertips.
          </p>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.8' }}>
            Join thousands of diners who are already experiencing the future of dining with ServeEase.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '2rem 1rem', background: 'linear-gradient(135deg, rgba(227, 170, 45, 0.08), rgba(247, 216, 196, 0.08))', borderRadius: '30px', marginBottom: '2rem', scrollMarginTop: '110px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center' }}>Contact Us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>📍 Location</h3>
              <p style={{ color: '#666', lineHeight: '1.5', fontSize: '0.95rem' }}>123 Gourmet Street<br/>Food Court Plaza<br/>Culinary City, CA 94015</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>📞 Phone</h3>
              <p style={{ color: '#666', lineHeight: '1.5', fontSize: '0.95rem' }}><a href="tel:+14155551234" style={{ color: 'var(--primary)', textDecoration: 'none' }}>(415) 555-1234</a><br/>Monday - Sunday<br/>10 AM - 11 PM</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>✉️ Email</h3>
              <p style={{ color: '#666', lineHeight: '1.5', fontSize: '0.95rem' }}><a href="mailto:hello@serveease.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>hello@serveease.com</a><br/>Support • Reservations<br/>Partnerships & Media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ background: 'linear-gradient(135deg, var(--primary), rgba(125, 46, 107, 0.9))', color: 'white', padding: '2rem 1rem', borderRadius: '30px 30px 0 0', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--secondary)' }}>ServeEase</h4>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5', opacity: '0.9' }}>Making dining effortless, one scan at a time.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.8rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', lineHeight: '1.6' }}>
                <li><a href="/" style={{ color: 'white', textDecoration: 'none', opacity: '0.85', transition: 'opacity 0.3s' }}>Home</a></li>
                <li><a href="#about" style={{ color: 'white', textDecoration: 'none', opacity: '0.85', transition: 'opacity 0.3s' }}>About Us</a></li>
                <li><a href="/menu" style={{ color: 'white', textDecoration: 'none', opacity: '0.85', transition: 'opacity 0.3s' }}>Menu</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.8rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', lineHeight: '1.6' }}>
                <li><a href="#contact" style={{ color: 'white', textDecoration: 'none', opacity: '0.85', transition: 'opacity 0.3s' }}>Contact</a></li>
                <li><a href="#" style={{ color: 'white', textDecoration: 'none', opacity: '0.85', transition: 'opacity 0.3s' }}>FAQ</a></li>
                <li><a href="#" style={{ color: 'white', textDecoration: 'none', opacity: '0.85', transition: 'opacity 0.3s' }}>Terms</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', opacity: '0.85' }}>
            <p>&copy; 2024 ServeEase. All rights reserved. | Sip, Savor & Smile.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
