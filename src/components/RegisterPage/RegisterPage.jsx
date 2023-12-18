import React, { useState } from "react";
import './RegisterPage.css'
import AppName from  "../AppName";
import axios from "axios";


export default function Registration() {
    const [formData, setFormData] = useState({
        login: '',
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('')
  
    const handleChange = (e) => {
        setError('')
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Проверка ограничений на значения полей ввода
        if (name === 'login') {
            const loginRegex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;
            if (!loginRegex.test(value)) {
                setError(
                    'Только латинские буквы и цифры, первый символ - буква, длина от 4 до 20 символов'
            );
            } else {
                setError('');
            }
        } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            setError('Некорректный email');
        } else if (name === 'password' && (value.length < 6 || !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value))) {
            setError('Минимум 6 символов, одну заглавную букву, одну цифру и один специальный символ');
        } else {
            setError('');
        }
    };

  
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}register/`, formData)
        .then(response => {
            console.log(response.data);
            setError(response.data['message']);
            window.location.replace(`${process.env.REACT_APP_BASE_URL}`)
        })
        .catch(error => {
            setError("Ошибка регистрации!")
            console.error('Error:', error);
        });
    };

    const handleLogin = (e) => {
        window.location.replace(process.env.REACT_APP_BASE_URL)
    }
  
    return (
        <div className="container">
            <form className="container-register" onSubmit={handleSubmit}>
                <AppName/>
                <label htmlFor="login">Логин:</label>
                <input
                    className="input-rp"
                    type="text"
                    id="login"
                    name="login"
                    value={formData.login}
                    placeholder="Только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов"
                    onChange={handleChange}
                />
                <label htmlFor="username">Полное имя:</label>
                <input
                    className="input-rp"
                    type="text"
                    id="username"
                    name="username"
                    value={formData.name}
                    placeholder="Имя и фамилия"
                    onChange={handleChange}
                />
                <label htmlFor="email">Электронная почта:</label>
                <input
                    className="input-rp"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                />
                <label htmlFor="password">Пароль:</label>
                <input
                    className="input-rp"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="Не менее 6 символов: минимум одна заглавная буква, цифра и один специальный символ"
                    onChange={handleChange}
                />
                <button type="submit">Регистрация</button>
                <button type="button" onClick={handleLogin}>Вход</button>
                <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>
            </form>
        </div>
    );
  };
