import React, { useState } from "react";
import './LoginPage.css'
import AppName from  "../AppName";




export default function Login() {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const requestData = {
        method: 'POST',
        body: formData
        };

        fetch('http://127.0.0.1:8000/api/login/', requestData)
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error('Ошибка запроса');
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
  
    return (
        <form className="container" onSubmit={handleSubmit}>
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
        <button type="button">Регистрация</button>
        <h5>Зарегистрируйтесь если у вас еще нет аккаунта!</h5>
        </form>
    );
};
