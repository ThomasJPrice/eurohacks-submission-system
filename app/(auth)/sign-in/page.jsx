'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const [teamCode, setTeamCode] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamCode, pin }),
    });

    const data = await res.json();

    if (res.ok) {
      // Store the JWT token in localStorage
      window.location.href = '/projects';
    } else {
      toast.error(data.error)
    }
  };

  return (
    <div>
      <h1>Team Login</h1>
      <input
        type="text"
        placeholder="Team Code"
        value={teamCode}
        onChange={(e) => setTeamCode(e.target.value)}
      />
      <input
        type="password"
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}
