import React, { useState, useEffect } from 'react';
import { api } from '../api';

export default function WorkoutForm({ members = [], defaultMember = null, onSaved }) {
  const [memberId, setMemberId] = useState(defaultMember ? defaultMember._id : '');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [exercises, setExercises] = useState([{ name:'', sets:3, reps:10 }]);
  const [trainerNotes, setTrainerNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if (defaultMember) setMemberId(defaultMember._id);
  }, [defaultMember]);

  const addExercise = () => setExercises([...exercises, {name:'', sets:3, reps:10}]);
  const updateExercise = (i, key, value) => {
    const copy = [...exercises]; copy[i][key] = value; setExercises(copy);
  };
  const removeExercise = (i) => setExercises(exercises.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!memberId) return alert('Select a member');
    setLoading(true);
    try {
      await api.post('/workouts', {
        member: memberId,
        date,
        exercises,
        trainerNotes
      });
      setExercises([{ name:'', sets:3, reps:10 }]);
      setTrainerNotes('');
      if (onSaved) onSaved();
    } catch (err) { alert('Error saving workout'); }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Member</label>
      <select value={memberId} onChange={e=>setMemberId(e.target.value)}>
        <option value="">-- select member --</option>
        {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
      </select>

      <label>Date</label>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} />

      <label>Exercises</label>
      {exercises.map((ex, i) => (
        <div key={i} style={{border:'1px solid #eee', padding:8, marginBottom:8}}>
          <input placeholder="Exercise name" value={ex.name} onChange={e=>updateExercise(i,'name',e.target.value)} required />
          <div style={{display:'flex', gap:8}}>
            <input type="number" min="1" value={ex.sets} onChange={e=>updateExercise(i,'sets',Number(e.target.value))} />
            <input type="number" min="1" value={ex.reps} onChange={e=>updateExercise(i,'reps',Number(e.target.value))} />
            <button type="button" onClick={()=>removeExercise(i)}>Remove</button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addExercise}>Add exercise</button>

      <label>Trainer Notes</label>
      <textarea value={trainerNotes} onChange={e=>setTrainerNotes(e.target.value)} />

      <div style={{marginTop:8}}>
        <button className="primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Workout'}</button>
      </div>
    </form>
  );
}
