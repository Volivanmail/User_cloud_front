import React from "react";
import "./AdminPage.css";
import AppName from "../AppName";
import FileList from "../FileList/FileList";
import UsersList from "../UsersList/UsersList";

export default function UserPage() {
    return (
        <section>
            <AppName/>
            <div className="box-navbar">
                <button className="btn btn-download">Загрузить файл</button>
                <button className="btn btn-files">Мои файлы</button>
                <button className="btn btn-logout">Выйти</button>
            </div>
            <UsersList/>
            <FileList/>
        </section>
    );
}