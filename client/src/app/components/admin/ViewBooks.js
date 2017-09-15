import React from 'react'
import { NavLink } from 'react-router-dom'
import { Input,  Col, Table , Tab } from 'react-materialize'


/*
eslint-disable
 */
export class ViewBooks extends React.Component{
    render(){
        return( 
                <div>
                    <Table centered ={true}  responsive ={true}>
                        <thead>
                            <tr>
                                <th data-field="book_title">FirstName</th>
                                <th data-field="book_author">Surname</th>
                                <th data-field="category">Email</th>
                                <th data-field="description">User Level</th>
                                <th data-field="quantity">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>Fiction</td>
                                <td>bbbbbb</td>
                                <td>20</td>
                            </tr>
                            <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Bronze</td>
                            <td>15</td>
                            </tr>
                            <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Bronze</td>
                            <td>12</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

        );
    }
}