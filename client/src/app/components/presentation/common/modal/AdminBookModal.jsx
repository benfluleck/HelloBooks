import React from 'react';
import { Modal, Row, Input, Icon } from 'react-materialize';

/**
 *
 *
 * @class BookModal
 * @extends {React.Component}
 */
class AdminBookModal extends React.Component {
  constructor(props) {
    super(props);
  }
  /**
   *
   *
   * @returns {Component} Component
   *
   * @memberOf BookModal
   */
  render() {
    const {
      header, actions, props, books
    } = this.props;

    /**
   *
   *
   * @returns {Component} Component
   *
   * @memberOf BookModal
   */
    return (
      <Modal id="modal" fixedFooter header={header} actions={actions} >
        <Row>
          <Input
            s={6}
            label="Book Title"
            required
            value={this.state.booktitle}
            name="booktitle"
            onChange={this.onChange}
            error={this.state.errors.booktitle}
          >
            <Icon>book</Icon>
          </Input>
          <Input
            s={6}
            label="Book Author"
            required
            value={this.state.bookAuthor}
            name="bookTitle"
            onChange={this.onChange}
            error={this.state.errors.bookAuthor}
          />
          <Input
            s={6}
            label="Book Description"
            required
            value={this.state.bookDescription}
            name="bookDescription"
            onChange={this.onChange}
            error={this.state.errors.bookDescription}
          />
          <div>
            <h6>Image (Book Cover)</h6>
            <div>
              {this.state.imageName}
            </div>
            <div className="upload" id="filename">
              <button onClick={this.uploadWidget.bind(this)} className="btn btn-primary btn-sm upload-button">

                {this.state.bookImage === '' && <span>Add BookCover</span>}

                {this.state.bookImage !== '' && <span>Change Book</span>}
              </button>
            </div>

            {errors.bookImage && <span className="help-text">{errors.bookImage}</span> }
          </div>


        </Row>
      </Modal>

    );
  }
}
export default AdminBookModal;
