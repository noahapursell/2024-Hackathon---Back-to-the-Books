import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import HomePage from './pages/HomePage.js';
import AboutPage from './pages/AboutPage.js';
import Dashboard from './pages/Dashboard.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import CalendarPage from './pages/CalendarPage.js';
import LeaderBoardPage from './pages/LeaderBoardPage.js';
import OfficeHoursPage from './pages/OfficeHoursPage.js';
import StudyPage from './pages/StudyPage.js';
import StudySet from './pages/StudySet.js';

function App() {
  return (
    <div className="content">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/AboutPage" element={<AboutPage/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/LoginPage" element={<LoginPage/>}/>
          <Route path="/RegisterPage" element={<RegisterPage/>}/>
          <Route path="/CalendarPage" element={<CalendarPage/>}/>
          <Route path="/LeaderBoardPage" element={<LeaderBoardPage/>}/>
          <Route path="/OfficeHoursPage" element={<OfficeHoursPage/>}/>
          <Route path="/StudyPage" element={<StudyPage/>}/>
          <Route path="/StudySet/:className/:id" element={<StudySet/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
