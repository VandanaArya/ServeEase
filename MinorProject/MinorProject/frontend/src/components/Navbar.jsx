import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-brand">
          <div style={{ fontFamily: 'serif', fontSize: '1.8rem', color: 'white' }}>
            ServeEase.
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#about" className="nav-link">About Us</a>
          <Link to="/menu" className="nav-link">Menu</Link>
          <a href="#contact" className="nav-link">Contact</a>
          {user && user.role === 'customer' && (
             <Link to="/profile" className="nav-link">Profile</Link>
          )}
          {user && user.role === 'chef' && (
             <Link to="/chef" className="nav-link">Chef Panel</Link>
          )}
          {user && user.role === 'admin' && (
             <Link to="/admin" className="nav-link">Admin Panel</Link>
          )}
          
          <Link to="/cart" className="nav-link" style={{position:'relative'}}>
             <ShoppingCart size={24} />
             {cartCount > 0 && (
                <span style={{
                    position: 'absolute', top: '-8px', right: '-8px', 
                    background: 'var(--primary)', color: 'white', 
                    borderRadius: '50%', padding: '2px 6px', fontSize: '12px', fontWeight: 'bold'
                }}>{cartCount}</span>
             )}
          </Link>

          {user ? (
            <button onClick={handleLogout} className="btn btn-secondary" style={{display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.5rem 1rem'}}>
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link to="/auth" className="btn btn-primary" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
               <User size={16} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
