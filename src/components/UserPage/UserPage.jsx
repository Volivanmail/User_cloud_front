import React from "react";
import './UserPage.css'
import AppName from "../AppName";
import FileList from "../FileList/FileList";
import Logout from "../Logout";
import FileUpload from "../FileUpload";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function UserPage() {

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
                <FileUpload refetch={refetch}/>
                <Logout/>
            </div>
            <FileList files={files} handleEdit={handleEdit} handleRename={handleRename}/>
        </section>
    );
}