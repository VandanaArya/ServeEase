import React, { useState, useEffect, useContext } from 'react';
import { API_BASE_URL, SOCKET_URL } from '../config';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TableBooking = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [bookingStatus, setBookingStatus] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tables`)
      .then(res => res.json())
      .then(data => {
        setTables(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch tables", err);
        setLoading(false);
      });

    const socket = io(SOCKET_URL);
    socket.on('tableStatusUpdated', (updatedTable) => {
      setTables(prevTables => 
        prevTables.map(t => t._id === updatedTable._id ? updatedTable : t)
      );
    });

    return () => socket.disconnect();
  }, []);

  const handleBookTable = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first to book a table.");
      navigate('/auth');
      return;
    }
    if (!selectedTable) {
      setBookingStatus('Please select a table to book.');
      return;
    }

    try {
      setBookingStatus('Processing...');
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: user.id,
          tableNumber: selectedTable.tableNumber,
          date: bookingDate,
          time: bookingTime,
          guests: guests
        })
      });

      if (response.ok) {
        setBookingStatus('Table booked successfully!');
        setSelectedTable(null);
        setBookingDate('');
        setBookingTime('');
      } else {
        const errorData = await response.json();
        setBookingStatus(`Failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      setBookingStatus('An error occurred while booking.');
    }
  };

  if (loading) return <div style={{textAlign:'center', padding:'4rem'}}>Loading Tables...</div>;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Book a Table</h1>
        <p style={{ color: '#666' }}>Reserve your perfect spot. Red tables are currently occupied.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        {tables.map(table => {
          const isOccupied = table.status !== 'available';
          const isSelected = selectedTable?.tableNumber === table.tableNumber;
          
          let bgColor = 'var(--card-bg)';
          let borderColor = '#ddd';
          let textColor = '#333';
          
          if (isOccupied) {
             bgColor = '#ffebee';
             borderColor = '#ef9a9a';
             textColor = '#c62828';
          } else if (isSelected) {
             bgColor = 'var(--primary)';
             borderColor = 'var(--primary)';
             textColor = 'white';
          }

          return (
            <div 
              key={table._id}
              onClick={() => {
                if (!isOccupied) setSelectedTable(table);
              }}
              style={{
                background: bgColor,
                border: `2px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '1.5rem 1rem',
                textAlign: 'center',
                cursor: isOccupied ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                color: textColor,
                opacity: isOccupied ? 0.7 : 1,
                transform: isSelected ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Table {table.tableNumber}</h3>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>Seats: {table.capacity}</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', fontWeight: 'bold' }}>{isOccupied ? 'Occupied' : 'Available'}</p>
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: '500px', margin: '0 auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Reservation Details</h2>
        
        {bookingStatus && (
          <div style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', background: bookingStatus.includes('success') ? '#e8f5e9' : '#ffebee', color: bookingStatus.includes('success') ? '#2e7d32' : '#c62828', textAlign: 'center' }}>
            {bookingStatus}
          </div>
        )}

        <form onSubmit={handleBookTable} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Selected Table</label>
            <input 
              type="text" 
              className="form-control" 
              value={selectedTable ? `Table ${selectedTable.tableNumber} (${selectedTable.capacity} Seats)` : 'None Selected'} 
              readOnly 
              style={{ background: '#f5f5f5', color: '#666' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Date</label>
            <input 
              type="date" 
              className="form-control" 
              required 
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Time</label>
            <input 
              type="time" 
              className="form-control" 
              required 
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Number of Guests</label>
            <input 
              type="number" 
              min="1" 
              max="20"
              className="form-control" 
              required 
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.75rem' }}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default TableBooking;
