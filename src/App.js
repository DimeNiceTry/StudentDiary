// App.js
import React, { useState, createContext, useContext } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Context API для управления авторизацией
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(null); // null, { role: 'teacher' | 'student', name: '...' }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        {user ? <Dashboard /> : <Login />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
