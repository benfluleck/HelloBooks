import React from 'react';
import { Row, Input, Icon } from 'react-materialize';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import CategoriesOptionList from '../../../container/categories/CategoriesOptionsList.jsx';
// import { bookDetailValidator } from '../../../../validators/validator';
// import { updateBookDetails } from '../../../../actions/admin/books';

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
   * @returns
   * @memberof BookDetailsForm

   *
   *
   * @returns
   *
   * @memberOf BookDetailsForm
   */
  render() {
    const {
      title, author, quantity, description, bookImage, imageName
    } = this.props.book;
 
    const { errors } = this.props;
    const onChange = this.props.onChange;

    return (
      <Row>
        <div className="bookform">
          <Input
            s={6}
            label="Book Title"
            required
            defaultValue={title}
            name="title"
            onChange={onChange}
            error={errors.title}
          >
            <Icon>book</Icon>
          </Input>
          <Input
            s={6}
            label="Book Author"
            required
            defaultValue={author}
            name="author"
            onChange={onChange}
            error={errors.author}
          >
            <Icon>face</Icon>
          </Input>

          <Input
            s={6}
            label="Book Quantity"
            required
            defaultValue={quantity}
            name="quantity"
            onChange={onChange}
            error={errors.quantity}
          >
            <Icon>collections</Icon>
          </Input>
          <Row>
            <CategoriesOptionList onChange={onChange} />
          </Row>
          <Input
            s={12}
            label="Book Description"
            required
            type="textarea"
            defaultValue={description}
            name="description"
            onChange={onChange}
            error={errors.description}
          >
            <Icon>view_headline</Icon>
          </Input>
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
                onClick={this.props.uploadWidget}
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


export default BookDetailForm;
