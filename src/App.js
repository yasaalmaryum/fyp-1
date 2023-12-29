import React, { Children } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./student/Home";
import Form from "./student/Form";
import Faculty from "./student/Faculty";
import History from "./student/History";

import Generate from "./student/Generate";
import Track  from "./student/Track.jsx";
import Create from './student/Create';
import FacGenerate from "./facultymodule/FacGenerate.jsx";
import FacRecieve from "./facultymodule/FacStudentReceive.jsx";
import FacForm from "./facultymodule/FacForm.jsx";
import FacHome from "./facultymodule/FacHome.jsx";
import FacAnalytics from "./facultymodule/FacAnalytics.jsx";
import FacCreate from "./facultymodule/FacCreate.jsx";
import FacTrack from "./facultymodule/FacTrack.jsx";

import './index.css';
import CourseDrop from "./forms/CourseDrop.jsx";
import SubjectImprove from "./forms/SubjectImprove.jsx";
import Generic from "./forms/GenericForm.jsx";

import Adminpanel from "../src/admin/Adminpanel.jsx";
import FirstScreen from './components/FirstScreen.jsx';
import Login from './components/Login.jsx';
import Facultylogin from './components/Facultylogin.jsx';

import HRrecord from "./admin/HRrecord.jsx";
import FacultyR from "./admin/FacultyRecord.jsx";
import StudentR from "./admin/Student.jsx";
import FacPanel from "./facultymodule/FacStudentReceive.jsx";
import StudentApplicationDetails from "./maincomponents/StudentApplicationD.jsx";
import CordPanel from "./maincomponents/Corordinatormod.jsx";

import AdminLogin from './components/Admin.jsx';

import AuthRoot from "./pages/auth/AuthRoot";
import HrPanel from "./maincomponents/Hrmodule.jsx";
import HeadPanel from "./maincomponents/HeadDepart.jsx";
// testing
  const USER_TYPES={
    HR:"hr",
    CORIDNATOR:"cordintor",
    HOD:"headdepart",
    FACULTY:"fac"



}
const CURRENT_USER_TYPE = USER_TYPES.FACULTY

const AppRouter = () => (

  
      <div>
        <Routes>
          {/*Student module*/}
        <Route path="/" element={<FirstScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/create" element={<Create />} />
          <Route path="/track" element={<Track />} />
          <Route path="/history" element={<History />} />
         
          <Route path="/faculty" element={<Faculty />} />
          
          {/*Faculty module*/}
          <Route path="/fachome" element={<FacHome />} />
          <Route path="/facform" element={<FacForm />} />
          <Route path="/facgenerate" element={<FacGenerate />} />

          <Route path="/faccreate" element={<FacCreate />} />
          <Route path="/factrack" element={<FacTrack />} />
          <Route path="/facanalytics" element={<FacAnalytics />} />
          <Route path="/facrecieve" element={<FacRecieve />} />
          
          {/*Student Form Routing */}
          
          <Route path="/course" element={<CourseDrop />} />
          <Route path="/generic" element={<Generic />} />
          <Route path="/improve" element={<SubjectImprove />} />
          {/*Faculty Form Routing*/}
          
           {/*Logins*/}
          
        <Route path="/login" element={<Login />} />
        <Route path="/auth/*" element={<AuthRoot />} />
        <Route path="/facultylogin" element={<Facultylogin />} />
        <Route path="/fachome" element={<FacPanel />} />
        <Route path="/hod" element={<HeadPanel />} />
        <Route path="/dco" element={<CordPanel />} />
        <Route path="/humanR" element={<HrPanel />} />
        <Route path="/student-details" element={<StudentApplicationDetails />} />

      
          
         {/*Admin Records*/}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path ="/adminpanel" element ={<Adminpanel/>} />
          <Route path ="/studentrecord" element ={<StudentR/>} />
          <Route path ="/facultyrecord" element ={<FacultyR/>} />
          <Route path ="/hrrecord" element ={<HRrecord/>} />
        </Routes>
      </div>
    

);

export default AppRouter;

  
      