import React, { useState } from 'react';
import '../../assets/css/Search.css';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../../api'; // Import the API method

const Search = () => {
    const [email, setEmail] = useState(''); // Change to search by email

    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            // Call the API to get user by email
            const response = await getUserByEmail(email);
            const userData = response.data.id;
            if (userData) {
                // Clear previous userId and set the new one in localStorage
                localStorage.setItem('userId', userData);

                // Navigate to the roadmap page
                navigate("/roadmap");
            } else {
                // If no user found, alert and reset the roadmap
                alert('Employee not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Error fetching user data. Please try again.');
        }
    };

    return (
        <div className="career-roadmap-container">
            <h2>Search Employee</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter Employee Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email input
                />
                <button onClick={handleSearch}>View Career Roadmap</button>
            </div>
        </div>
    );
};

export default Search;
