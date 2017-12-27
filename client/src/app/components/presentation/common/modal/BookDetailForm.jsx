import React from 'react';
import { Row, Col } from 'react-materialize';
import PropTypes from 'prop-types';
import
CategoriesOptionList from
  '../../../container/categories/CategoriesOptionsList.jsx';
import TextInput from './form/TextInput.jsx';

/**
 *
 *
 * @class BookDetailsForm
 * @extends {React.Component}

 *
 *
 * @class BookDetailsForm
 * @extends {React.Component}
* */
class BookDetailForm extends React.PureComponent {
  /**
   *
   *
   * @returns {Component} Bookdetails
   *
   * @memberof BookDetailsForm
   */
  render() {
    const {
      title, author, quantity, description, bookImage, imageName, categoryId
    } = this.props.book;

    const { errors } = this.props;
    const onChange = this.props.onChange;
    const onClick = this.props.uploadWidget;
    return (
      <Row>

        <div className="bookform">
          <Row>
            <Col l={6}>
              <TextInput
                name="title"
                value={title}
                label="Title"
                type="text"
                onChange={onChange}
                errors={errors.title}
                prefix="book"
              />
            </Col>
            <Col l={6}>
              <TextInput
                type="text"
                name="author"
                value={author}
                onChange={onChange}
                errors={errors.author}
                label="Author"
                prefix="face"
              />
            </Col>
          </Row>
          <Row>
            <Col l={6} m={3} s={6}>
              <TextInput
                name="quantity"
                type="text"
                value={quantity}
                onChange={onChange}
                errors={errors.quantity}
                label="Quantity"
                prefix="collections"
              />
            </Col>
            <Col l={6} m={9} s={12}>
              <CategoriesOptionList
                categoryId={categoryId}
                onChange={onChange}
              />
            </Col>
          </Row>
          <TextInput
            type="textarea"
            name="description"
            value={description}
            onChange={onChange}
            errors={errors.description}
            label="Description"
            prefix="view_headline"
          />
          <h6>Image (Book Cover)</h6>
          <p> If this is blank, no worries a default cover will be selected</p>
          <Row>
            {imageName}
            <img
              src={bookImage}
              defaultValue={bookImage}
              name="image"
              alt={title}
            />
          </Row>
          <Row>
            <div className="upload" id="filename">
              <button
                onClick={onClick}
                className="btn btn-primary btn-sm upload-button"
              >
                {imageName === '' && <span>Add BookCover</span>}

                {imageName !== '' && <span>Change Book Cover</span>}
              </button>
            </div>
            {errors.bookImage &&
            <span className="help-text">{errors.bookImage}</span> }
          </Row>
        </div>
      </Row>
    );
  }
}

BookDetailForm.propTypes = {
  book: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  onChange: PropTypes.func.isRequired,
  uploadWidget: PropTypes.func

};

BookDetailForm.defaultProps = {
  book: [],
  errors: {},
  uploadWidget: null
};

export default BookDetailForm;
