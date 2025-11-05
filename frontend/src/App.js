import React, { useEffect, useState } from 'react';
import MemberList from './components/MemberList';
import MemberForm from './components/MemberForm';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import { api } from './api';

export default function App(){
  const [members, setMembers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const loadMembers = async () => {
    try {
      const res = await api.get('/members');
      setMembers(res.data);
    } catch (err) { console.error(err); }
  };

  const loadWorkouts = async (memberId) => {
    try {
      const res = await api.get('/workouts', { params: memberId ? { memberId } : {} });
      setWorkouts(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    loadMembers();
    loadWorkouts();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="title">Gym Membership & Workout Scheduler</div>
        <small>Simple full-stack demo</small>
      </div>

      <div className="row">
        <div className="col card">
          <h3>Members</h3>
          <MemberForm
            onSaved={() => { loadMembers(); }}
          />
          <MemberList
            members={members}
            onDelete={() => { loadMembers(); loadWorkouts(); }}
            onEdit={(m) => setSelectedMember(m)}
            onSelect={(m) => { setSelectedMember(m); loadWorkouts(m._id); }}
          />
        </div>

        <div className="col card">
          <h3>Workouts</h3>
          <WorkoutForm
            members={members}
            defaultMember={selectedMember}
            onSaved={() => loadWorkouts(selectedMember ? selectedMember._id : null)}
          />
          <WorkoutList
            workouts={workouts}
            onDeleted={() => loadWorkouts(selectedMember ? selectedMember._id : null)}
          />
        </div>
      </div>
    </div>
  );
}
