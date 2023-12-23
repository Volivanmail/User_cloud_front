import React,  {useState, useEffect}  from 'react';
import "./UsersList.css"
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';


export default function UsersList() {
    const [users, setUsers] = useState([]);

    const config = {
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}admin/get_users/`, config)
        .then(response => {
            setUsers(response.data.data['users']);
            console.log(response.data.data['users']);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    });

    const handleUserFiles = () => {

    }

    const handleChangeAdmin = (user) => {
        const formData = new FormData();
        formData.append('id', user.id);
        console.log(user);
        const is_admin = user.is_admin;
        console.log(is_admin);
        axios.put(`${process.env.REACT_APP_API_URL}admin/edit_user/`, formData, config)
        .then( response => {
            setUsers(users.forEach((item) => {
                console.log(item);
                if (item.id === user.id) {
                    item['is_admin'] = !is_admin;
                };
            }));
            // setUsers(users);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    const handleDeleteUser = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}admin/delete_user/?id=${id}`, config)
        .then( response => {
            console.log(users);
            setUsers(users.filter(user => {return user.id !== id;}));
        })
        .catch((error) => {
            console.error('Error:', error);
        })
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
                            <button type="button" onClick={() => handleUserFiles(user.id)}>Список файлов</button>
                            <button type="button" onClick={() => handleChangeAdmin(user)}>сменить права админа</button>
                            <button type="button" className='btn-icon' onClick={() => handleDeleteUser(user.id)}><FaTrash /></button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    );
};
