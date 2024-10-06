import React, { useState } from "react";
import '../../assets/css/Forms.css';
import '../../assets/css/colors.css';
import PersonalForm from "./PersonalForm";
import EducationForm from "./EducationForm";// Import EducationForm component
import JobExperienceForm from "./ExperienceForm";// Import EducationForm component
import { useNavigate } from "react-router-dom";


const Forms = () => {
    const [curropt, setCurOpt] = useState('personal');

    const navigate = useNavigate();

    return (
        <>
            <div className="forms-body">
                <aside className="form-sidebar">
                    <div className="form-sidebar-header">
                        <h2><span className="form-logo"><i className="ri-links-fill"></i></span> Career</h2>
                        <span className="form-logo inactive"><i className="ri-links-fill"></i></span>
                    </div>
                    <ul className="form-sidebar-links">
                        {/* <h4><span>Main Menu</span></h4>
                        <li><a href="#" onClick={() => setCurOpt('dashboard')} className={curropt === 'dashboard' ? "form-active" : ""}><span><i class="ri-dashboard-fill"></i></span> Dashboard</a></li>
                        <li><a href="#" onClick={() => setCurOpt('reports')} className={curropt === 'reports' ? "form-active" : ""}><span><i class="ri-file-download-fill"></i></span> Logs & Reports</a></li> */}
                        <h4><span>Forms & Data</span></h4>
                        <li><a href="#" onClick={() => setCurOpt('personal')} className={curropt === 'personal' ? "form-active" : ""}><span><i class="ri-account-pin-box-fill"></i></span> Personal Info</a></li>
                        <li><a href="#" onClick={() => setCurOpt('education')} className={curropt === 'education' ? "form-active" : ""}><span><i class="ri-health-book-fill"></i></span> Education Info</a></li> {/* Update this */}
                        <li><a href="#" onClick={() => setCurOpt('experience')} className={curropt === 'experience' ? "form-active" : ""}><span><i class="ri-history-fill"></i></span> Job History Info</a></li>
                        {/* <li><a href="#" onClick={() => setCurOpt('insurance')} className={curropt === 'insurance' ? "form-active" : ""}><span><i class="ri-article-fill"></i></span> Experience Info</a></li> */}
                        <h4><span>Account</span></h4>
                        <li><a href="#"><span><i class="ri-user-fill"></i></span> Profile</a></li>
                        <li><a href="#"><span><i class="ri-settings-2-fill"></i></span> Settings</a></li>
                        <li onClick={()=>navigate("/login")}><a href=""><span><i class="ri-logout-box-r-line"></i></span> Logout</a></li>
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
                <div className="forms-container">
                    {curropt === 'personal' && <PersonalForm />}
                    {curropt === 'education' && <EducationForm />} {/* Add this line */}
                    {curropt === 'experience' && <JobExperienceForm />} {/* Add this line */}
                    
                </div>
            </div>
        </>
    );
}

export default Forms;
