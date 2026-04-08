import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Users, CheckCircle2, ShoppingCart, Quote, Phone, Mail } from 'lucide-react';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Burger', 'Pizza', 'Pasta', 'Beverage', 'Sweets'];

  const menuItems = [
    { name: 'Chicken Burger', price: 12.00, rating: 5, category: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
    { name: 'BBQ Ribs', price: 24.00, rating: 4, category: 'All', image: 'https://images.unsplash.com/photo-1544025162-83690fc1ce98?auto=format&fit=crop&w=800&q=80' },
    { name: 'Spicy Chicken', price: 15.00, rating: 5, category: 'All', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80' },
    { name: 'White Sauce Pasta', price: 14.00, rating: 4, category: 'Pasta', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80' },
    { name: 'Grilled Salmon', price: 22.00, rating: 5, category: 'All', image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80' },
    { name: 'Chocolate Brownie', price: 8.00, rating: 5, category: 'Sweets', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
    { name: 'Tiramisu Dessert', price: 10.00, rating: 4, category: 'Sweets', image: 'https://images.unsplash.com/photo-1571115177098-24ecfa14e5d1?auto=format&fit=crop&w=800&q=80' },
    { name: 'Coffee Drink', price: 5.00, rating: 4, category: 'Beverage', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
  ];

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out', marginTop: '-104px' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat`,
        paddingTop: '104px',
        color: 'white'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>
          
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', fontFamily: 'serif' }}>
              ServeEase <br/> <span style={{ color: 'var(--secondary)' }}>.</span>
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--secondary)', marginBottom: '1rem', fontStyle: 'italic', fontFamily: 'serif' }}>Taste the heaven.</p>
            <p style={{ fontSize: '1.1rem', color: '#e0e0e0', lineHeight: '1.6', marginBottom: '2.5rem' }}>
              A wonderful serene food paradise. We serve the most aesthetic and delicious cuisines. Book a table and taste our heaven.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/menu" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '4px' }}>Explore Menu</Link>
              <Link to="#booking" className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '4px', background: 'transparent', color: 'white', border: '1px solid white' }}>Book Table</Link>
            </div>
          </div>

          {/* Booking Widget */}
          <div style={{ background: 'rgba(255, 255, 255, 0.95)', padding: '2.5rem', borderRadius: '12px', color: '#222', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)', textAlign: 'center' }}>Book a Table</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', fontWeight: '600' }}><MapPin size={16} style={{ display:'inline', verticalAlign:'middle', marginRight:'5px'}}/> Location</label>
              <select style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem' }}>
                <option>ServeEase Downtown</option>
                <option>ServeEase Riverside</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', fontWeight: '600' }}><Calendar size={16} style={{ display:'inline', verticalAlign:'middle', marginRight:'5px'}}/> Date</label>
                    <input type="date" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem' }} />
                </div>
                <div>
                     <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', fontWeight: '600' }}><Users size={16} style={{ display:'inline', verticalAlign:'middle', marginRight:'5px'}}/> Guests</label>
                     <select style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem' }}>
                        <option>2 People</option>
                        <option>3 People</option>
                        <option>4 People</option>
                        <option>5+ People</option>
                     </select>
                </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', borderRadius: '6px', marginTop: '1rem' }}>Check Availability</button>
          </div>

        </div>
      </section>

      {/* Menu Categories & Items */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-color)', textAlign: 'center' }}>
        <div className="container">
            <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Menu Items</h4>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', fontFamily: 'serif' }}>Discover Our Menu</h2>

            {/* Categories */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '0.8rem 2rem',
                            borderRadius: '30px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            background: activeCategory === cat ? 'var(--primary)' : 'white',
                            color: activeCategory === cat ? 'white' : '#555',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {menuItems.map((item, idx) => (
                    <div key={idx} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < item.rating ? "var(--secondary)" : "none"} />
                                ))}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#222' }}>{item.name}</h3>
                            <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Delicious homemade {item.category.toLowerCase()} perfect for your cravings.</p>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary)' }}>${item.price.toFixed(2)}</span>
                                <button style={{ 
                                    background: 'var(--primary)', 
                                    color: 'white', 
                                    border: 'none', 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                }}>
                                    <ShoppingCart size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
                <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" alt="Our Services" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
            </div>
            <div>
                <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Our Features</h4>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'serif' }}>Why People Choose Us?</h2>
                <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '2rem' }}>We provide the best food services in the city. Our ingredients are fresh, our chefs are highly experienced, and our priority is your satisfaction and health.</p>
                
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ color: 'var(--primary)', background: 'rgba(138, 21, 56, 0.1)', padding: '0.5rem', borderRadius: '50%' }}><CheckCircle2 size={24} /></div>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>100% Fresh Food</h4>
                            <p style={{ color: '#777', fontSize: '0.9rem' }}>We prepare everything with fresh, locally sourced ingredients.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ color: 'var(--primary)', background: 'rgba(138, 21, 56, 0.1)', padding: '0.5rem', borderRadius: '50%' }}><CheckCircle2 size={24} /></div>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Experienced Chefs</h4>
                            <p style={{ color: '#777', fontSize: '0.9rem' }}>Our culinary team has decades of global experience.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ color: 'var(--primary)', background: 'rgba(138, 21, 56, 0.1)', padding: '0.5rem', borderRadius: '50%' }}><CheckCircle2 size={24} /></div>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Clean Kitchen</h4>
                            <p style={{ color: '#777', fontSize: '0.9rem' }}>Hygiene is our top priority. We maintain strict cleaning protocols.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section style={{ background: '#1c1c1c', padding: '6rem 0', color: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{background: 'var(--primary)', padding: '3rem', borderRadius: '20px', textAlign: 'center', position: 'relative'}}>
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" alt="Delicious Food Bowl" style={{ width: '80%', borderRadius: '50%', border: '8px solid white', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', marginTop: '-8rem' }} />
                <h3 style={{ marginTop: '2rem', fontSize: '1.8rem', fontFamily: 'serif' }}>Delicious Deal <br/> <span style={{ color: 'var(--secondary)' }}>30% Off</span></h3>
            </div>

            <div>
                <h4 style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Delivery</h4>
                <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontFamily: 'serif', lineHeight: '1.2' }}>Fastest Delivery <br/>In The City</h2>
                <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                    Craving something delicious? Order now and get it delivered directly to your doorstep in less than 30 minutes. Hot, fresh, and perfectly packed.
                </p>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--secondary)' }}>
                            <ShoppingCart size={24} />
                        </div>
                        <h5 style={{ fontWeight: '600' }}>Order</h5>
                    </div>
                    <div style={{ height: '2px', flex: '1', background: 'rgba(255,255,255,0.2)', marginTop: '30px' }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--secondary)' }}>
                            <Star size={24} />
                        </div>
                        <h5 style={{ fontWeight: '600' }}>Prepare</h5>
                    </div>
                    <div style={{ height: '2px', flex: '1', background: 'rgba(255,255,255,0.2)', marginTop: '30px' }}></div>
                    <div style={{ textAlign: 'center' }}>
                         <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
                            <MapPin size={24} />
                        </div>
                        <h5 style={{ fontWeight: '600' }}>Deliver</h5>
                    </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <Link to="/menu" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '4px' }}>Order Now</Link>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-color)', textAlign: 'center' }}>
        <div className="container">
             <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Testimonials</h4>
             <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', fontFamily: 'serif' }}>What Our Customers Say</h2>

             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[1, 2, 3].map((item) => (
                    <div key={item} style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative' }}>
                        <Quote size={40} color="var(--primary)" style={{ opacity: 0.1, position: 'absolute', top: '10px', right: '10px' }} />
                        <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--secondary)', marginBottom: '1.5rem' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="var(--secondary)" />)}
                        </div>
                        <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '2rem', lineHeight: '1.8' }}>
                            "Absolutely incredible food! The atmosphere was perfect, the staff was extremely friendly, and the taste is beyond anything I've tried in the city."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                            <img src={`https://i.pravatar.cc/100?img=${item + 10}`} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div style={{ textAlign: 'left' }}>
                                <h4 style={{ margin: 0, fontSize: '1rem', color: '#222' }}>John Doe</h4>
                                <span style={{ fontSize: '0.8rem', color: '#888' }}>Food Blogger</span>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: '6rem 0 2rem 0', background: 'white', textAlign: 'center' }}>
          <div className="container" style={{ padding: '0 5%' }}>
              <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Our Gallery</h4>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', fontFamily: 'serif' }}>Explore Our Delights</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  {galleryImages.map((img, idx) => (
                      <div key={idx} style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', paddingBottom: '75%' }}>
                          <img src={img} alt="Gallery" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111', color: 'white', padding: '5rem 0 2rem 0' }}>
         <div className="container">
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                
                {/* Brand & Info */}
                <div>
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--secondary)', marginBottom: '1.5rem', fontFamily: 'serif' }}>ServeEase.</h2>
                    <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '1.5rem' }}>Taste the heaven at our food palace. Where every meal is crafted with absolute love and perfect flavors.</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {/* Social icons placeholders */}
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>F</div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>T</div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>I</div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                     <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.5rem' }}>Quick Links</h3>
                     <ul style={{ listStyle: 'none', padding: 0 }}>
                         {['Home', 'About Us', 'Menu', 'Services', 'Contact'].map(link => (
                             <li key={link} style={{ marginBottom: '1rem' }}>
                                 <Link to="#" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.3s' }}>{link}</Link>
                             </li>
                         ))}
                     </ul>
                </div>

                {/* Contact */}
                <div>
                     <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.5rem' }}>Contact Info</h3>
                     <ul style={{ listStyle: 'none', padding: 0 }}>
                         <li style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: '#aaa' }}>
                             <MapPin size={20} color="var(--primary)" />
                             <span>123 Gourmet Street, Culinary City, CA 94015</span>
                         </li>
                         <li style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: '#aaa' }}>
                             <Phone size={20} color="var(--primary)" />
                             <span>+1 (415) 555-1234</span>
                         </li>
                         <li style={{ display: 'flex', gap: '1rem', color: '#aaa' }}>
                             <Mail size={20} color="var(--primary)" />
                             <span>hello@serveease.com</span>
                         </li>
                     </ul>
                </div>

             </div>

             <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#777', fontSize: '0.9rem' }}>
                 <p>&copy; {new Date().getFullYear()} ServeEase. All rights reserved.</p>
             </div>
         </div>
      </footer>
    </div>
  );
};

export default Home;
