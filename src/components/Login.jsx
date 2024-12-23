// Login.js
import React, { useState } from 'react';
import { useAuth } from '../App';

function Login() {
  const { setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Простой хардкод ролей
    if (username === 'teacher' && password === '1234') {
      setUser({ role: 'teacher', name: 'Преподаватель' });
    } else if (username === 'student' && password === '1234') {
      setUser({ role: 'student', name: 'Студент' });
    } else {
      alert('Неверные логин или пароль');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Вход в систему</h2>
      <h2>логин student / teacher</h2>
      <h2>пароль 1234</h2>
      
      <div style={{ margin: '20px' }}>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ margin: '20px' }}>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default Login;
