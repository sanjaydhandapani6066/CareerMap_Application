import React, { useState } from "react";
import '../../assets/css/PersonalForm.css';
import { useNavigate } from 'react-router-dom';
 import { createPersonalInfo } from '../../api';

export default function Personal() {
    const [currstep, setCurrStep] = useState(1);
    const [completed1, setCompleted1] = useState(false);
    const [completed2, setCompleted2] = useState(false);
    const [completed3, setCompleted3] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        email: '',
        mobileNumber: '',
        linkedinId: '',
        emergencyContact: '',
        address: '',
        city: '',
        pincode: '',
        state: '',
        country: '',
        trackNo:''
    });
    const navigate = useNavigate();

    const handleStep = (method) => {
        if (method === '+') {
            setCurrStep(currstep + 1);
            if (currstep === 2) {
                setCompleted1(true);
            } else if (currstep === 3) {
                setCompleted2(true);
            } else if (currstep === 4) {
                setCompleted3(true);
            }
            if (completed3) {
                setSubmit(true);
            }
        } else {
            setCurrStep(currstep - 1);
            if (currstep === 2) {
                setCompleted1(false);
            } else if (currstep === 3) {
                setCompleted2(false);
            } else if (currstep === 4) {
                setCompleted3(false);
            }
            if (!completed3) {
                setSubmit(false);
            }
        }
    };

    const handleClassname = (data) => {
        return currstep === data ? 'active' : '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDayChange = (e) => {
        setDay(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        const date = `${year}-${month}-${day}`;
        const userId = localStorage.getItem('userId');
        const updatedFormData = { 
            ...formData, 
            dob: date, 
            trackNo: userId 
        };
    
        console.log(updatedFormData); // Log the updated form data
    
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage or state
            const response = await createPersonalInfo(updatedFormData, {
                headers: {
                    Authorization: `Bearer ${token}` // Pass the token if required
                }
            });
            navigate("/eduforms"); // Navigate after successful submission
        } catch (error) {
            console.error("Error creating personal info:", error.response ? error.response.data : error.message);
            // Handle error (e.g., show a notification)
        }
    };    
    return (
        <>
                <div className="forms-body">
                <aside className="form-sidebar">
                    <div className="form-sidebar-header">
                        <h2><span className="form-logo"><i className="ri-links-fill"></i></span> Career</h2>
                        <span className="form-logo inactive"><i className="ri-links-fill"></i></span>
                    </div>
                    <ul className="form-sidebar-links">
                        <h4><span>Forms & Data</span></h4>
                        <li><a href="#"><span><i className="ri-account-pin-box-fill"></i></span> Personal Info</a></li>
                        <li><a href="#"><span><i className="ri-health-book-fill"></i></span> Education Info</a></li>
                        <li><a href="#"><span><i className="ri-history-fill"></i></span> Job History Info</a></li>                        
                        <h4><span>Account</span></h4>
                        <li><a href="#"><span><i className="ri-user-fill"></i></span> Profile</a></li>
                        <li><a href="#"><span><i className="ri-settings-2-fill"></i></span> Settings</a></li>
                        <li onClick={() => navigate("/login")}><a href=""><span><i className="ri-logout-box-r-line"></i></span> Logout</a></li>
                    </ul>

                    <div className="form-user-account">
                        <div className="form-user-profile">
                            <span className="form-user-info">SB</span>
                            <div className="form-user-detail">
                                <h3>Srimithun B</h3>
                                <span>Id : PAT-2024-AQSGRH</span>
                            </div>
                        </div>
                    </div>
                </aside>
        </div>

            <div className="personal-site" id="page">
                <div className="personal-container">
                    <div className="personal-form-box">
                    <div className="personal-progress">
                            <div className="personal-logo">
                                <a href="#"><span><i className="ri-account-pin-box-fill"></i></span> Personal Info</a>
                            </div>
                            <ul className="personal-progress-steps">
                                <li className={currstep === 2 || completed1 ? "personal-step active completed" : `personal-step ${handleClassname(1)}`}>
                                    <span>1</span>
                                    <p>Personal Info <br /><span>10 mins to complete</span></p>
                                </li>
                                <li className={currstep === 3 || completed2 ? "personal-step active completed" : `personal-step ${handleClassname(2)}`}>
                                    <span>2</span>
                                    <p>Contact Info <br /><span>10 mins to complete</span></p>
                                </li>
                                <li className={currstep === 4 || completed3 ? "personal-step active completed" : `personal-step ${handleClassname(3)}`}>
                                    <span>3</span>
                                    <p>Address Info <br /><span>10 mins to complete</span></p>
                                </li>
                            </ul>
                        </div>                        
                        <form onSubmit={handleSubmit}>
                        <div className={currstep === 1 ? "personal-form-one personal-form-step active-form" : "personal-form-one personal-form-step"}>
                                <div className="personal-bg-svg"><i className="ri-spy-fill"></i></div>
                                <h2>Personal Information</h2>
                                <p>Enter your personal information correctly</p>
                                <div>
                                    <label>First Name</label>
                                    <input type="text"name="firstName" placeholder="First Name" onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type="text" name="lastName"placeholder="Last Name" onChange={handleChange}/>
                                </div>
                                <div className="personal-birth">
                                    <label>D.O.B</label>
                                    <div className="personal-grouping">
                                        <input type="text"  name="day" pattern="[0-9]*" min={1} max={31} placeholder="DD" maxLength={2} onChange={handleDayChange}/>
                                        <input type="text" name="month" pattern="[0-9]*" min={1} max={12} placeholder="MM" maxLength={2} onChange={handleMonthChange}/>
                                        <input type="text" name="year"  pattern="[0-9]*" min={0} max={2025} placeholder="YYYY" maxLength={4} onChange={handleYearChange}/>
                                    </div>
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <input type="text"name="gender" placeholder="Eg. Male/Female" onChange={handleChange}/>
                                </div>
                            </div>

                            <div className={currstep === 2 ? "personal-form-two personal-form-step active-form" : "personal-form-two personal-form-step"}>
                                <div className="personal-bg-svg"><i className="ri-contacts-book-fill"></i></div>
                                <h2>Contact Information</h2>
                                <p>Enter your contact information correctly</p>
                                <div>
                                    <label>Email</label>
                                    <input type="email"name="email" placeholder="Email" onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>Mobile Number</label>
                                    <input type="text" name="mobileNumber" placeholder="Mobile Number" pattern="[0-9]*" maxLength={12} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>LinkedIn ID</label>
                                    <input type="text" name="linkedinId" placeholder="Enter Linkedin link" onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>Emergency Contact</label>
                                    <input type="text" name="emergencyContact" placeholder="Emergency Contact 1" pattern="[0-9]*" maxLength={12} onChange={handleChange}/>
                                </div>
                                <div>
                                    <input type="text" placeholder="Emergency Contact 2" pattern="[0-9]*" maxLength={12} />
                                </div>
                            </div>

                            <div className={currstep === 3 ? "personal-form-three personal-form-step active-form" : "personal-form-three personal-form-step"}>
                                <div className="personal-bg-svg"><i className="ri-map-pin-user-fill"></i></div>
                                <h2>Address Information</h2>
                                <p>Enter your address information correctly</p>
                                <div>
                                    <label>Address</label>
                                    <input type="text" name="address" placeholder=" Address" onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>City</label>
                                    <input type="text"name="city"  placeholder="Current City" onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>Pin Code</label>
                                    <input type="text" name="pincode" placeholder="Pin Code" pattern="[0-9]*" maxLength={6} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>State</label>
                                    <input type="text" name="state" placeholder="Current State" onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>Country</label>
                                    <input type="text" name="country" placeholder="Country" onChange={handleChange}/>
                                </div>
                            </div>

                            <div className="personal-btn-group">
    {/* Prev button should not be displayed on the first step */}
    {currstep > 1 && (
        <button type="button" className="personal-btnPrev" onClick={() => handleStep('-')}>Prev</button>
    )}
    
    {/* Next button should be displayed for steps 1 and 2 */}
    {currstep < 3 && (
        <button type="button" className="personal-btnNext" onClick={() => handleStep('+')}>Next</button>
    )}

    {/* Submit button should only be displayed on the last step */}
    {currstep === 3 && (
        <button type="submit" className="personal-btnSubmit">Submit</button>
    )}
</div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}


