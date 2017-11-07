import React from 'react';
import {Row, Preloader} from 'react-materialize';
import PropTypes from 'prop-types';
import {Book} from '../presentation/common/Book/DisplayBook.jsx';

/**
 * @description Component for Welcome Page for all users
 * @class Landing Page
 * @extends {Component}
 */
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0
    };
  }
  componentDidMount() {
    this
      .props
      .fetchBooksforDashboard(this.state.offset, this.state.limit)
  }

  /**
   * render Landing page component
   * @method render
   * @member LandingPage
   * @returns {object} component
   */
  render() {
    if (!this.props.books) {
      return <Preloader size='big' className="center-align"/>
    }

    const getAllBooks = this
      .props
      .books
      .map((book) => {
        return (<Book
          key={book.id}
          title={book.title}
          author
          ={book.author}
          category={book.category}
          description={book.description}
          image={book.bookimage}/>);
      });
    return (

      <div>
        <div className='header-wrapper'>
          <Row>
            <div className='header-text'>
              <h1>
                Welcome!.</h1>
              <h1>to Hello Books</h1>
            </div>
          </Row>
        </div>
        <Row>

          <div className='body-wrapper'>
            <div className='overlay-main'>
              <Row>
                <div className='overlay'>
                  <h3>Latest Books Available:
                  </h3>
                  <hr/>
                  <h5>
                    To Borrow any Books, Please
                    <a href='/login'> Login</a>
                  </h5>

                  <p>Click a book for a look at the description</p>

                  {[...getAllBooks]}

                </div>
              </Row>
            </div>
          </div>
        </Row>
      </div>

    );
  }
}

export default LandingPage;
