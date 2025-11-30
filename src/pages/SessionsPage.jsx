import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { counsellors as initialCounsellors } from '../data/counsellors';

const SessionsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [counsellors, setCounsellors] = useState(initialCounsellors);
  const [bookedSessions, setBookedSessions] = useState([]);

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="sessions-page content-container">
        <h1>Therapy / Counselling Sessions</h1>
        <p>Please <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>login</a> to book therapy sessions.</p>
      </div>
    );
  }

  const bookSession = (counsellorId, timeSlot) => {
    const counsellor = counsellors.find((c) => c.id === counsellorId);
    if (counsellor) {
      const newBooking = {
        counsellorName: counsellor.name,
        ...timeSlot,
      };
      setBookedSessions([...bookedSessions, newBooking]);
      // Remove the booked time slot from availability
      const updatedCounsellors = counsellors.map((c) => {
        if (c.id === counsellorId) {
          return {
            ...c,
            availability: c.availability.filter(
              (slot) =>
                slot.date !== timeSlot.date || slot.time !== timeSlot.time
            ),
          };
        }
        return c;
      });
      setCounsellors(updatedCounsellors);
    }
  };

  const cancelSession = (session) => {
    setBookedSessions(
      bookedSessions.filter(
        (s) => s.date !== session.date || s.time !== session.time
      )
    );
    // Add the cancelled time slot back to availability
    const updatedCounsellors = counsellors.map((c) => {
      if (c.name === session.counsellorName) {
        return {
          ...c,
          availability: [...c.availability, { date: session.date, time: session.time }],
        };
      }
      return c;
    });
    setCounsellors(updatedCounsellors);
  };

  return (
    <div className="sessions-page content-container">
      <h1>Therapy / Counselling Sessions</h1>
      <div className="counsellors-list">
        {counsellors.map((counsellor) => (
          <div key={counsellor.id} className="counsellor-item">
            <h2>{counsellor.name}</h2>
            <p>{counsellor.specialty}</p>
            <div className="availability">
              <h3>Available Time Slots:</h3>
              <ul>
                {counsellor.availability.map((slot, index) => (
                  <li key={index}>
                    {slot.date} at {slot.time}
                    <button onClick={() => bookSession(counsellor.id, slot)}>
                      Book Session
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="booked-sessions">
        <h2>Your Booked Sessions</h2>
        {bookedSessions.length === 0 ? (
          <p>You have no booked sessions.</p>
        ) : (
          <ul>
            {bookedSessions.map((session, index) => (
              <li key={index}>
                {session.counsellorName} - {session.date} at {session.time}
                <button onClick={() => cancelSession(session)}>Cancel</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;
