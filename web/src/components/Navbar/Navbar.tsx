import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { Home, User, LogOut, Leaf } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <Leaf className="brand-logo" />
                    <span className="brand-text">PlantPal</span>
                </Link>

                <div className="navbar-links">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link">
                                <Home className="icon" />
                                <span>Dashboard</span>
                            </Link>
                            <Link to="/profile" className="nav-link">
                                <User className="icon" />
                                <span>Profile</span>
                            </Link>
                            <button onClick={handleLogout} className="logout-button">
                                <LogOut className="icon" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="auth-button login">
                                Login
                            </Link>
                            <Link to="/register" className="auth-button register">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};