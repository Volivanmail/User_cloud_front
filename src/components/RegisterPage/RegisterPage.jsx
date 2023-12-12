import React, { useState } from "react";
import './RegisterPage.css'
import AppName from  "../AppName";


export default function Registration() {
    const [formData, setFormData] = useState({
        login: '',
        username: '',
        email: '',
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
    
        fetch('http://127.0.0.1:8000/api/register/', requestData)
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
            <label htmlFor="login">Логин:</label>
            <input
                type="text"
                id="login"
                name="login"
                value={formData.login}
                placeholder="Только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов"
                onChange={handleChange}
            />
            <label htmlFor="username">Полное имя:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.name}
                placeholder="Имя и фамилия"
                onChange={handleChange}
            />
            <label htmlFor="email">Электронная почта:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
            />
            <label htmlFor="password">Пароль:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                placeholder="Не менее 6 символов: минимум одна заглавная буква, цифра и один специальный символ"
                onChange={handleChange}
            />
            <button type="submit">Регистрация</button>
        </form>
    );
  };
