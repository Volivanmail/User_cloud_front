import React, { useState } from "react";
import './LoginPage.css'
import AppName from  "../AppName";
import axios from "axios";



export default function Login() {

    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const [error, setError] = useState('');
  
    const handleChange = (e) => {
        setError('')
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}login/`, formData)
            .then(response => {
                const user = response.data.data
                localStorage.setItem('token', user['token']);
                localStorage.setItem('login', user['login']);
                localStorage.setItem('id', user['id']);
                localStorage.setItem('admin', user['is_admin']);
                if (user['is_admin'] === true) {
                    window.location.replace(`${process.env.REACT_APP_BASE_URL}admin/`);
                } else {
                    window.location.replace(`${process.env.REACT_APP_BASE_URL}user/`);
                }
            })
            .catch(error => {
                setError("Ошибка авторизации!")
                console.error('Ошибка авторизации:', error.message);
            });
    };


    const handleRegistration = (e) => {
        window.location.replace(`${process.env.REACT_APP_BASE_URL}register/`);
    };
  
    return (
        <div className="container">
            <form className="container_login" onSubmit={handleSubmit}>
                <AppName/>
                <input
                    type="text"
                    id="login"
                    name="login"
                    value={formData.login}
                    placeholder="Логин:"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="Пароль:"
                    onChange={handleChange}
                />
                <button type="submit">Войти</button>
                <button onClick={handleRegistration}>Регистрация</button>
                <h5>Зарегистрируйтесь если у вас еще нет аккаунта!</h5>
                <div style={{color: 'red'}}>{error}</div>
            </form>
        </div>
    );
};
