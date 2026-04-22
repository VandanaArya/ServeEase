import React, { useEffect, useState, useContext } from 'react';
import { API_BASE_URL } from '../config';
import { CartContext } from '../context/CartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch menu from backend
    fetch(`${API_BASE_URL}/api/menu`)
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Make sure backend is running & seeded!", err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = activeCategory === 'All' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  if (loading) return <div style={{textAlign:'center', padding:'4rem'}}>Loading delicious food...</div>;

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem' }}>Our Menu</h1>
        <p style={{ color: '#666' }}>Discover fresh, flavorful dishes prepared by experts.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} 
              className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ padding: '0.5rem 1.5rem' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {menuItems.length === 0 ? (
        <div style={{textAlign: 'center', padding: '3rem', background: 'var(--card-bg)', borderRadius: '20px'}}>
             <h4>No menu items found.</h4>
             <p>Did you run the seed route on the backend? (POST {API_BASE_URL}/api/menu/seed)</p>
        </div>
      ) : (
        <div className="menu-grid">
            {filteredItems.map(item => (
            <div key={item._id} className="menu-card">
                <img src={item.imageUrl || 'https://via.placeholder.com/400x300?text=Food'} alt={item.name} className="menu-img" />
                <div className="menu-content">
                <h3 className="menu-title">{item.name}</h3>
                <p className="menu-desc">{item.description}</p>
                <div className="menu-footer">
                    <span className="menu-price">${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</span>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => addToCart(item)}>
                    Add to Cart
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
