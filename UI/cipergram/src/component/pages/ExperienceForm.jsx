import React, { useState } from "react";
import '../../assets/css/PersonalForm.css'; // Using the same CSS for consistency
import tick from '../../assets/images/tick2.png';
import { useNavigate } from "react-router-dom";
import { createExperienceInfo } from '../../api'; // Import the API method

const JobExperienceForm = () => {
    const [currstep, setCurrStep] = useState(1);
    const [completed1, setCompleted1] = useState(false);
    const [completed2, setCompleted2] = useState(false);
    const [completed3, setCompleted3] = useState(false);
    const [submit, setSubmit] = useState(false);

    // State to manage form data
    const [experienceData, setExperienceData] = useState({
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
        companyName2: "",
        position2: "",
        startDate2: "",
        endDate2: "",
        technologies: "",
        tools: "",
        traackNo:""
    });

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExperienceData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle navigation steps
    const handleStep = (method) => {
        if (method === '+') {
            setCurrStep(currstep + 1);
            if (currstep === 1) {
                setCompleted1(true);
            } else if (currstep === 2) {
                setCompleted2(true);
            } else if (currstep === 3) {
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

    // Handle class names for progress steps
    const handleClassname = (data) => {
        return currstep === data ? 'active' : '';
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Concatenate date fields before submitting
        const submissionData = {
            ...experienceData,
            startDate: `${experienceData.startDateMM}/${experienceData.startDateYYYY}`,
            endDate: `${experienceData.endDateMM}/${experienceData.endDateYYYY}`,
            startDate2: `${experienceData.startDate2MM}/${experienceData.startDate2YYYY}`,
            endDate2: `${experienceData.endDate2MM}/${experienceData.endDate2YYYY}`,
            trackNo: localStorage.getItem('userId'), // Add trackNo from localStorage
        };
        console.log(submissionData);
        try {
            await createExperienceInfo(submissionData);
            setCurrStep(4); // Show success step
        } catch (error) {
            console.error("Error submitting experience info", error);
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
                        <li onClick={() => navigate("/login")}><a href="#"><span><i className="ri-logout-box-r-line"></i></span> Logout</a></li>
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
                                <a href="#"><span><i className="ri-briefcase-fill"></i></span> Job Experience Info</a>
                            </div>
                            <ul className="personal-progress-steps">
                                <li className={currstep === 2 || completed1 ? "personal-step active completed" : `personal-step ${handleClassname(1)}`}>
                                    <span>1</span>
                                    <p>Job 1 <br /><span>10 mins to complete</span></p>
                                </li>
                                <li className={currstep === 3 || completed2 ? "personal-step active completed" : `personal-step ${handleClassname(2)}`}>
                                    <span>2</span>
                                    <p>Job 2 <br /><span>10 mins to complete</span></p>
                                </li>
                                <li className={currstep === 4 || completed3 ? "personal-step active completed" : `personal-step ${handleClassname(3)}`}>
                                    <span>3</span>
                                    <p>Technologies & Tools <br /><span>10 mins to complete</span></p>
                                </li>
                            </ul>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Job 1 Details */}
                            <div className={currstep === 1 ? "personal-form-one personal-form-step active-form" : "personal-form-one personal-form-step"}>
                                <div className="personal-bg-svg"><i className="ri-building-fill"></i></div>
                                <h2>Job 1 Details</h2>
                                <p>Enter details about your first job experience</p>
                                <div>
                                    <label>Company Name</label>
                                    <input 
                                        type="text" 
                                        name="companyName" 
                                        value={experienceData.companyName} 
                                        onChange={handleChange} 
                                        placeholder="e.g., ABC Corp" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Job Title</label>
                                    <input 
                                        type="text" 
                                        name="position" 
                                        value={experienceData.position} 
                                        onChange={handleChange} 
                                        placeholder="e.g., Software Engineer" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Start Date</label>
                                    <div className="personal-grouping">
                                        <input 
                                            type="text" 
                                            name="startDateMM" 
                                            value={experienceData.startDateMM} 
                                            onChange={handleChange} 
                                            placeholder="MM" 
                                            maxLength={2} 
                                            pattern="[0-9]{2}" 
                                            required 
                                        />
                                        <input 
                                            type="text" 
                                            name="startDateYYYY" 
                                            value={experienceData.startDateYYYY} 
                                            onChange={handleChange} 
                                            placeholder="YYYY" 
                                            maxLength={4} 
                                            pattern="[0-9]{4}" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>End Date</label>
                                    <div className="personal-grouping">
                                        <input 
                                            type="text" 
                                            name="endDateMM" 
                                            value={experienceData.endDateMM} 
                                            onChange={handleChange} 
                                            placeholder="MM" 
                                            maxLength={2} 
                                            pattern="[0-9]{2}" 
                                            required 
                                        />
                                        <input 
                                            type="text" 
                                            name="endDateYYYY" 
                                            value={experienceData.endDateYYYY} 
                                            onChange={handleChange} 
                                            placeholder="YYYY" 
                                            maxLength={4} 
                                            pattern="[0-9]{4}" 
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Job 2 Details */}
                            <div className={currstep === 2 ? "personal-form-two personal-form-step active-form" : "personal-form-two personal-form-step"}>
                                <div className="personal-bg-svg"><i className="ri-building-fill"></i></div>
                                <h2>Job 2 Details</h2>
                                <p>Enter details about your second job experience</p>
                                <div>
                                    <label>Company Name</label>
                                    <input 
                                        type="text" 
                                        name="companyName2" 
                                        value={experienceData.companyName2} 
                                        onChange={handleChange} 
                                        placeholder="e.g., XYZ Corp" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Job Title</label>
                                    <input 
                                        type="text" 
                                        name="position2" 
                                        value={experienceData.position2} 
                                        onChange={handleChange} 
                                        placeholder="e.g., Senior Developer" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Start Date</label>
                                    <div className="personal-grouping">
                                        <input 
                                            type="text" 
                                            name="startDate2MM" 
                                            value={experienceData.startDate2MM} 
                                            onChange={handleChange} 
                                            placeholder="MM" 
                                            maxLength={2} 
                                            pattern="[0-9]{2}" 
                                            required 
                                        />
                                        <input 
                                            type="text" 
                                            name="startDate2YYYY" 
                                            value={experienceData.startDate2YYYY} 
                                            onChange={handleChange} 
                                            placeholder="YYYY" 
                                            maxLength={4} 
                                            pattern="[0-9]{4}" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>End Date</label>
                                    <div className="personal-grouping">
                                        <input 
                                            type="text" 
                                            name="endDate2MM" 
                                            value={experienceData.endDate2MM} 
                                            onChange={handleChange} 
                                            placeholder="MM" 
                                            maxLength={2} 
                                            pattern="[0-9]{2}" 
                                            required 
                                        />
                                        <input 
                                            type="text" 
                                            name="endDate2YYYY" 
                                            value={experienceData.endDate2YYYY} 
                                            onChange={handleChange} 
                                            placeholder="YYYY" 
                                            maxLength={4} 
                                            pattern="[0-9]{4}" 
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: Technologies & Tools Used */}
                            <div className={currstep === 3 ? "personal-form-three personal-form-step active-form" : "personal-form-three personal-form-step"}>
                                <div className="personal-bg-svg"><i className="ri-tools-fill"></i></div>
                                <h2>Technologies & Tools Used</h2>
                                <p>List the technologies and tools you used in your jobs</p>
                                <div>
                                    <label>Technologies</label>
                                    <input 
                                        type="text" 
                                        name="technologies" 
                                        value={experienceData.technologies} 
                                        onChange={handleChange} 
                                        placeholder="e.g., React, Node.js, AWS" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Tools</label>
                                    <input 
                                        type="text" 
                                        name="tools" 
                                        value={experienceData.tools} 
                                        onChange={handleChange} 
                                        placeholder="e.g., Git, Jenkins, Docker" 
                                        required 
                                    />
                                </div>
                            </div>

                            {/* Button Controls */}
                            <div className={currstep === 4 ? "personal-btn-group display-none" : "personal-btn-group"}>
                                {/* Prev button should not be displayed on the first step */}
                                {currstep > 1 && (
                                    <button 
                                        type="button" 
                                        className="personal-btnPrev" 
                                        onClick={() => handleStep('-')}
                                    >
                                        Prev
                                    </button>
                                )}

                                {/* Next button should be displayed for steps 1 and 2 */}
                                {currstep < 3 && (
                                    <button 
                                        type="button" 
                                        className="personal-btnNext" 
                                        onClick={() => handleStep('+')}
                                    >
                                        Next
                                    </button>
                                )}

                                {/* Submit button should only be displayed on the last step */}
                                {currstep === 3 && (
                                    <button 
                                        type="submit" 
                                        className="personal-btnSubmit"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Success Popup */}
                        <div className={currstep === 4 ? "personal-popup-container" : "personal-popup-container display-none"}>
                            <img src={tick} alt="Success" className="personal-popup-img" />
                            <h2>Success...!</h2>
                            <p>Your job experience details have been successfully updated. Thank you!</p>
                            <button 
                                className="personal-popup-btn" 
                                onClick={() => navigate("/roadmap")}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobExperienceForm;
