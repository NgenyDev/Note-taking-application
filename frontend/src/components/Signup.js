import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Signup.css'; 

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Signup failed');
            }

            
            alert('Signup successful! Please log in.'); 
            navigate('/login'); 
            setError('');
        } catch (err) {
            
            if (err.message.includes('already exists')) {
                setError('User already exists. Please log in.');
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
                <h1>Sign Up</h1>
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
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}

export default Signup;
