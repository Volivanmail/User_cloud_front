import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./components/LoginPage/LoginPage";
import UserPage from "./components/UserPage/UserPage";
import Registration from "./components/RegisterPage/RegisterPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={(data) => console.log('Login:', data)}/>} />
                <Route path="/register" element={<Registration onRegister={(data) => console.log('Register:', data)}/>} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/"/>
            </Routes>
        </Router>
    );
}
