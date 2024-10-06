import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../assets/css/Signup.css';

const BASE_URL = "http://localhost:8181/api/v1"; // Replace with your actual API base URL

export default function AdminSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setIsSubmitting(true);

        const userData = { name, email, password, role: "ADMIN" }; // Hardcoded role as USER

        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, userData);
            if (response.data.message) {
                setSuccessMessage("Registration successful! You can now log in.");
                // Clear form
                setName("");
                setEmail("");
                setPassword("");
                navigate('/login');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage(error.response?.data?.message || "An error occurred during registration.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <title>Sign Up</title>
            <div className="signup-body">
                <div className="signup-wrapper">
                    <nav className="signup-nav">
                        <div className="signup-nav-logo">
                            <p>LOGO</p>
                        </div>
                        <div className="signup-nav-menu" id="navMenu">
                            <ul>
                                <li><a href="/" className="signup-link active">Home</a></li>
                                <li><a href="#" className="signup-link">Blog</a></li>
                                <li><a href="#" className="signup-link">Services</a></li>
                                <li><a href="#" className="signup-link">About</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="signup-form-box">
                        <header className="signup-header">Sign Up</header>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}
                        <form onSubmit={handleRegister}>
                            <div className="signup-input-box">
                                <label htmlFor="name" className="signup-label">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="signup-input-field"
                                    placeholder="Enter Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <i className="bx bx-user"></i>
                            </div>
                            <div className="signup-input-box">
                                <label htmlFor="email" className="signup-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="signup-input-field"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <i className="bx bx-envelope"></i>
                            </div>
                            <div className="signup-input-box">
                                <label htmlFor="password" className="signup-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="signup-input-field"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <i className="bx bx-lock-alt"></i>
                            </div>
                            <div className="signup-input-box">
                                <input type="submit" className="signup-submit" value={isSubmitting ? "Registering..." : "Register"} disabled={isSubmitting} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
