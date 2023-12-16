import React,  {useState, useEffect}  from 'react';
import "./UsersList.css"

export default function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/admin/get_users/')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Ошибка запроса');
            })
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [setUsers]);

    return (
    <div className='list-user-container'>
        <h2>Список пользователей</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>Login</th>
                    <th>User name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>{
                    <tr key={user.id}>
                        <td>{user.login}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    );
};
