import React, { useState } from "react";
import axios from "axios";
import Popup from "./Popup/Popup";

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [blob, setBlob] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const newBlob = new Blob([e.target.files[0]], { type: e.target.files[0].type });
        setBlob(newBlob);
    }
    const handleDescritionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Выберите файл для загрузки');
            return;
        }
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        if (blob) {
            formData.append('blob', blob);
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Токен отсутствует');
            return;
        }
        const config = {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
              }
        };

        try {
            // axios.post(`${process.env.REACT_APP_API_URL}upload/`, formData, config)
            const response = axios.post(`${process.env.REACT_APP_API_URL}upload/`, formData, config)
            if (response.ok) {
                alert('Файл успешно загружен');
            }
            else {
                alert('Ошибка при загрузке');
            }
        }
        catch (error) {
            console.error('ошибка при отправке', error);
        }
        setShowPopup(false);
    }

    // const [selectedFile, setSelectedFile] = useState(null);
    // const [description, setDescription] = useState('');
    // const token = localStorage.getItem('token');
    //     if (!token) {
    //         console.log('Токен отсутствует');
    //         return;
    //     }

    // const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0]);
    //   };
    
    //   const handleDescritionChange = (e) => {
    //     setDescription(e.target.value);
    //   };

    // const handleUpload = () => {
    //     if (selectedFile) {
    //       const formData = new FormData();
    //       formData.append('file', selectedFile);
    //       formData.append('description', description);
    
    //       axios.post(`${process.env.REACT_APP_API_URL}upload/`, formData, {
    //         headers: {
    //           'Authorization': `Token ${token}`,
    //           'Content-Type': 'multipart/form-data'
    //         }
    //       })
    //       .then(response => {
    //         console.log('Файл успешно загружен:', response.data);
    //       })
    //       .catch(error => {
    //         console.error('Ошибка при загрузке файла:', error);
    //       });
    //     } else {
    //       console.log('Файл не выбран');
    //     }
    // };


    return (
        <form>
            <button type='button' className="btn btn-download" onClick={() => setShowPopup(true)}>Загрузить файл</button>
            { showPopup && (
                <Popup>
                    <input type="file" onChange={handleFileChange}/>
                    <input type="text" placeholder="Добавьте описание файла" value={description} onChange={handleDescritionChange} />
                    <button type='submit' className="btn btn-download" onClick={handleUpload}>Отправить файл</button>
                </Popup>
            )}
        </form>
    )
}