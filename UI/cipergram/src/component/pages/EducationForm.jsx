import React, { useState } from "react";
import '../../assets/css/PersonalForm.css';
import tick from '../../assets/images/tick2.png';
import { useNavigate } from "react-router-dom";
import { createEducationInfo } from "../../api"; // Import API method

const EducationForm = () => {
    const [currstep, setCurrStep] = useState(1);
    const [completed1, setCompleted1] = useState(false);
    const [completed2, setCompleted2] = useState(false);
    const [completed3, setCompleted3] = useState(false);
    const [submit, setSubmit] = useState(false);

    // Form data state
    const [educationData, setEducationData] = useState({
        degree: "",
        fieldOfStudy: "",
        graduationYear: "",
        institutionName: "",
        location: "",
        cgpaOrPercentage: "",
        certificationTitle: "",
        certificationInstitution: "",
        certificationYear: "",
        trackNo:''
    });

    const navigate = useNavigate();

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEducationData({ ...educationData, [name]: value });
    };

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
        if (currstep === data) {
            return 'active';
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Update trackNo from localStorage
        const updatedEducationData = {
            ...educationData,
            trackNo: localStorage.getItem('userId') // Fetch the trackNo from localStorage
        };
    
        console.log(updatedEducationData);
        try {
            await createEducationInfo(updatedEducationData); // Send data to API
            setSubmit(true);
            navigate("/expforms"); // Redirect after successful submission
        } catch (error) {
            console.error("Error submitting education info:", error);
        }
    };
    
    return (
        <>
            <div className="personal-site" id="page">
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

                <div className="personal-container">
                    <div className="personal-form-box">
                        <div className="personal-progress">
                            <div className="personal-logo">
                                <a href="#"><span><i className="ri-book-fill"></i></span> Education Info</a>
                            </div>
                            <ul className="personal-progress-steps">
                                <li className={currstep === 2 || completed1 ? "personal-step active completed" : `personal-step ${() => handleClassname(1)}`}>
                                    <span>1</span>
                                    <p>Highest Qualification <br /><span>10 mins to complete</span></p>
                                </li>
                                <li className={currstep === 3 || completed2 ? "personal-step active completed" : `personal-step ${() => handleClassname(2)}`}>
                                    <span>2</span>
                                    <p>Institution Details <br /><span>10 mins to complete</span></p>
                                </li>
                                <li className={currstep === 4 || completed3 ? "personal-step active completed" : `personal-step ${() => handleClassname(3)}`}>
                                    <span>3</span>
                                    <p>Additional Certifications <br /><span>10 mins to complete</span></p>
                                </li>
                            </ul>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Highest Qualification */}
                            <div className={currstep === 1 ? "personal-form-one personal-form-step active-form" : "personal-form-one personal-form-step"}>
                                <div className="personal-bg-svg"><i class="ri-graduation-cap-fill"></i></div>
                                <h2>Highest Qualification</h2>
                                <p>Enter details about your highest qualification</p>
                                <div>
                                    <label>Degree</label>
                                    <input 
                                        type="text" 
                                        name="degree" 
                                        value={educationData.degree} 
                                        onChange={handleChange} 
                                        placeholder="e.g., Bachelor of Engineering" 
                                    />
                                </div>
                                <div>
                                    <label>Field of Study</label>
                                    <input 
                                        type="text" 
                                        name="fieldOfStudy" 
                                        value={educationData.fieldOfStudy} 
                                        onChange={handleChange} 
                                        placeholder="e.g., Computer Science" 
                                    />
                                </div>
                                <div>
                                    <label>Graduation Year</label>
                                    <input 
                                        type="text" 
                                        name="graduationYear" 
                                        value={educationData.graduationYear} 
                                        onChange={handleChange} 
                                        placeholder="e.g., 2022" 
                                        maxLength={4} 
                                    />
                                </div>
                            </div>

                            {/* Step 2: Institution Details */}
                            <div className={currstep === 2 ? "personal-form-two personal-form-step active-form" : "personal-form-two personal-form-step"}>
                                <div className="personal-bg-svg"><i class="ri-building-fill"></i></div>
                                <h2>Institution Details</h2>
                                <p>Enter the details of the institution where you obtained your degree</p>
                                <div>
                                    <label>Institution Name</label>
                                    <input 
                                        type="text" 
                                        name="institutionName" 
                                        value={educationData.institutionName} 
                                        onChange={handleChange} 
                                        placeholder="e.g., ABC University" 
                                    />
                                </div>
                                <div>
                                    <label>Location</label>
                                    <input 
                                        type="text" 
                                        name="location" 
                                        value={educationData.location} 
                                        onChange={handleChange} 
                                        placeholder="City, Country" 
                                    />
                                </div>
                                <div>
                                    <label>CGPA / Percentage</label>
                                    <input 
                                        type="text" 
                                        name="cgpaOrPercentage" 
                                        value={educationData.cgpaOrPercentage} 
                                        onChange={handleChange} 
                                        placeholder="e.g., 8.5 CGPA or 85%" 
                                    />
                                </div>
                            </div>

                            {/* Step 3: Additional Certifications */}
                            <div className={currstep === 3 ? "personal-form-three personal-form-step active-form" : "personal-form-three personal-form-step"}>
                                <div className="personal-bg-svg"><i class="ri-medal-fill"></i></div>
                                <h2>Additional Certifications</h2>
                                <p>Enter details about any additional certifications or courses you've completed</p>
                                <div>
                                    <label>Certification Title</label>
                                    <input 
                                        type="text" 
                                        name="certificationTitle" 
                                        value={educationData.certificationTitle} 
                                        onChange={handleChange} 
                                        placeholder="e.g., AWS Certified Solutions Architect" 
                                    />
                                </div>
                                <div>
                                    <label>Institution</label>
                                    <input 
                                        type="text" 
                                        name="certificationInstitution" 
                                        value={educationData.certificationInstitution} 
                                        onChange={handleChange} 
                                        placeholder="e.g., Coursera, Udemy" 
                                    />
                                </div>
                                <div>
                                    <label>Year of Completion</label>
                                    <input 
                                        type="text" 
                                        name="certificationYear" 
                                        value={educationData.certificationYear} 
                                        onChange={handleChange} 
                                        placeholder="e.g., 2023" 
                                        maxLength={4} 
                                    />
                                </div>

                            </div>

                            {/* Button Controls */}
                            <div className={currstep === 4 ? "personal-btn-group display-none" : "personal-btn-group"}>
                                <button className={currstep === 1 ? "personal-btnPrev display-none" : "personal-btnPrev"} onClick={(e) => { e.preventDefault(); handleStep('-'); }}>Prev</button>
                                <button className={currstep === 3 ? "personal-btnNext display-none" : "personal-btnNext"} onClick={(e) => { e.preventDefault(); handleStep('+'); }}>Next</button>
                                <button type="submit" className={currstep === 3 ? "personal-btnSubmit" : "personal-btnSubmit display-none"}>Submit</button>
                            </div>
                        </form>

                        {/* Success Popup */}
                        {submit && (
                            <div className="success">
                                <div className="success-icon">
                                    <img src={tick} alt="Success Icon" />
                                </div>
                                <h3>Submission Successful</h3>
                                <p>Your education details have been saved successfully.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EducationForm;
