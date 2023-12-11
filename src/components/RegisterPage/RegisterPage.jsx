import React, { useState } from "react";
import './RegisterPage.css'
import AppName from  "../AppName";

export default function RegisterPage( {onLogin} ) {
    const [login, setUserLogin] = useState('');
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // здесь логику
        onLogin( {login, user_name, email, password} );
    }

    // надо ли вводить id в input? и нужно ли проверять пароль?
    return (
        <form className="container" onSubmit={handleLogin}>
            <AppName />
            <label>Логин</label>
            <input type="text" placeholder="Только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов"
                value={login} onChange={(e) => setUserLogin(e.target.value)} />
            <label>Полное имя</label>
            <input type="text" placeholder="Имя и фамилия" value={user_name} onChange={(e) => setUserName(e.target.value)} />
            <label>Электронная почта</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Пароль</label>
            <input type="password" placeholder="Не менее 6 символов: минимум одна заглавная буква, цифра и один
                специальный символ" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button">Регистрация</button>
        </form>
    );
}
