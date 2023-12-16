import React from "react";
import './UserPage.css'
import AppName from "../AppName";
import FileList from "../FileList/FileList";
import axios from "axios";


export default function UserPage() {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    };
     
    console.log(config);

    const handleLogout = (e) => {
        axios.post(`${process.env.REACT_APP_API_URL}logout/`, config)
        .then(response => {
            console.log(response.data);
            // window.location.replace(`${process.env.REACT_APP_BASE_URL}`)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <section>
            <AppName/>
            <div className="box-navbar">
                <button className="btn btn-download">Загрузить файл</button>
                <button className="btn btn-logout" onClick={handleLogout}>Выйти</button>
            </div>
            <FileList/>
        </section>
    );
}