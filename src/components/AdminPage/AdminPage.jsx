import React, { useState } from "react";
import "./AdminPage.css";
import AppName from "../AppName";
import FileList from "../FileList/FileList";
import UsersList from "../UsersList/UsersList";
import Logout from "../Logout";
import FileUpload from "../FileUpload";
import FileListUserForAdmin from "../FileListUserForAdmin/FileListUserForAdmin";




export default function AdminPage() {
    // console.log(userId);


    // const [isVisible, setIsVisible] = useState(true);
    const [showFileList, setShowFileList] = useState(true);
    const [showUserList, setShowUserList] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const hideList = (userId) => {
        setSelectedUserId(userId);
        setShowFileList(false);
        setShowUserList(false);
        // setIsVisible(true);
    }

    const onShowUserList = () => {
        setSelectedUserId(null);
        setShowFileList(false);
        setShowUserList(true);
        // setIsVisible(false);
    }

    const showMyFiles = () => {
        setShowFileList(true);
        setShowUserList(false);
        setSelectedUserId(null);
    }

    return (
        <section>
            <AppName/>
            <div className="box-navbar">
                <button className="btn" onClick={onShowUserList}>Список пользователей</button>
                <button className="btn" onClick={showMyFiles}>Мои файлы</button>
                <Logout/>
            </div>
            <div>
                {showFileList && <FileUpload/>}
            </div>
            <div className="main-box">
                {showFileList && <FileList/>}
                {showUserList && <UsersList hideList={hideList}/>}
                {selectedUserId !== null &&<FileListUserForAdmin userId={selectedUserId}/>}
            </div>
        </section>
    );
}