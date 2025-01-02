import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { authAPI } from '../../services/api';
import { Loader2 } from 'lucide-react';
import './RegisterForm.css';

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        user_type: 'owner' as 'owner' | 'expert',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await authAPI.register(
                formData.email,
                formData.password,
                formData.full_name,
                formData.user_type
            );
            dispatch(loginSuccess(data));
            navigate('/dashboard');
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Registration failed';
            setError(errorMessage);
            dispatch(loginFailure(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h1 className="register-title">Create Account</h1>
                    <p className="register-subtitle">Join PlantPal and start your gardening journey</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="full_name">Full Name</label>
                        <input
                            id="full_name"
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="user_type">User Type</label>
                        <select
                            id="user_type"
                            name="user_type"
                            value={formData.user_type}
                            onChange={handleChange}
                        >
                            <option value="owner">Plant Owner</option>
                            <option value="expert">Plant Expert</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`submit-button ${isLoading ? 'loading-button' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="spinner" />
                                <span>Creating account...</span>
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    <div className="login-link">
                        Already have an account?{' '}
                        <Link to="/login">Sign in here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};