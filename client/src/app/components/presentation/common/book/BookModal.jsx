import React from 'react';
import { Modal, Row, Col } from 'react-materialize';

/**
 *
 *
 * @class BookModal
 * @extends {React.Component}
 */
class BookModal extends React.Component {
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
    const { header, actions } = this.props;
    return (
      <Modal id="modal" fixedFooter header={header} actions={actions} >
        <Row>
          <div className="loan-book">
            <Col m={12}l={6}>
              <div className="card-image" >
                <img className="modal-image" id="bookImage" alt="Title" />
              </div>
            </Col>
            <Col m={12} l={6}>
              <div className="book-modal modal-title">Book Number: #<span id="bookId" /></div>
              <div className="book-modal modal-title">Title: <span id="bookTitle" /></div>
              <hr />
              <div className="book-modal">Author: <span id="bookAuthor" /></div>
              <div className="book-modal">Description: <span id="bookDescription" /></div>
            </Col>
          </div>
          {this.props.children}
        </Row>
      </Modal>
    );
  }
}

export default BookModal;
