import React,  {useState, useEffect}  from 'react';
import axios from 'axios';
import './FileList.css';
import { FaDownload, FaTrash } from 'react-icons/fa';

export default function FileList() {
    const [files, setFiles] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('id');
        if (!token) {
            console.log('Токен отсутствует');
            return;
        }
        const config = {
            headers: {
                'Authorization': `Token ${token}`
            }
        };
        axios.get(`${process.env.REACT_APP_API_URL}get_files/?id=${user_id}`, config)
        .then(response => {
            setFiles(response.data.data['files']);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [setFiles]);

    const handleDownload = () => {
        console.log(1);
    }

    const handleLink = () => {
        console.log(2);
    }

    const handleDeleteFile = () => {

    }


    return (
    <div className='list-container'>
        <table className='table'>
        <caption>Список файлов</caption>
            <thead>
                <tr>
                    <th>Имя файла</th>
                    <th>Описание</th>
                    <th>Размер файла КБ</th>
                    <th>Дата загрузки</th>
                    <th>Дата скачивания</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {files.map((file)=>{
                    return <tr key={file.id}>
                        <td>{file.file_name}</td>
                        <td>{file.description}</td>
                        <td>{file.file_size}</td>
                        <td>{file.date_upload}</td>
                        <td>{file.date_download}</td>
                        <td>
                            <button className="btn-icon" onClick={handleDownload}><FaDownload /></button>
                            <button onClick={handleLink}>Ссылка на скачивание</button>
                            <button className="btn-icon"onClick={handleDeleteFile}><FaTrash/></button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    );
};
