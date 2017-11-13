import React from 'react';
import {Row, Preloader, Button} from 'react-materialize';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Book} from '../../presentation/common/Book/DisplayBook.jsx';
import SideNav from '../common/SideNav/index.jsx';
import {fetchAllBooksbyId} from '../../../actions/fetchbooks';
import InlineNavigationBar from '../../presentation/common/InlineNavigationBar.jsx';

/**
 * Show User Dashboard
 * @class DashboardView
 * @extends React.Component
 */
class Dashoard extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0
    };
  }

componentWillMount() {
  this
      .props
      .fetchAllBooksbyId(this.state.offset, this.state.limit)

}



/**
   * dispatch actions that help load Side Nav,
   * execute jquery function
   * @method componentWilReceiveProps
   * @memberof Dashboard
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    $(document).ready(function(){
      $('.button-collapse').sideNav({
        closeOnClick: true
      });

    });
  }
/**
   * render component
   * @method render
   * @returns {object} component
   */
render() {
console.log(this.props.books, '????')
  const getAllBooks = this
      .props
      .books
      .map((book) => {
        return (<Book
          key={book.book.id}
          title={book.book.title}
          author
          ={book.book.author}
          category={book.book.category}
          description={book.book.description}
          image={book.book.bookimage}/>);
      });

    const navLinks= ['dashboard' , 'all books', 'history']
    return (
    <div>
        <div className ='main-wrapper'>
        <SideNav
        imageLink={'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,w_400/v1510432964/generic-male-avatar_i935xq.png'}
        username={this.props.username || ''}
        firstname={this.props.firstname || ''}
        email={this.props.email|| ''}
        />
        <div className= 'main-text'>
        <Row>
        <InlineNavigationBar
        activeLink={this.props.activeLink}
        className="right"
        navLinks={navLinks}
        />
        </Row>
        <hr/>
        <Row>

        {[...getAllBooks]}
        </Row>
          </div>


    </div>

</div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.user.data.username,
    firstname: state.userReducer.user.data.firstname,
    books: state.bookReducer.borrowedbooks.books,
    email: state.userReducer.user.data.email
  };
};

export default connect (mapStateToProps,{ fetchAllBooksbyId })(Dashoard);
