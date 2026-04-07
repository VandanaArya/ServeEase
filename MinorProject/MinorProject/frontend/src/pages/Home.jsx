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
          <Link to="/auth" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Book a Table</Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>How it Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem auto', background: 'rgba(240, 101, 67, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <QrCode size={40} />
            </div>
            <h3>1. Scan QR</h3>
            <p style={{ color: '#666', marginTop: '1rem' }}>Just scan the code on your table to instantly view our rich menu.</p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem auto', background: 'rgba(240, 101, 67, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
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
    </div>
  );
};

export default Home;
