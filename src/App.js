import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "./components/LoginPage/LoginPage";
import ClientHome from "./components/ClientHome/ClientHome";
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={(data) => console.log('Login:', data)}/>} />
        <Route path="/register" element={<RegisterPage onRegister={(data) => console.log('Register:', data)}/>} />
        <Route path="/client-home" element={<ClientHome />} />
        <Route path="/" />
      </Routes>
    </Router>
  );
}

export default App;
