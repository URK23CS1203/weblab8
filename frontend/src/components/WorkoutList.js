import React from 'react';
import { api } from '../api';

export default function WorkoutList({ workouts = [], onDeleted }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workout?')) return;
    try {
      await api.delete(`/workouts/${id}`);
      if (onDeleted) onDeleted();
    } catch (err) { alert('Error deleting workout'); }
  };

  return (
    <div>
      {workouts.length === 0 && <small>No workouts</small>}
      {workouts.map(w => (
        <div key={w._id} style={{borderBottom:'1px solid #eee', padding:'8px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>
              <strong>{w.member?.name || 'Unknown'}</strong> <small>• {new Date(w.date).toLocaleDateString()}</small>
              <div>
                {w.exercises.map((ex, idx) => (
                  <div key={idx}><small>{ex.name} — {ex.sets} sets × {ex.reps} reps</small></div>
                ))}
              </div>
              {w.trainerNotes && <div><small>Notes: {w.trainerNotes}</small></div>}
            </div>
            <div>
              <button className="danger" onClick={() => handleDelete(w._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
