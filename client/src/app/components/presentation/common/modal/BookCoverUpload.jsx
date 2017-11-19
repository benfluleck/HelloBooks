import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ShowProgressBar from '../Preloader/ShowProgressBar.jsx'
import Book from '../book/DisplayBook.jsx'


/**
 * display modal with a file input field and a submit button
 * @class UploadPictureModal
 * @extends BookCoverUpload
 */
class BookCoverUpload extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      title: '',
      quantity:'',
      author:'',
      categorty:'', 
      description:''
    };
    
  }


  /**
   * set content of modal
   * @method setContentAndFooter
   * @memberof UploadPictureModal
   * @return {void}
   */
  render() {

    return (
      <div id="bookmodal" className="modal ">
        <div className="modal-content">{this.state.content}
          <div className="modal-header">
            <h4>Book</h4>
          </div>
          <div className="modal-innercontent">
            
            
            
          <div className="card-image">
          {/* <img src={props.books.image}
            alt={props.books.title}
          /> */}
  
        </div>
            <div className="pre-loader">
              {this.state.isLoading && <ShowProgressBar/>}
            </div>

          </div>
          <div className="modal-footer">{this.state.footer} {(this.state.filename)
              ? (
                <div>
                  <span className="selected-file-intro">Selected File :
                  </span>
                  <span className="fileName">{this.state.filename}</span>
                </div>
              )
              : null
}
            <a
              onClick={this.onClick}
              href="#!"
              className="modal-action modal-close waves-effect waves-green btn-flat">Loan<i className="material-icons right">send</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

BookCoverUpload.propTypes = {
  image: PropTypes.string,
  username: PropTypes.string
};
BookCoverUpload.defaultProps = {
  image: null,
  username: null
};


export default BookCoverUpload;
