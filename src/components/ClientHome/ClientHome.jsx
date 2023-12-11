import React from "react";
import './ClientHome.css'
import AppName from "../AppName";
import NavBar from "../NavBar/NavBar";

function ClientHome() {
    return (
        <section>
            <AppName/>
            <NavBar/>
            <table border="1">
                <caption>Список</caption>
                <tr>
                    <th>Имя</th> 
                    <th>Возраст</th>
                </tr>
                <tr>
                    <td>Алексей</td> 
                    <td>30 лет</td>
                </tr>
                <tr>
                    <td>Марта</td> 
                    <td>25 лет</td>
                </tr>
            </table>
        </section>
    );
}
export default ClientHome