import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file for styling

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Send plain password
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Signup failed');
            }

            setIsSubmitted(true);
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
                {!isSubmitted ? (
                    <>
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
                    </>
                ) : (
                    <p>Signup successful! Please check your email.</p>
                )}
            </form>
        </div>
    );
}

export default Signup;
