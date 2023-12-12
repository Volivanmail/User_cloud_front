import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./components/LoginPage/LoginPage";
import ClientHome from "./components/ClientHome/ClientHome";
import Registration from "./components/RegisterPage/RegisterPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={(data) => console.log('Login:', data)}/>} />
                <Route path="/register" element={<Registration onRegister={(data) => console.log('Register:', data)}/>} />
                <Route path="/client-home" element={<ClientHome />} />
                <Route path="/"/>
            </Routes>
        </Router>
    );
}
