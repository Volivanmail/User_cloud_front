import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import AppName from "../AppName";
import FileList from "../FileList/FileList";
import UsersList from "../UsersList/UsersList";
import Logout from "../Logout";
import FileUpload from "../FileUpload";
import FileListUserForAdmin from "../FileListUserForAdmin/FileListUserForAdmin";
import axios from 'axios';



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

    
    const [files, setFiles] = useState([]); 

    function refetch() {
        console.log("refetch");
        const user_id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        };
        if (!token) {
            window.location.replace(`${process.env.REACT_APP_BASE_URL}`);
        }
        axios.get(`${process.env.REACT_APP_API_URL}get_files/?id=${user_id}`, config)
        .then(response => {
            setFiles(response.data.data['files']);
            console.log(response.data.data['files']);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }


    useEffect(() => {
       refetch();
    },[setFiles]);

    function handleEdit (id) {
        console.log("delete" + id)
        setFiles(files.filter(file => file.id !== id))
    }

    function handleRename(id, newName) {
        setFiles(files.map(file => {
            if (file.id === id) {
              return { ...file, file_name: newName };
            }
            return file;
          }));
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
                {showFileList && <FileUpload refetch={refetch}/>}
            </div>
            <div className="main-box">
                {showFileList && <FileList files={files} handleEdit={handleEdit} handleRename={handleRename}/>}
                {showUserList && <UsersList hideList={hideList}/>}
                {selectedUserId !== null &&<FileListUserForAdmin userId={selectedUserId}/>}
            </div>
        </section>
    );
}