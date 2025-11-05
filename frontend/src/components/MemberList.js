import React from 'react';
import { api } from '../api';

export default function MemberList({ members = [], onDelete, onEdit, onSelect }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this member?')) return;
    try {
      await api.delete(`/members/${id}`);
      if (onDelete) onDelete();
    } catch (err) { alert('Error deleting'); }
  };

  return (
    <div>
      {members.length === 0 && <small>No members yet</small>}
      {members.map(m => (
        <div key={m._id} style={{borderBottom:'1px solid #eee', padding:'8px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <strong>{m.name}</strong> <small>({m.membershipType})</small>
              <div><small>{m.email} • {m.phone}</small></div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button onClick={() => onSelect && onSelect(m)}>Select</button>
              <button onClick={() => onEdit && onEdit(m)}>Edit</button>
              <button className="danger" onClick={() => handleDelete(m._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
