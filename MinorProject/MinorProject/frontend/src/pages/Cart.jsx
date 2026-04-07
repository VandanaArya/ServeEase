import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [tableNo, setTableNo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if(!user) {
        alert("Please log in to place an order");
        navigate('/auth');
        return;
    }
    if(!tableNo) {
        alert("Please enter table number");
        return;
    }

    const orderData = {
        customerId: user.id,
        tableNumber: Number(tableNo),
        items: cart.map(item => ({ menuItem: item._id, quantity: item.qty })),
        totalAmount: getCartTotal(),
        paymentMethod
    };

    try {
        const res = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if(res.ok) {
            alert('Order placed successfully! The chef is preparing your meal.');
            clearCart();
            // Automatically update user loyalty points in local state or refetch profile
            navigate('/profile');
        } else {
            alert('Failed to place order');
        }
    } catch(err) {
        alert('Error: ' + err.message);
    }
  };

  if (cart.length === 0) return <div style={{textAlign:'center', padding:'4rem'}}><h2>Your cart is empty</h2></div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Your Dine-In Cart</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        {cart.map(item => (
          <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                <div>
                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                    <p style={{ margin: 0, color: '#666' }}>Qty: {item.qty} x ${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <p style={{ fontWeight: 'bold' }}>${(item.price * item.qty).toFixed(2)}</p>
                 <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#fee2e2', color: '#b91c1c' }} onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        ))}
        
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', borderRadius: '0 0 16px 16px' }}>
             <h3>Total Amount:</h3>
             <h2 style={{ color: 'var(--primary)' }}>${getCartTotal().toFixed(2)}</h2>
        </div>
      </div>

      <div className="card">
        <h3>Checkout Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
            <div className="form-group">
                <label className="form-label">Table Number</label>
                <input type="number" className="form-control" value={tableNo} onChange={(e) => setTableNo(e.target.value)} placeholder="e.g. 5" min="1" required />
            </div>
            <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="cash">Pay at Reception (Cash/Card)</option>
                    <option value="upi">Online UPI Simulation</option>
                </select>
            </div>
        </div>
        
        <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem', padding: '1rem' }} onClick={handlePlaceOrder}>
            Place Order & Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
