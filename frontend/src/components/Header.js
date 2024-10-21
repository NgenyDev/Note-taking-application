// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom'; // Use NavLink for active route styling
// import './Header.css'; // Import CSS for styling

// const Header = () => {
//     const [darkMode, setDarkMode] = useState(false);

//     useEffect(() => {
//         // Load dark mode setting from localStorage
//         const savedMode = localStorage.getItem('darkMode') === 'true';
//         setDarkMode(savedMode);
//         document.body.classList.toggle('dark-mode', savedMode);
//     }, []);

//     const toggleDarkMode = () => {
//         // Toggle dark mode and save to localStorage
//         const newMode = !darkMode;
//         setDarkMode(newMode);
//         localStorage.setItem('darkMode', newMode);
//         document.body.classList.toggle('dark-mode', newMode);
//     };

//     return (
//         <header className="header">
//             <nav className="nav-container">
//                 <ul className="nav-list">
//                     <li><NavLink to="/home" className="nav-link" activeClassName="active">Home</NavLink></li>
//                     <li><NavLink to="/contact" className="nav-link" activeClassName="active">Contact Us</NavLink></li>
//                     <li><NavLink to="/help" className="nav-link" activeClassName="active">Help</NavLink></li>
//                     <li><NavLink to="/blog" className="nav-link" activeClassName="active">Notes</NavLink></li>
//                 </ul>
//             </nav>
//             <h1 className="header-title">Note-Taking App</h1>
//             <div className="right-menu">
//                 <NavLink to="/login" className="nav-link" activeClassName="active">Log In</NavLink>
//                 <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
//                 <button 
//                     onClick={toggleDarkMode} 
//                     className="mode-toggle" 
//                     aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//                 >
//                     {darkMode ? 'Light Mode' : 'Dark Mode'}
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; 
import { useAuth } from './AuthContext'; // Import AuthContext
import './Header.css'; 

const Header = () => {
    const { user, logout } = useAuth(); // Access user and logout from AuthContext
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        document.body.classList.toggle('dark-mode', savedMode);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.body.classList.toggle('dark-mode', newMode);
    };

    return (
        <header className="header">
            <nav className="nav-container">
                <ul className="nav-list">
                    <li><NavLink to="/home" className="nav-link" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/contact" className="nav-link" activeClassName="active">Contact Us</NavLink></li>
                    <li><NavLink to="/help" className="nav-link" activeClassName="active">Help</NavLink></li>
                    <li><NavLink to="/blog" className="nav-link" activeClassName="active">Notes</NavLink></li>
                </ul>
            </nav>
            <h1 className="header-title">Note-Taking App</h1>
            <div className="right-menu">
                {user ? (
                    <>
                        <span className="user-greeting">Welcome, {user.email}</span>
                        <button onClick={logout} className="nav-link">Log Out</button>
                    </>
                ) : (
                    <NavLink to="/login" className="nav-link" activeClassName="active">Log In</NavLink>
                )}
                <button 
                    onClick={toggleDarkMode} 
                    className="mode-toggle" 
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </header>
    );
};

export default Header;
