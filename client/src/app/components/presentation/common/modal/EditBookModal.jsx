import React from 'react';
import { Modal, Row, Input, Icon, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoriesOptionList from '../../../container/categories/CategoriesOptionsList.jsx';
import { bookDetail } from '../../../../validators/validator';
import { updateBookDetails } from '../../../../actions/admin/books';

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
    const {
      title = '',
      author = '',
      description = '',
      quantity = '',
      bookImage = '',
      categoryId = ''
    } = this.props.book;
    this.state = {
      title,
      author,
      description,
      quantity,
      bookImage,
      imageName: '',
      categoryId,
      bookId: this.props.book.id,
      errors: {}

    };
    this.onChange = this.onChange.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * [componentWillReceiveProps description]
   * @method componentWillReceiveProps
   * @param  {[type]}  nextProps [description]
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
        categoryId: '',
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
    const { errors, isValid } = bookDetail(this.state);
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
        multiple: false

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
        <Row>
          <div className="bookform">
            <Input
              s={6}
              label="Book Title"
              required
              value={this.state.title}
              name="title"
              onChange={this.onChange}
              error={this.state.errors.title}
            >
              <Icon>book</Icon>
            </Input>
            <Input
              s={6}
              label="Book Author"
              required
              value={this.state.author}
              name="author"
              onChange={this.onChange}
              error={this.state.errors.author}
            >
              <Icon>face</Icon>
            </Input>

            <Input
              s={6}
              label="Book Quantity"
              required
              value={this.state.quantity}
              name="quantity"
              onChange={this.onChange}
              error={this.state.errors.quantity}
            >
              <Icon>collections</Icon>
            </Input>
            <Row>
              <CategoriesOptionList onChange={this.onChange} />
            </Row>
            <Input
              s={12}
              label="Book Description"
              required
              type="textarea"
              value={this.state.description}
              name="description"
              onChange={this.onChange}
              error={this.state.errors.description}
            >
              <Icon>view_headline</Icon>
            </Input>
            <h6>Image (Book Cover)</h6>
            <p> If this is blank, no worries a default cover will be selected</p>
            <Row>
              {this.state.imageName}
              <img
                src={this.state.bookImage}
                value={this.state.bookImage}
                name="image"
                alt={this.state.title}
              />
            </Row>
            <Row>
              <div className="upload" id="filename">
                <button
                  onClick={this.uploadWidget}
                  className="btn btn-primary btn-sm upload-button"
                >
                  {this.state.imageName === '' && <span>Add BookCover</span>}

                  {this.state.imageName !== '' && <span>Change Book Cover</span>}
                </button>
              </div>
              {this.state.errors.bookImage &&
              <span className="help-text">{this.state.errors.bookImage}</span> }
            </Row>
          </div>
        </Row>
      </Modal>
    );
  }
}

EditBookModal.defaultProps = {
  header: 'Edit Book'
};


EditBookModal.propTypes = {
  // book: PropTypes.shape(PropTypes.arrayOf({
  //   title: PropTypes.string,
  //   author: PropTypes.string,
  //   quantity: PropTypes.string,
  //   description: PropTypes.string,
  // })).isRequired,
  header: PropTypes.string,
  updateBookDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  book: (state.bookReducer.book) ? state.bookReducer.book.book : [],

});


export default connect(mapStateToProps, { updateBookDetails })(EditBookModal);
