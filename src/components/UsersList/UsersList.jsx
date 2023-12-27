import React,  {useState, useEffect}  from 'react';
import "./UsersList.css"
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
// import FileListUserForAdmin from '../FileListUserForAdmin/FileListUserForAdmin';
import AdminPage from '../AdminPage/AdminPage';
// import AdminPage from '../AdminPage/AdminPage';


export default function UsersList({hideList}) {
    const [users, setUsers] = useState([]);

    const [selectedUserId, setSelectedUserId] = useState(null); // состояние для хранения id выбранного пользователя
      
    const onShowUserFiles = (userId) => {
        setSelectedUserId(userId);
        hideList(userId);
    }

    const config = {
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    };

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
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
    },[setUsers]);


    const handleChangeAdmin = (user) => {
        const formData = new FormData();
        formData.append('id', user.id);
        axios.put(`${process.env.REACT_APP_API_URL}admin/edit_user/`, formData, config)
        .then( response => {
            console.log(response.data.data);
            const new_users = users.map( user => {
                if (user.login === response.data.data['login']) {
                    return { ...user, is_admin: response.data.data['is_admin']};
                }
                return user;
            });
            setUsers(new_users);
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
                    <th>Файлов</th>
                    <th>Размер файлов кб</th>
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
                        <td>{user.file_count}</td>
                        <td>{user.total_count}</td>
                        <td>
                            <button type="button" onClick={() => onShowUserFiles(user.id)}>Список файлов</button>
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
