import React,  {useState, useEffect}  from 'react';
import axios from 'axios';
import './FileListUserForAdmin.css';
import Popup from '../Popup/Popup';
import { FaDownload, FaTrash, FaLink} from 'react-icons/fa';

export default function FileListUserForAdmin({userId}) {

    // console.log(userId);
    const [files, setFiles] = useState([]);

    const [fileUrl, setFileUrl] = useState('');

    const config = {
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        };
        if (!token) {
            window.location.replace(`${process.env.REACT_APP_BASE_URL}`);
        }
        axios.get(`${process.env.REACT_APP_API_URL}get_files/?id=${userId}`, config)
        .then(response => {
            setFiles(response.data.data['files']);
            console.log(response.data.data['files']);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    },[userId]);

    const handleDownload = (id) => {

        axios.get(`${process.env.REACT_APP_API_URL}download_file/?file_id=${id}`, config)
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    };

    const handleLink = (id) => {
        axios.get(`${process.env.REACT_APP_API_URL}creating_link_to_the_file/?file_id=${id}`, config)
        .then(response => {
            const url = `${process.env.REACT_APP_API_URL}public/download_file_from_link/?link=${response.data.data['link']}`;
            setFileUrl(url)
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    };

    const handleDeleteFile = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}delete_file/?id=${id}`, config)
        .then( response => {
            console.log(files);
            setFiles(files.filter(file => {return file.id !== id;}));
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    };


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
                            <button type="button" className="btn-icon" onClick={() => handleDownload(file.id)}><FaDownload /></button>
                            <button type="button" className="btn-icon" onClick={() => handleLink(file.id)}><FaLink/></button>
                            <button type="button" className="btn-icon" onClick={() => handleDeleteFile(file.id)}><FaTrash/></button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        <div className='link-box'>
                {fileUrl && (
                    <Popup onClose={() => setFileUrl('')}>
                        <div className='link-box'>{fileUrl}</div>
                    </Popup>
                )}
            </div>
    </div>
    );
};
