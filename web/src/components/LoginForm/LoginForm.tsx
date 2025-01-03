import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { authAPI } from '../../services/api';
import { Loader2 } from 'lucide-react';
import './LoginForm.css';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        dispatch(loginStart());

        try {
            const data = await authAPI.login(email, password);
            dispatch(loginSuccess(data));
            navigate('/');
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Login failed';
            setError(errorMessage);
            dispatch(loginFailure(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to manage your plant collection</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`login-button ${isLoading ? 'loading-button' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="spinner" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <div className="register-link">
                        Don't have an account?{' '}
                        <Link to="/register">Create one here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};