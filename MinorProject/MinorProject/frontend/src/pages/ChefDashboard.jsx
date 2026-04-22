import React, { useEffect, useState, useContext } from 'react';
import { API_BASE_URL, SOCKET_URL } from '../config';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

const ChefDashboard = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch initial active orders
        fetch(`${API_BASE_URL}/api/orders`)
            .then(res => res.json())
            .then(data => {
                // Filter for orders not delivered
                setOrders(data.filter(o => o.status !== 'delivered'));
            });

        // Setup Socket
        const socket = io(SOCKET_URL);
        socket.on('newOrder', (newOrder) => {
            setOrders(prev => [newOrder, ...prev]);
            // Optional: play a sound here!
        });

        socket.on('orderStatusUpdated', (updatedOrder) => {
            setOrders(prev => {
                if(updatedOrder.status === 'delivered') return prev.filter(o => o._id !== updatedOrder._id);
                return prev.map(o => o._id === updatedOrder._id ? updatedOrder : o);
            });
        });

        return () => socket.disconnect();
    }, []);

    const updateStatus = async (id, status) => {
        await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
    };

    if(!user || user.role !== 'chef') return <div style={{textAlign:'center', padding:'4rem'}}>Access Denied. Chef only.</div>;

    return (
        <div>
            <h2>Chef Kitchen Dashboard</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>Real-time incoming orders. Update status when food is ready.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {orders.map(order => (
                    <div key={order._id} className="card" style={{ borderLeft: `5px solid ${order.status === 'received' ? '#e11d48' : order.status === 'preparing' ? '#d97706' : '#16a34a'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>Table #{order.tableNumber}</h3>
                            <span className={`badge badge-${order.status}`}>{order.status}</span>
                        </div>
                        
                        <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                            {order.items.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px dashed #ddd', paddingBottom: '0.2rem' }}>
                                    <span><strong>{item.quantity}x</strong> {item.menuItem?.name || 'Unknown Item'}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {order.status === 'received' && (
                                <button className="btn btn-primary" style={{flex:1, background: '#d97706', boxShadow: 'none'}} onClick={() => updateStatus(order._id, 'preparing')}>Start Preparing</button>
                            )}
                            {order.status === 'preparing' && (
                                <button className="btn btn-primary" style={{flex:1, background: '#16a34a', boxShadow: 'none'}} onClick={() => updateStatus(order._id, 'ready')}>Mark Ready (Serve)</button>
                            )}
                            {order.status === 'ready' && (
                                <button className="btn btn-secondary" style={{flex:1}} onClick={() => updateStatus(order._id, 'delivered')}>Mark Delivered</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {orders.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                    <p>No active orders right now. The kitchen is calm.</p>
                </div>
            )}
        </div>
    );
};

export default ChefDashboard;
