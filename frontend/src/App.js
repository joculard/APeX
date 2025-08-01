import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import logo from "./assets/apex-logo.jpg";
import ChatBot from "./ChatBot";

import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PerformancePredictor from "./components/PerformancePredictor";
import StudentSubmit from "./components/StudentSubmit";
import TeacherAssignments from "./components/TeacherAssignments";

const Navbar = () => {
  const location = useLocation();
  const hideNavbarOn = ["/"]; // hide on login
  if (hideNavbarOn.includes(location.pathname)) return null;

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-indigo-900 text-white shadow-md">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="APeX Logo" className="w-12 h-12 rounded-full" />
        <h1 className="text-xl font-bold">APeX</h1>
      </div>

      <div className="flex flex-wrap gap-6 text-sm font-medium">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/attendance" className="hover:underline">Attendance</Link>
        <Link to="/students" className="hover:underline">Students</Link>
        <Link to="/reports" className="hover:underline">Reports</Link>
        <Link to="/submit" className="hover:underline">Submit Work</Link>
        <Link to="/create-assignment" className="hover:underline">Create Assignment</Link>
      </div>
    </nav>
  );
};

const ChatBotWrapper = () => {
  const location = useLocation();
  return location.pathname === "/" ? null : <ChatBot />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-poppins">
        <Navbar />

        <div className="mt-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/students" element={<Students />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/submit" element={<StudentSubmit />} />
            <Route path="/create-assignment" element={<TeacherAssignments />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <ChatBotWrapper />
      </div>
    </Router>
  );
}

export default App;
