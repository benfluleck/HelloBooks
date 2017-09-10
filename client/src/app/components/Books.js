import React from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, NavItem, Col,Row, Card, Tab, Tabs, CardTitle, Button, Modal} from 'react-materialize'
import  book1 from '../img/book1.jpg'
import book2 from '../img/book2.jpg'

export class Books extends React.Component{
    render(){
        return(
            <div className='books'>
                <h2>Books</h2>
                
                <Tabs className='books-tab z-depth-1 transparent'>
                <Tab title="All Books" active>
                <Row>
                    <Col  m={8} l={8}>
                    <Card className ='transparent' horizontal header={<CardTitle image={book1}></CardTitle>} actions={[<a href='#'>More Information</a>]}>
                            <p>Title: Marvel Secret Empire</p>
                            <p>Category: Fiction</p>
                            <p>Author: Benny Ogidan</p>
                            <p >Quantity : 20</p>
                            <Modal header='Marvel Secret Empire' fixedFooter
                            trigger={<Button>Loan</Button>} actions={[<a href='#'>Loan Book &nbsp;</a>]}>
                            <p>Description: orem ipLsum dolor sit amet, consectetur adipiscing elit,
                                 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                                 ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
                                 ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                                 esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        </Modal>
                    </Card>
                    </Col>

                </Row>
                </Tab>
                <Tab title="Books On Loan">
                <Col m={8} l={8}>
                    <Card className ='transparent' horizontal header={<CardTitle image={book2}></CardTitle>} actions={[<a href='#'>More Information</a>]}>
                            <p>Title: Marvel Secret Empire2</p>
                            <p>Category: Horror</p>
                            <p>Author: Benny Ogidan</p>
                            <p >Quantity : 10</p>
                            <Modal header='Marvel Secret Empire 2' fixedFooter
                            trigger={<Button>Loan</Button>} actions={[<a href='#'>Loan Book &nbsp;</a>]}>
                            <p>Description: orem ipLsum dolor sit amet, consectetur adipiscing elit,
                                 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                                 ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
                                 ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                                 esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        </Modal>
                    </Card>
                    </Col>
                    </Tab>
                <Tab title="Books To Return">
                <Row>
                    <Col m={8} l={8}>
                    <Card className ='transparent' horizontal header={<CardTitle image={book1}></CardTitle>} actions={[<a href='#'>More Information</a>]}>
                            <p>Title: Marvel Secret Empire</p>
                            <p>Category: Fiction</p>
                            <p>Author: Benny Ogidan</p>
                            <p >Quantity : 20</p>
                            <Modal header='Marvel Secret Empire' fixedFooter
                            trigger={<Button>Loan</Button>} actions={[<a href='#'>Loan Book &nbsp;</a>]}>
                            <p>Description: orem ipLsum dolor sit amet, consectetur adipiscing elit,
                                 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                                 ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
                                 ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                                 esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                  
                            </Modal>
                    </Card>
                    </Col>

                </Row>
                    </Tab>
                <Tab title="My Books">
                <Col m={8} l={8}>
                    <Card className ='transparent' horizontal header={<CardTitle image={book2}></CardTitle>} actions={[<a href='#'>More Information</a>]}>
                            <p>Title: Marvel Secret Empire2</p>
                            <p>Category: Horror</p>
                            <p>Author: Benny Ogidan</p>
                            <p >Quantity : 10</p>
                            <Modal header='Marvel Secret Empire 2' fixedFooter
                            trigger={<Button>Loan</Button>} actions={[<a href='#'>Loan Book &nbsp;</a>]}>
                            <p>Description: orem ipLsum dolor sit amet, consectetur adipiscing elit,
                                 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                                 ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
                                 ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                                 esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                  <hr/>
                        </Modal>
                    </Card>
                    </Col>
                    </Tab>
                </Tabs>     
                
                 
                 
            </div>

        )
    };
}