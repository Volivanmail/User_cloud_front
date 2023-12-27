import React, { useState } from "react";
import axios from "axios";
import Popup from "./Popup/Popup";

export default function FileUpload({refetch}) {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

        const config = {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
              }
        };

        try {
            axios.post(`${process.env.REACT_APP_API_URL}upload_file/`, formData, config)
            .then(response => {
                refetch();
                console.log('Файл успешно загружен:', response.data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке файла:', error);
            });

        }
        catch (error) {
            console.error('ошибка при отправке', error);
        }

        // refetch();
        setShowPopup(false);
    }

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