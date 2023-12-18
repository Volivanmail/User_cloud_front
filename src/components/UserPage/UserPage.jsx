import React from "react";
import './UserPage.css'
import AppName from "../AppName";
import FileList from "../FileList/FileList";
import Logout from "../Logout";
import FileUpload from "../FileUpload";


export default function UserPage() {


    return (
        <section>
            <AppName/>
            <div className="box-navbar">
                <FileUpload/>
                <Logout/>
            </div>
            <FileList/>
        </section>
    );
}