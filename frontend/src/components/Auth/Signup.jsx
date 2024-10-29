import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const SignUp = () =>
{
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () =>
    {
        let newErrors = {};

        if (!formData.username.trim())
        {
            newErrors.username = 'Username is required';
        }

        if (!formData.email.trim())
        {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email))
        {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password)
        {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6)
        {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword)
        {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (validateForm())
        {
            console.log('Form submitted', formData);
            // Handle form submission logic here
        }
    };

    return (
        <section className="login-section" id="login">
            <div className="login-container">
                <h2 className="login-title">Welcome Back</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className="login-button">Sign Up</button>
                </form>
                <div className="login-footer">
                    {/* <a href="#forgot-password" className="forgot-password">Forgot Password?</a> */}
                    <p>Already have an account? <a href="/login" className="signup-link">Login</a></p>
                </div>
            </div>
        </section>
    );
};

export default SignUp;