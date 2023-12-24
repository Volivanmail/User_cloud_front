import React,  {useState, useEffect}  from 'react';
import axios from 'axios';
import './FileList.css';
import Popup from '../Popup/Popup';
import { FaDownload, FaTrash, FaLink} from 'react-icons/fa';

export default function FileList() {
    const [files, setFiles] = useState([]);
    // const [fileUrlDownload, setFileUrlDownload] = useState([]);
    const [fileUrl, setFileUrl] = useState('');

    const config = {
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    };

    useEffect(() => {
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
    },[setFiles]);

    // const handleDownload = (id) => {
    //     const config = {headers: {
    //         'Authorization': `Token ${localStorage.getItem('token')}`,
    //         'responseType': 'blob'
    //         }};
    //     axios.get(`${process.env.REACT_APP_API_URL}download_file/?file_id=${id}`, config)
    //     .then(response => {
    //         console.log(response);
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', id);
    //         document.body.appendChild(link);
    //         link.click();
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     })
    // };

    const handleDownload = async(id) => {
        try {
            const config = {headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                        'responseType': 'blob',
                        }};
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}download_file/?file_id=${id}`,
                config
            )
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', id);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Ошибка загрузки файла:', error);
        }
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

    const handleRename = (id, newName) => {
        setFiles(files.map(file => {
            if (file.id === id) {
              return { ...file, file_name: newName };
            }
            return file;
          }));
        const formData = new FormData();
        formData.append('id', id);
        formData.append('file_name', newName);
        axios.put(`${process.env.REACT_APP_API_URL}rename_file/`, formData, config)
        .then( response => {
            console.log('newName');
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
                        <td>
                            <input
                                className="rename-file"
                                type="text"
                                value={file.file_name}
                                onChange={e => handleRename(file.id, e.target.value)}
                            />                        
                        </td>
                        <td>{file.description}</td>
                        <td>{file.file_size}</td>
                        <td>{file.date_upload}</td>
                        <td>{file.date_download}</td>
                        <td>
                            {fileUrl && (
                                <a href={fileUrl} download>
                                Нажмите здесь, чтобы скачать файл
                                </a>
                            )}
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
