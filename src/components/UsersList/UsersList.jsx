import React,  {useState, useEffect}  from 'react';
import "./UsersList.css"
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';


export default function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Токен отсутствует');
            return;
        }
        const config = {
            headers: {
                'Authorization': `Token ${token}`
            }
        };
        axios.get(`${process.env.REACT_APP_API_URL}admin/get_users/`, config)
        .then(response => {
            setUsers(response.data.data['users']);
            console.log(response.data.data['users']);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [setUsers]);

    const handleUserFiles = () => {

    }

    const handleChangeAdmin = () => {

    }

    const handleDeleteUser = (e) => {
        e.preventDefault();

        // const user_id = 
    }



    return (
    <div className='list-container'>
        <table className='table'>
        <caption>Список пользователей</caption>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Login</th>
                    <th>User name</th>
                    <th>Email</th>
                    <th>Админ</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>{
                    return <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.login}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.is_admin ? 'Да' : 'Нет'}</td>
                        <td>
                            <button onClick={handleUserFiles}>Список файлов</button>
                            <button onClick={handleChangeAdmin}>сменить права админа</button>
                            <button className='btn-icon' onClick={handleDeleteUser}><FaTrash /></button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    );
};
