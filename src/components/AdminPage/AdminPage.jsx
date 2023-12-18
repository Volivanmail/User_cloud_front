import React, { useState } from "react";
import "./AdminPage.css";
import AppName from "../AppName";
import FileList from "../FileList/FileList";
import UsersList from "../UsersList/UsersList";
import Logout from "../Logout";
import FileUpload from "../FileUpload";




export default function UserPage() {

    const[isVisible, setIsVisible] = useState(true);


    return (
        <section>
            <AppName/>
            <div className="box-navbar">
                <button className="btn" onClick={() =>setIsVisible(false)}>Список пользователей</button>
                <button className="btn" onClick={() =>setIsVisible(true)}>Мои файлы</button>
                <Logout/>
            </div>
            <div>
                {isVisible && <FileUpload/>}
            </div>
            <div className="main-box">
                {isVisible ? <FileList/> : <UsersList/>}
            </div>
        </section>
    );
}