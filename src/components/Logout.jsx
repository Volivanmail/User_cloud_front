import React from "react";
import axios from "axios";

export default function Logout() {

    const handleLogout = (e) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Токен отсутствует');
            return;
        }
        const config = {
            headers: {
                'Authorization': `Token ${token}`
            }
        };
         
        console.log(config);

        axios.post(`${process.env.REACT_APP_API_URL}logout/`, {}, config)
        .then(response => {
            console.log(response.data);
            localStorage.clear();
            window.location.replace(`${process.env.REACT_APP_BASE_URL}`)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <button type='button' className="btn btn-logout" onClick={handleLogout}>Выход</button>
    );
}