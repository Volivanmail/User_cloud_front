import React, { useState } from "react";
import './LoginPage.css'
import AppName from  "../AppName";

export default function LoginPage( {onLogin} ) {
    const [login, setUserLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // здесь логику
        onLogin( {login, password} );
    }

    return (
        <form className="container" onSubmit={handleLogin}>
            <AppName />
            <input type="text" placeholder="Логин" value={login} onChange={(e) => setUserLogin(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Войти</button>
            <button type="button">Регистрация</button>
            <p>Зарегистрируйтесь если у вас еще нет аккаунта!</p>
        </form>
    );
}
