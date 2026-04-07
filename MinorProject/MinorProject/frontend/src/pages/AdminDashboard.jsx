import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ ordersToday: 0, revenueToday: 0 });
    const [tables, setTables] = useState([]);
    
    useEffect(() => {
        // Fetch stats
        fetch('http://localhost:5000/api/stats/dashboard')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(() => {});

        // Fetch tables
        fetch('http://localhost:5000/api/tables')
            .then(res => res.json())
            .then(data => setTables(data))
            .catch(() => {});
    }, []);

    const seedMenu = async () => {
       await fetch('http://localhost:5000/api/menu/seed', {method: 'POST'});
       alert("Menu Seeded. Check Menu Page.");
    };

    const seedTables = async () => {
       await fetch('http://localhost:5000/api/tables/seed', {method: 'POST'});
       alert("Tables Seeded. Refresh page to view them.");
       window.location.reload();
    };

    if(!user || user.role !== 'admin' && user.role !== 'reception') {
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
                     <div key={t._id} style={{ 
                         padding: '1.5rem', textAlign: 'center', borderRadius: '15px',
                         background: t.status === 'available' ? '#dcfce7' : t.status === 'occupied' ? '#fee2e2' : '#fef3c7',
                         border: `2px solid ${t.status === 'available' ? '#16a34a' : t.status === 'occupied' ? '#e11d48' : '#d97706'}`
                     }}>
                         <h4 style={{ margin: 0 }}>Table {t.tableNumber}</h4>
                         <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{t.status}</p>
                     </div>
                 ))}
                 {tables.length === 0 && <p style={{ color: '#888' }}>No tables found. Click Seed Dev Tables.</p>}
            </div>
        </div>
    );
};

export default AdminDashboard;
