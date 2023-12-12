import React,  {useState, useEffect}  from 'react';

export default function FileList() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/get_files/?id=37')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Ошибка запроса');
            })
            .then((data) => {
                setFiles(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);

    return (
    <div className='file_list-container'>
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
