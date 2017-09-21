import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    Navbar,
    NavItem,
    Col,
    Row,
    Card,
    Tab,
    Tabs,
    CardTitle,
    Button,
    Modal
} from 'react-materialize';
import book1 from '../img/book1.jpg';
import book2 from '../img/book2.jpg';
import {connect} from 'react-redux'

import {fetchAllBooks} from '../actions/fetchbooks'
import {Book} from './Book';

import BOOKS from '../containers/staticBooks';

/*
eslint-disable
 */

class Books extends React.Component {
    componentDidMount(fetchAllBooks) {
        this
            .props
            .fetchAllBooks();

    }

    render() {
        const returnedBooks = BOOKS.map((book) => {
            return (<Book
                key={book.id}
                title={book.title}
                author
                ={book.author}
                category={book.category}
                quantity={book.quantity}
                description={book.description}/>);
        })
        console.log(this.props.books)
        return (
            <div className='books'>
                <h4>Books</h4>

                {/* <Tabs className='books-tab z-depth-1 transparent'>
                    <Tab title="All Books" active>
                        {[...returnedBooks]}
                    </Tab>
                    <Tab title="Books On Loan">
                        {[...returnedBooks]}
                    </Tab>
                    <Tab title="Books To Return">
                        {[...returnedBooks]}
                    </Tab>
                    <Tab title="My Books">
                        {[...returnedBooks]}
                    </Tab>
                </Tabs> */}

            </div>

        )
    };
}

const mapStateToProps = (state) => {
    return {prop: state.books}
}

export default connect(mapStateToProps, {fetchAllBooks}) (Books);
