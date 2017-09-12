import React from 'react'
import css from '../css/style.scss'
import {Input, Col,Row,Icon, Button,Tabs, Tab, Table} from 'react-materialize'

export class Profile extends React.Component{

    render(){
        return(
                <div className='profile-con'>
                    <h4> Guest Name</h4>
                <Row>
                <Tabs className='tab-demo z-depth-1 transparent '>
                <Tab title="Profile" active>
                <Col s={12} m={4} l={4} className='center profpic'>
                    <div className ='profile'/>
                    
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file"></input>
                        </div>
                        <br/>
                        <br/>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"></input>
                        </div>
                    </div>
                </Col>
                <Col s={12} m={8} l={8}>
                <form>
                    <Input s={12} disabled label="First Name"  ><Icon>contactss</Icon></Input>
                    <Input s={12} disabled label="Surnmame" ><Icon>contacts</Icon></Input>        
                    <Input s={12} disabled label="Username"  ><Icon>account_circle</Icon></Input>
                    <Input s={12} label="Email"  ><Icon>mail</Icon></Input>
                    <Input  type="password" label="Old Password" s={12} ><Icon>lock</Icon></Input>
                    <Input  type="password" label="New Password" s={12} ><Icon>lock</Icon></Input>
                    <Input placeholder="Confirm New Password" type="password" label="Confirm Password" s={12} ><Icon>lock</Icon></Input>
                                   
                    <Col s={12} className="center">
                        <Button waves='light'>Submit</Button>
                    </Col>
                </form>
                </Col>
                </Tab>
                <Tab title="Website Activity">
                <Row>
                    
                    <Col l={12}>
                    <Table centered ={true}  responsive ={true}>
                        <thead>
                            <tr>
                                <th data-field="id">Name</th>
                                <th data-field="name">Item Name</th>
                                <th data-field="price">Item Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Alvin</td>
                                <td>Eclair</td>
                                <td>$0.87</td>
                            </tr>
                            <tr>
                                <td>Alan</td>
                                <td>Jellybean</td>
                                <td>$3.76</td>
                            </tr>
                            <tr>
                                <td>Jonathan</td>
                                <td>Lollipop</td>
                                <td>$7.00</td>
                            </tr>
                        </tbody>
                    </Table>
                    </Col>
                </Row>


                </Tab>
                
                </Tabs>
                </Row>
                
                
                </div>

                
                       
        );
    }

    };