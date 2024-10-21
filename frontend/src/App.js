import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Signup from './components/Signup';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/Login';
import Help from './components/Help';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Notes from './components/Notes';
import { AuthProvider, useAuth } from './components/AuthContext'; 
import './App.css';

const App = () => {
    const [showCarousel, setShowCarousel] = useState(true);

    const handleClick = () => {
        setShowCarousel(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Header />
                <div className="app-container">
                    <Routes>
                        <Route path='/Help' element={<Help />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/blog' element={<PrivateRoute component={Notes} />} />
                    </Routes>
                    {showCarousel && <Carousel />}
                </div>
                <Footer />
            </Router>
        </AuthProvider>
    );
};


const PrivateRoute = ({ component: Component }) => {
    const { user } = useAuth(); 

    return user ? <Component /> : <Navigate to="/login" />;
};

export default App;
