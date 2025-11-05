import React, { useState } from 'react';
import { api } from '../api';

export default function MemberForm({ onSaved }) {
  const initial = { name:'', email:'', phone:'', membershipType:'monthly', notes:'' };
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/members', form);
      setForm(initial);
      if (onSaved) onSaved();
    } catch (err) { alert('Error: ' + (err.response?.data?.error || err.message)); }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
      <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
      <label>Membership</label>
      <select value={form.membershipType} onChange={e=>setForm({...form, membershipType:e.target.value})}>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
        <option value="trial">Trial</option>
      </select>
      <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
      <div style={{display:'flex', gap:8}}>
        <button type="submit" className="primary" disabled={loading}>{loading ? 'Saving...' : 'Add Member'}</button>
      </div>
    </form>
  );
}
