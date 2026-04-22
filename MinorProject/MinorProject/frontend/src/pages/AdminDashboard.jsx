import React, { useEffect, useState, useContext } from 'react';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ ordersToday: 0, revenueToday: 0 });
    const [tables, setTables] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'Main Course', imageUrl: '' });
    const [activityLogs, setActivityLogs] = useState([]);
    
    useEffect(() => {
        // Fetch stats
        fetch(`${API_BASE_URL}/api/stats/dashboard`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(() => {});

        // Fetch tables
        fetch(`${API_BASE_URL}/api/tables`)
            .then(res => res.json())
            .then(data => setTables(data))
            .catch(() => {});

        // Fetch menu items
        fetch(`${API_BASE_URL}/api/menu`)
            .then(res => res.json())
            .then(data => setMenuItems(data))
            .catch(() => {});

        // Fetch activity logs
        fetch(`${API_BASE_URL}/api/activity`)
            .then(res => res.json())
            .then(data => setActivityLogs(data))
            .catch(() => {});
    }, []);

    const seedMenu = async () => {
       await fetch(`${API_BASE_URL}/api/menu/seed`, {method: 'POST'});
       alert("Menu Seeded. Check Menu Page.");
    };

    const seedTables = async () => {
       await fetch(`${API_BASE_URL}/api/tables/seed`, {method: 'POST'});
       alert("Tables Seeded. Refresh page to view them.");
       window.location.reload();
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/menu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newItem, price: parseFloat(newItem.price) })
            });
            if(res.ok) {
                const added = await res.json();
                setMenuItems([...menuItems, added]);
                setNewItem({ name: '', description: '', price: '', category: 'Main Course', imageUrl: '' });
                alert('Item added successfully!');
            }
        } catch(err) {
            console.error('Failed to add item', err);
        }
    };

    const handleDeleteItem = async (id) => {
        if(!window.confirm('Are you sure you want to delete this menu item?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/menu/${id}`, { method: 'DELETE' });
            if(res.ok) {
                setMenuItems(menuItems.filter(item => item._id !== id));
            }
        } catch(err) {
            console.error('Failed to delete item', err);
        }
    };

    const toggleTableStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'available' ? 'occupied' : 'available';
        try {
            await fetch(`${API_BASE_URL}/api/tables/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            setTables(prevTables => prevTables.map(t => t._id === id ? { ...t, status: newStatus } : t));
        } catch(err) {
            console.error('Failed to update table status', err);
        }
    };

    if(!user || (user.role !== 'admin' && user.role !== 'reception')) {
        return <div style={{textAlign:'center', padding:'4rem'}}>Access Denied. For Admin/Reception Only.</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h2>Admin & Reception Panel</h2>
                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-secondary" onClick={seedMenu}>Seed Dev Menu</button>
                    <button className="btn btn-secondary" onClick={seedTables}>Seed Dev Tables</button>
                 </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
                 <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', color: 'white' }}>
                      <h3>Today's Orders</h3>
                      <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.ordersToday}</p>
                 </div>
                 <div className="card" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', color: 'white' }}>
                      <h3>Today's Revenue</h3>
                      <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>${stats.revenueToday.toFixed(2)}</p>
                 </div>
                 <div className="card">
                      <h3>Total Tables</h3>
                      <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{tables.length}</p>
                 </div>
            </div>

            {/* Table Management */}
            <h3>Real-Time Table Status</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                 {tables.map(t => (
                     <div key={t._id} 
                         onClick={() => toggleTableStatus(t._id, t.status)}
                         title="Click to toggle status between Complete and Available"
                         style={{ 
                         padding: '1.5rem', textAlign: 'center', borderRadius: '15px', cursor: 'pointer',
                         background: t.status === 'available' ? '#dcfce7' : t.status === 'occupied' ? '#fee2e2' : '#fef3c7',
                         border: `2px solid ${t.status === 'available' ? '#16a34a' : t.status === 'occupied' ? '#e11d48' : '#d97706'}`,
                         transition: 'transform 0.2s',
                     }}
                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                     >
                         <h4 style={{ margin: 0 }}>Table {t.tableNumber}</h4>
                         <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{t.status}</p>
                         <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.7rem', color: '#666' }}>(Click to toggle)</p>
                     </div>
                 ))}
                 {tables.length === 0 && <p style={{ color: '#888' }}>No tables found. Click Seed Dev Tables.</p>}
            </div>

            {/* Menu Management */}
            <h3 style={{ marginTop: '3rem' }}>Menu Management</h3>
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <div style={{ flex: '1', minWidth: '300px', background: 'var(--card-bg)', padding: '2rem', borderRadius: '15px' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Add New Menu Item</h4>
                    <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" className="form-control" placeholder="Item Name" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} required />
                        <input type="text" className="form-control" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} required />
                        <input type="number" step="0.01" className="form-control" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} required />
                        <input type="text" className="form-control" placeholder="Category (e.g. Starters, Main Course, Dessert)" value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} required />
                        <input type="url" className="form-control" placeholder="Image URL (Optional)" value={newItem.imageUrl} onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})} />
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', marginTop: '0.5rem' }}>Add Item</button>
                    </form>
                </div>
                
                <div style={{ flex: '2', minWidth: '300px', maxHeight: '500px', overflowY: 'auto', background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '15px' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Current Menu Items</h4>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {menuItems.map(item => (
                            <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee', background: '#fff', borderRadius: '8px', marginBottom: '0.5rem' }}>
                                <div>
                                    <strong style={{ fontSize: '1.1rem' }}>{item.name}</strong> <span style={{ color: '#666', fontSize: '0.9rem' }}>({item.category})</span>
                                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', color: '#444' }}>{item.description}</p>
                                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '1rem', fontWeight: 'bold' }}>${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
                                </div>
                                <button onClick={() => handleDeleteItem(item._id)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', background: '#ffebee', color: '#c62828', border: 'none' }}>Remove</button>
                            </li>
                        ))}
                        {menuItems.length === 0 && <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>No items found. Add one or click 'Seed Dev Menu'.</p>}
                    </ul>
                </div>
            </div>

            {/* System Activity Logs */}
            <h3 style={{ marginTop: '3rem' }}>System User Activity</h3>
            <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '15px', maxHeight: '400px', overflowY: 'auto' }}>
                 <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                      <thead>
                          <tr style={{ borderBottom: '2px solid #eee' }}>
                              <th style={{ padding: '1rem' }}>User / Chef</th>
                              <th style={{ padding: '1rem' }}>Role</th>
                              <th style={{ padding: '1rem' }}>Action</th>
                              <th style={{ padding: '1rem' }}>Timestamp</th>
                          </tr>
                      </thead>
                      <tbody>
                          {activityLogs.map(log => (
                              <tr key={log._id} style={{ borderBottom: '1px solid #eee' }}>
                                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{log.name}</td>
                                  <td style={{ padding: '1rem', textTransform: 'capitalize' }}>
                                      <span style={{ 
                                          background: log.role === 'admin' || log.role === 'reception' ? '#e0e7ff' : log.role === 'chef' ? '#ffedd5' : '#dcfce7',
                                          color: log.role === 'admin' || log.role === 'reception' ? '#4f46e5' : log.role === 'chef' ? '#ea580c' : '#16a34a',
                                          padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold'
                                      }}>{log.role}</span>
                                  </td>
                                  <td style={{ padding: '1rem' }}>
                                      <span style={{ color: log.action === 'login' ? '#16a34a' : '#ef4444', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>{log.action}</span>
                                  </td>
                                  <td style={{ padding: '1rem', color: '#666', fontSize: '0.9rem' }}>{new Date(log.timestamp).toLocaleString()}</td>
                              </tr>
                          ))}
                          {activityLogs.length === 0 && (
                              <tr>
                                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No login activity recorded yet.</td>
                              </tr>
                          )}
                      </tbody>
                 </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
