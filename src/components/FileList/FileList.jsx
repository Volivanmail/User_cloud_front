import React,  {useState, useEffect}  from 'react';
import axios from 'axios';

export default function FileList() {
    const [files, setFiles] = useState([]);
    const token = localStorage.getItem('token');
    console.log(token);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}get_files/?id=37`, { headers: { Authorization: `Bearer ` + token} })
        .then(response => {
            console.log(response.data);
            setFiles(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [setFiles]);

    return (
    <div className='file-list-container'>
        <h2>Список файлов</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Description</th>
                    <th>Upload Date</th>
                </tr>
            </thead>
            <tbody>
                {files.map((file)=>{
                    return <tr key={file.id}>
                            <td>{file.name}</td>
                            <td>{file.description}</td>
                            <td>{file.uploadDate}</td>
                        </tr>
                })}
            </tbody>
        </table>
    </div>
    );
};
