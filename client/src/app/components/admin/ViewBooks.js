import React from 'react'
import {NavLink} from 'react-router-dom'
import {Input,  Col, Table , Tab} from 'react-materialize'

export class ViewBooks extends React.Component{
    render(){
        return( 
                <div>
                    <Table centered ={true}  responsive ={true}>
                        <thead>
                            <tr>
                                <th data-field="book_title">Book Title</th>
                                <th data-field="book_author">Book Author</th>
                                <th data-field="category">Category</th>
                                <th data-field="description">Description</th>
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
                            </tr>
                            <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Bronze</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

        );
    }
}