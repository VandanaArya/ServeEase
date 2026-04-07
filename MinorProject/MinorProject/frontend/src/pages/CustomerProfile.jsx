import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';

const CustomerProfile = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    
    // Simulate real-time tracking of current order status
    useEffect(() => {
        if(!user) return;

        fetch(`http://localhost:5000/api/orders/my-orders/${user.id}`)
            .then(res => res.json())
            .then(data => setOrders(data));

        const socket = io('http://localhost:5000');
        socket.on('orderStatusUpdated', (updatedOrder) => {
            setOrders(prev => prev.map(o => o._id === updatedOrder._id ? updatedOrder : o));
        });
        
        return () => socket.disconnect();
    }, [user]);

    if(!user) return <div style={{textAlign:'center', padding:'4rem'}}>Please login to view profile.</div>;

    const points = user.loyaltyPoints || 0;
    const renderedCircles = Array(8).fill(null);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                    {user.name.charAt(0)}
                </div>
                <div>
                    <h2>{user.name}</h2>
                    <p style={{ color: '#666' }}>{user.email} • Member</p>
                </div>
            </div>

            {/* Loyalty Gamification */}
            <div className="loyalty-container">
                <h3>Your Loyalty Card</h3>
                <p>Complete 8 orders to earn a FREE meal!</p>
                <div className="loyalty-circles">
                    {renderedCircles.map((_, index) => (
                        <div key={index} className={`loyalty-circle ${index < points ? 'filled' : ''}`}>
                            {index < points ? '✓' : index + 1}
                        </div>
                    ))}
                </div>
                {points >= 8 && <p style={{fontWeight:'bold', color: '#ffea00'}}>Congratulations! You have a FREE MEAL on your next visit! 🎉</p>}
            </div>

            {/* Order History / Real Time Status */}
            <h3>Recent Orders</h3>
            <div style={{ marginTop: '1.5rem' }}>
                {orders.map(order => (
                    <div key={order._id} className="card" style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4>Order at Table {order.tableNumber}</h4>
                            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0' }}>{new Date(order.createdAt).toLocaleString()}</p>
                            <div style={{ color: '#555', fontSize: '0.9rem' }}>
                                {order.items.map((item, i) => (
                                    <span key={i}>{item.quantity}x {item.menuItem?.name || 'Menu Item'}{i < order.items.length-1 ? ', ' : ''}</span>
                                ))}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>${order.totalAmount.toFixed(2)}</h3>
                            <span className={`badge badge-${order.status}`}>{order.status}</span>
                        </div>
                    </div>
                ))}
                {orders.length === 0 && <p style={{ color: '#888' }}>You haven't placed any orders yet.</p>}
            </div>
        </div>
    );
};

export default CustomerProfile;
