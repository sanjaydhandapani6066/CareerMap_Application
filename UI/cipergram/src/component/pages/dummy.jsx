import React, { useState } from "react";
import '../../assets/css/PersonalForm.css';
import { useNavigate } from 'react-router-dom';
import { createPersonalInfo } from '../../api'; // Adjust the import path as needed

const PersonalForm = () => {
    const [currstep, setCurrStep] = useState(1);
    const [completed1, setCompleted1] = useState(false);
    const [completed2, setCompleted2] = useState(false);
    const [completed3, setCompleted3] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: { day: '', month: '', year: '' },
        gender: '',
        email: '',
        mobileNumber: '',
        linkedinId: '',
        emergencyContact1: '',
        emergencyContact2: '',
        address: '',
        appSuite: '',
        city: '',
        pinCode: '',
        state: '',
        country: ''
    });

    const navigate = useNavigate();

    const handleStep = (method) => {
        if (method === '+') {
            setCurrStep(currstep + 1);
            if (currstep === 2) {
                setCompleted1(true);
            } else if (currstep === 3) {
                setCompleted2(true);
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
            }
            if (!completed3) {
                setSubmit(false);
            }
        }
    };

    const handleClassname = (data) => {
        return currstep === data ? 'active' : '';
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('dob')) {
            setFormData((prev) => ({
                ...prev,
                dob: { ...prev.dob, [name.split('.')[1]]: value }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { day, month, year } = formData.dob;
            const dob = `${year}-${month}-${day}`; // Adjust the format as per your backend requirement
            await createPersonalInfo({ ...formData, dob }); // Send the data to the backend
            navigate("/eduforms"); // Navigate to the education form after successful submission
        } catch (error) {
            console.error("Error creating personal info:", error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <>
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
                                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
                                </div>
                                <div className="personal-birth">
                                    <label>D.O.B</label>
                                    <div className="personal-grouping">
                                        <input type="text" name="dob.day" pattern="[0-9]*" min={0} max={31} placeholder="DD" maxLength={2} onChange={handleChange} />
                                        <input type="text" name="dob.month" pattern="[0-9]*" min={0} max={12} placeholder="MM" maxLength={2} onChange={handleChange} />
                                        <input type="text" name="dob.year" pattern="[0-9]*" min={0} max={2025} placeholder="YYYY" maxLength={4} onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <input type="text" name="gender" placeholder="Eg. Male/Female" onChange={handleChange} />
                                </div>
                            </div>

                            <div className={currstep === 2 ? "personal-form-two personal-form-step active-form" : "personal-form-two personal-form-step"}>
                                <div className="personal-bg-svg"><i className="ri-contacts-book-fill"></i></div>
                                <h2>Contact Information</h2>
                                <p>Enter your contact information correctly</p>
                                <div>
                                    <label>Email</label>
                                    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Mobile Number</label>
                                    <input type="text" name="mobileNumber" placeholder="Mobile Number" pattern="[0-9]*" maxLength={12} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>LinkedIn ID</label>
                                    <input type="text" name="linkedinId" placeholder="Enter Linkedin link" onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Emergency Contact</label>
                                    <input type="text" name="emergencyContact1" placeholder="Emergency Contact 1" pattern="[0-9]*" maxLength={12} onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="text" name="emergencyContact2" placeholder="Emergency Contact 2" pattern="[0-9]*" maxLength={12} onChange={handleChange} />
                                </div>
                            </div>

                            <div className={currstep === 3 ? "personal-form-three personal-form-step active-form" : "personal-form-three personal-form-step"}>
                                <div className="personal-bg-svg"><i className="ri-map-pin-user-fill"></i></div>
                                <h2>Address Information</h2>
                                <p>Enter your address information correctly</p>
                                <div>
                                    <label>Address</label>
                                    <input type="text" name="address" placeholder="Street Address" onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="text" name="appSuite" placeholder="App, Suite, Building" onChange={handleChange} />
                                </div>
                                <div>
                                    <label>City</label>
                                    <input type="text" name="city" placeholder="Current City" onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Pin Code</label>
                                    <input type="text" name="pinCode" placeholder="Pin Code" pattern="[0-9]*" maxLength={6} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>State</label>
                                    <input type="text" name="state" placeholder="Current State" onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Country</label>
                                    <input type="text" name="country" placeholder="Country" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="personal-btn-group">
                                {currstep > 1 && (
                                    <button type="button" onClick={() => handleStep('-')}>Back</button>
                                )}
                                {currstep < 4 ? (
                                    <button type="button" onClick={() => handleStep('+')}>Next</button>
                                ) : (
                                    <button type="submit">Submit</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalForm;
