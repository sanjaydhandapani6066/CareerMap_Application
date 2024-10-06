import React, { useState } from "react";
import { loginUser } from '../../api'; // Adjust the path as necessary
import '../../assets/css/Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const navigate = useNavigate(); // For navigation after login

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginErrorMessage(""); // Reset any previous error message
        const loginData = {
            email: loginEmail,
            password: loginPassword,
        };
        try {
            const response = await loginUser(loginData); // Call the login function
            console.log(response.data);
            
            // Store the token and the user ID
            localStorage.setItem('token', response.data.access_token);
            
            // Navigate to the forms page if login is successful
            if(response.data.message === "Logged in successfully.") {
                if(response.data.role==="ADMIN"){
                    navigate("/search"); // Navigate to the forms page on successful login
                }else{
                    localStorage.setItem('userId', response.data.userId); // Optionally store it in localStorage
                navigate("/pforms"); // Navigate to the forms page on successful login
                }
            } else {
                setLoginErrorMessage("Login failed. Please check your credentials.");
            }
        } catch (error) {
            setLoginErrorMessage(error.message || "An error occurred during login.");
        }
    };

    return (
        <>
            <title>Login</title>
            <div className="login-body">
                <div className="login-wrapper">
                    <nav className="login-nav">
                        <div className="login-nav-logo">
                            <p>LOGO</p>
                        </div>
                        <div className="login-nav-menu" id="navMenu">
                            <ul>
                                <li><a href="/" className="login-link active">Home</a></li>
                                <li><a href="#" className="login-link">Blog</a></li>
                                <li><a href="#" className="login-link">Services</a></li>
                                <li><a href="#" className="login-link">About</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div className="login-form-box">
                        <header className="login-header">Login</header>
                        {loginErrorMessage && <div className="error-message">{loginErrorMessage}</div>}
                        <form onSubmit={handleLogin}>
                            <div className="login-register-link">
                            </div>
                            <div className="login-input-box">
                                <input
                                    type="email"
                                    className="login-input-field"
                                    placeholder="Email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                                <i className="bx bx-envelope"></i>
                            </div>
                            <div className="login-input-box">
                                <input
                                    type="password"
                                    className="login-input-field"
                                    placeholder="Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <i className="bx bx-lock-alt"></i>
                            </div>
                            <div className="login-input-box">
                                <input type="submit" className="login-submit" value="Login" />
                            </div>
                            <div className="login-register-link">
                                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
