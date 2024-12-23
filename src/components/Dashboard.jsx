// Dashboard.js
import React from 'react';
import { useAuth } from '../App';
import TeacherPanel from './TeacherPanel';
import StudentPanel from './StudentPanel';

function Dashboard() {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px' }}>
        <h2>Добро пожаловать, {user.name}!</h2>
        <button onClick={handleLogout}>Выйти</button>
      </header>
      <main>
        {user.role === 'teacher' ? <TeacherPanel /> : <StudentPanel />}
      </main>
    </div>
  );
}

export default Dashboard;
