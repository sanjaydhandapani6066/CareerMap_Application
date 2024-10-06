import React, { useEffect, useState } from 'react';
import '../../assets/css/CareerRoadmap.css'; // Custom CSS for styling
import { getAllPersonalInfoByTrackNo, getAllEducationInfoByTrackNo, getAllExperienceInfoByTrackNo } from '../../api'; // Import your API functions

const PersonRoadmap = () => {
    const [personalInfo, setPersonalInfo] = useState(null); // Initialize as null
    const [educationInfo, setEducationInfo] = useState(null); // Initialize as null
    const [experienceInfo, setExperienceInfo] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch userId from localStorage
    const TrackNo = localStorage.getItem('userId');

    useEffect(() => {
        const fetchRoadmapData = async () => {
            if (!TrackNo) {
                setError("User ID not found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                // Fetch personal info, education info, and experience info
                const personal = await getAllPersonalInfoByTrackNo(TrackNo);
                const education = await getAllEducationInfoByTrackNo(TrackNo);
                const experience = await getAllExperienceInfoByTrackNo(TrackNo);

                setPersonalInfo(personal.data);
                setEducationInfo(education.data); // Assuming it's an object
                setExperienceInfo(experience.data); // Assuming it's an object

                console.log("Personal Info:", personal.data);
                console.log("Education Info:", education.data);
                console.log("Experience Info:", experience.data);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching roadmap data:", err);
                if (err.response) {
                    // Server responded with a status other than 2xx
                    setError(`Failed to load roadmap data: ${err.response.status} ${err.response.statusText}`);
                } else if (err.request) {
                    // Request was made but no response received
                    setError("Failed to load roadmap data: No response from server.");
                } else {
                    // Something else happened
                    setError(`Failed to load roadmap data: ${err.message}`);
                }
                setLoading(false);
            }
        };

        fetchRoadmapData();
    }, [TrackNo]);

    if (loading) {
        return <div className="roadmap-container"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="roadmap-container"><p>{error}</p></div>;
    }

    return (
        <div className="roadmap-container">
            {/* Header Section */}
            <header className="roadmap-header">
                {personalInfo && (
                    <>
                        <h1>{personalInfo.firstName} {personalInfo.lastName}'s Career Roadmap</h1>
                        <p className="roadmap-subtitle">secured</p>
                    </>
                )}
            </header>

            {/* Personal Information Section */}
            <section className="roadmap-section">
                <h2>Personal Information</h2>
                <div className="roadmap-timeline">
                    {personalInfo ? (
                        <div className="roadmap-timeline-item">
                            <div className="roadmap-timeline-dot"></div>
                            <div className="roadmap-timeline-content">
                                <p><strong>Date of Birth:</strong> {personalInfo.dob}</p>
                                <p><strong>Gender:</strong> {personalInfo.gender}</p>
                                <p><strong>Email:</strong> {personalInfo.email}</p>
                                <p><strong>Mobile:</strong> {personalInfo.mobileNumber}</p>
                                <p><strong>Emergency Contact:</strong> {personalInfo.emergencyContact}</p>
                                <p><strong>Address:</strong> {personalInfo.address}, {personalInfo.city}, {personalInfo.state}, {personalInfo.country} - {personalInfo.pincode}</p>
                            </div>
                        </div>
                    ) : (
                        <p>No personal information found.</p>
                    )}
                </div>
            </section>

            {/* Education Section */}
            <section className="roadmap-section">
                <h2>Education</h2>
                <div className="roadmap-timeline">
                    {educationInfo ? (
                        <>
                            {/* First Education Entry */}
                            <div className="roadmap-timeline-item">
                                <div className="roadmap-timeline-dot"></div>
                                <div className="roadmap-timeline-content">
                                    <h3>{educationInfo.degree} in {educationInfo.fieldOfStudy}</h3>
                                    <p> <strong>Institute Name:</strong> {educationInfo.institutionName}, {educationInfo.location}</p>
                                    <p><strong>Graduation Year:</strong>{educationInfo.graduationYear}</p>
                                    <p><strong>CGPA/Percentage:</strong>{educationInfo.cgpaOrPercentage}</p>
                                    {educationInfo.certificationTitle && (
                                        <>
                                            <h3>{educationInfo.certificationTitle} Certification at {educationInfo.certificationInstitution}</h3>
                                            <p><strong>Year of Certification : </strong>{educationInfo.certificationYear}</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Second Education Entry (if exists) */}
                            {/* {educationInfo.degree2 && (
                                <div className="roadmap-timeline-item">
                                    <div className="roadmap-timeline-dot"></div>
                                    <div className="roadmap-timeline-content">
                                        <h3>{educationInfo.degree2} in {educationInfo.fieldOfStudy2}</h3>
                                        <p>{educationInfo.institutionName2}, {educationInfo.location2}</p>
                                        <p>{educationInfo.startMonth2} {educationInfo.startYear2} - {educationInfo.endMonth2} {educationInfo.endYear2}</p>
                                        <p><strong>CGPA/Percentage:</strong> {educationInfo.cgpaOrPercentage2}</p>
                                        {educationInfo.certificationTitle2 && (
                                            <>
                                                <h4>Certification: {educationInfo.certificationTitle2}</h4>
                                                <p>Institution: {educationInfo.certificationInstitution2}</p>
                                                <p>Year: {educationInfo.certificationYear2}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )} */}
                        </>
                    ) : (
                        <p>No education information found.</p>
                    )}
                </div>
            </section>

            {/* Experience Section */}
            <section className="roadmap-section">
                <h2>Experience</h2>
                <div className="roadmap-timeline">
                    {experienceInfo ? (
                        <>
                            {/* First Experience */}
                            <div className="roadmap-timeline-item">
                                <div className="roadmap-timeline-dot"></div>
                                <div className="roadmap-timeline-content">
                                    <h3>{experienceInfo.position} at {experienceInfo.companyName}</h3>
                                    <p><strong>Duration : </strong>{experienceInfo.startDate} - {experienceInfo.endDate}</p>
                                </div>
                            </div>

                            {/* Second Experience (if exists) */}
                            {experienceInfo.position2 && experienceInfo.companyName2 && (
                                <div className="roadmap-timeline-item">
                                    <div className="roadmap-timeline-dot"></div>
                                    <div className="roadmap-timeline-content">
                                        <h3>{experienceInfo.position2} at {experienceInfo.companyName2}</h3>
                                        <p><strong>Duration : </strong>{experienceInfo.startDate2} - {experienceInfo.endDate2}</p>
                                        <p><strong>Technologies : </strong></p>
                                        {/* Assuming technologies2 and tools2 might exist; if not, reuse the first */}
                                        {experienceInfo.technologies ? (
                                            <ul className="roadmap-skills-list">
                                                {experienceInfo.technologies.split(',').map((tech, idx) => (
                                                    <li key={idx} className="roadmap-skill-item">{tech.trim()}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <ul className="roadmap-skills-list">
                                                {experienceInfo.technologies.split(',').map((tech, idx) => (
                                                    <li key={idx} className="roadmap-skill-item">{tech.trim()}</li>
                                                ))}
                                            </ul>
                                        )}

                                        <h4>Tools</h4>
                                        {experienceInfo.tools2 ? (
                                            <ul className="roadmap-skills-list">
                                                {experienceInfo.tools2.split(',').map((tool, idx) => (
                                                    <li key={idx} className="roadmap-skill-item">{tool.trim()}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <ul className="roadmap-skills-list">
                                                {experienceInfo.tools.split(',').map((tool, idx) => (
                                                    <li key={idx} className="roadmap-skill-item">{tool.trim()}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No experience information found.</p>
                    )}
                </div>
            </section>

            {/* Skills Section */}
            {/* <section className="roadmap-skills-section">
                <h2>Technologies & Tools</h2>
                <div className="roadmap-skills-list">
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <span key={index} className="roadmap-skill-item">{skill}</span>
                        ))
                    ) : (
                        <p>No skills found.</p>
                    )}
                </div>
            </section> */}
        </div>
    );

};

export default PersonRoadmap;
