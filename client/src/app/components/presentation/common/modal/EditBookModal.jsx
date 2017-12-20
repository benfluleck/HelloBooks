import React from 'react';
import { Modal, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bookDetailValidator } from '../../../../validators/validator';
import { updateBookDetails } from '../../../../actions/admin/books';
import BookDetailForm from './BookDetailForm.jsx';

/**
 *
 *
 * @class BookModal
 * @extends {React.Component}
 */
class EditBookModal extends React.Component {
  /**
   *
   * Creates an instance of AdminBookModal.
   * @param {any} props
   *
   * @memberOf AdminBookModal
   */
  constructor(props) {
    super(props);
    this.state = {
      book: {
        title: '',
        author: '',
        description: '',
        quantity: '',
        bookImage: '',
        imageName: '',
        categoryId: '',
        bookId: ''
      },
      errors: {
        title: '',
        author: '',
        description: '',
        quantity: '',
        bookImage: '',
        categoryId: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * [componentWillReceiveProps description]
   *
   * @method componentWillReceiveProps
   *
   * @param  {[type]}  nextProps [description]
   *
   * @return {[type]}  [description]
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.book && this.props.book !== nextProps.book) {
      // Necessary to populate form when existing book is loaded directly

      this.setState({
        title: nextProps.book.title,
        author: nextProps.book.author,
        description: nextProps.book.description,
        quantity: nextProps.book.quantity,
        imageName: '',
        categoryId: nextProps.book.categoryId,
        bookImage: nextProps.book.bookImage,
        bookId: nextProps.book.id
      });
    }
  }

  /**
   * @description Handle onChange events on form inputs
   *
   * @method onChange
   *
   * @memberof AdminBookModal
   *
   * @param {object} event
   *
   * @returns {function} a function that handles change event on inputs
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  /**
   * @description Handle submit events on the form inputs
   *
   * @method handleSubmit
   *
   * @memberof AdminBookModal
   *
   * @param {object} event
   *
   * @returns {function} a function that handles change event on inputs
   */
  handleSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.updateBookDetails(this.state.bookId, this.state);
    }
  }

  /**
   * Handle onChange events on form inputs
   *
   * @method isValid
   *
   * @memberof SignIn
   *
   * @returns {function} a validation function and
   * returns errors in string format
   */
  isValid() {
    const { errors, isValid } = bookDetailValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    } else {
      return isValid;
    }
  }
  /**
     * @returns {Image} This uploads the image to cloudinary
     *
     * @memberof AddBook
     */
  uploadWidget() {
    /* eslint-disable */
    cloudinary.openUploadWidget(
      {
        cloud_name: 'digpnxufx',
        upload_preset: 'yn0wpv0n',
        tags: ['books'],
        sources: ['local', 'url'],
        max_file_size: 1500000,
        max_image_width: 325,
        max_image_height: 499,
        multiple: false,
        cropping: "server",
        resource_type: "image"
      },
      (error, result) => {
        this.setState({
          bookImage: result[0].url,
          imageName: result[0].original_filename,
        });
      }
    );
  }
  /* eslint-enable */


  /**
   * @returns {Component} Component
   *
   * @memberOf BookModal
   */
  render() {
    const {
      header
    } = this.props;

    /**
   *
   *
   * @returns {Component} Component
   *
   * @memberOf BookModal
   *
   */
    return (
      <Modal
        id="admin-book-modal"
        fixedFooter
        header={header}
        actions={<Button onClick={this.handleSubmit}>Submit</Button>}

      >
        <BookDetailForm
          book={this.state}
          onChange={this.onChange}
          uploadWidget={this.uploadWidget}
          errors={this.state.errors}
        />
      </Modal>
    );
  }
}

EditBookModal.defaultProps = {
  header: 'Edit Book',
  book: null
};


EditBookModal.propTypes = {
  book: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  header: PropTypes.string,
  updateBookDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  book: (state.bookReducer.book) ? state.bookReducer.book.book : [],

});


export default connect(mapStateToProps, { updateBookDetails })(EditBookModal);
