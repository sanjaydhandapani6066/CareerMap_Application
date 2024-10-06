import React from "react";
import { Routes, Route} from "react-router-dom"
import LandingPage from "./component/pages/LandingPage";
import LoginPage from "./component/pages/Login";
import Chat from "./component/pages/Chat";
import Forms from "./component/pages/Forms";
import JobExperienceForm from "./component/pages/ExperienceForm";
import EducationForm from "./component/pages/EducationForm";
import CareerRoadmap from "./component/pages/CareerRoadmap";
import SignupPage from "./component/pages/SignUp";
import Search from "./component/pages/Search";
import Personal from "./component/pages/Personal";
import AdminSignup from "./component/pages/AdminSignup";


function RouteApp() {
    return (
      <Routes>  
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/chat" element={<Chat/>}/>
        {/* <Route path="/forms" element={<Forms/>}/> */}
        <Route path="/pforms" element={<Personal/>}/>
        <Route path="/eduforms" element={<EducationForm/>}/>
        <Route path="/expforms" element={<JobExperienceForm/>}/>
        <Route path="/roadmap" element={<CareerRoadmap/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/admSignup" element={<AdminSignup/>}/>
      </Routes>
    );
}

export default RouteApp;
