import React from "react";
import './ClientHome.css'
import AppName from "../AppName";
import FileList from "../FileList/FileList";

export default function ClientHome() {
    return (
        <section>
            <AppName/>
            <div className="box-navbar">
                <button className="btn btn-download">Загрузить файл</button>
                <button className="btn btn-logout">Выйти</button>
            </div>
            <FileList/>
        </section>
    );
}