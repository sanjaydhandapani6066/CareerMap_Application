import axios from "axios";

// Define the BASE_URL directly in the file
const BASE_URL = "http://localhost:8181/api/v1"; // Replace with your API base URL

// Retrieve token from local storage
const AuthHeader = localStorage.getItem("token");
const headers = {
    "Authorization": `Bearer ${AuthHeader}`,
    "Content-Type": "application/json",
};

// Authentication API requests
export const signupUser = (userData) => axios.post(`${BASE_URL}/auth/register`, userData);
export const loginUser = (loginData) => axios.post(`${BASE_URL}/auth/login`, loginData);
export const refreshToken = (refreshTokenData) => axios.post(`${BASE_URL}/auth/refresh-token`, refreshTokenData);
export const logoutUser = () => {
    localStorage.removeItem("token"); // Clear token on logout
    return axios.post(`${BASE_URL}/auth/logout`);
};
export const forgotPassword = (emailData) => axios.post(`${BASE_URL}/auth/forgot-password`, emailData);
export const getUserDetails = () => axios.get(`${BASE_URL}/user/me`, { headers });
// Get user details by ID
export const getUserById = (id) => axios.get(`${BASE_URL}/user/${id}`, { headers });
export const getUserByEmail = (email) => axios.get(`${BASE_URL}/auth/user/${email}`, { headers });

// Education Info API requests
export const getAllEducationInfo = () => axios.get(`${BASE_URL}/auth/education-info/view`, { headers });
export const createEducationInfo = (educationData) => axios.post(`${BASE_URL}/auth/education-info/post`, educationData, { headers });
export const updateEducationInfo = (id, educationData) => axios.put(`${BASE_URL}/auth/education-info/update/${id}`, educationData, { headers });
export const getAllEducationInfoByTrackNo = (TrackNo) => axios.get(`${BASE_URL}/auth/education-info/view/${TrackNo}`, { headers });
export const deleteEducationInfo = (id) => axios.delete(`${BASE_URL}/auth/education-info/delete/${id}`, { headers });

// Personal Info API requests
export const getAllPersonalInfo = () => axios.get(`${BASE_URL}/auth/personal-info/view`, { headers });
export const getAllPersonalInfoByTrackNo = (TrackNo) => axios.get(`${BASE_URL}/auth/personal-info/view/${TrackNo}`, { headers });
export const createPersonalInfo = (personalData) => axios.post(`${BASE_URL}/auth/personal-info/post`, personalData, { headers });
export const updatePersonalInfo = (id, personalData) => axios.put(`${BASE_URL}/auth/personal-info/update/${id}`, personalData, { headers });
export const deletePersonalInfo = (id) => axios.delete(`${BASE_URL}/auth/personal-info/delete/${id}`, { headers });

// Experience Info API requests
export const getAllExperienceInfo = () => axios.get(`${BASE_URL}/auth/experience-info/view`, { headers });
export const getAllExperienceInfoByTrackNo = (TrackNo) => axios.get(`${BASE_URL}/auth/experience-info/view/${TrackNo}`, { headers });
export const createExperienceInfo = (experienceData) => axios.post(`${BASE_URL}/auth/experience-info/post`, experienceData, { headers });
export const updateExperienceInfo = (id, experienceData) => axios.put(`${BASE_URL}/auth/experience-info/update/${id}`, experienceData, { headers });
export const deleteExperienceInfo = (id) => axios.delete(`${BASE_URL}/auth/experience-info/delete/${id}`, { headers });
