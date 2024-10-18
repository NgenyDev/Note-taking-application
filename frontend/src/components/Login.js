import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Send plain password
            });

            if (!response.ok) {
                
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            setIsLoggedIn(true);
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                {!isLoggedIn ? (
                    <>
                        <h1>Login</h1>
                        {error && <p className="error-message">{error}</p>}
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </>
                ) : (
                    <p>Login successful! Welcome back.</p>
                )}
            </form>
        </div>
    );
}

export default Login;
