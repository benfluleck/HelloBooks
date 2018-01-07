import React from 'react';
import { Modal, Row, Col } from 'react-materialize';
import PropTypes from 'prop-types';

/**
 *
 * @description base book modal used to display book data
 *
 * @class BookModal
 *
 * @extends {React.Component}
 */
class BaseBookModal extends React.PureComponent {
  /**
   *
   * @returns {Component} Component
   *
   * @memberOf BookModal
   */
  render() {
    const { header, actions, books } = this.props;
    return (
      <Modal
        id="book-modal"
        fixedFooter
        header={header}
        actions={actions}
        modalOptions={{ dismissible: true, inDuration: 30 }}
      >
        <Row>
          <div className="loan-book">
            <Col m={12}l={6}>
              <div className="card-image" >
                <img
                  className="modal-image"
                  src={books.bookImage}
                  alt="Title"
                />
              </div>
            </Col>
            <Col m={12} l={6}>
              <div className="book-modal modal-title">
                Book Number: # {books.id}
              </div>
              <div className="book-modal modal-title">
                Title: {books.title}
              </div>
              <hr />
              <div className="book-modal">
                Author: {books.author}
              </div>
              <div className="book-modal">
                Description: {books.description}
              </div>
            </Col>
          </div>
          {this.props.children}
        </Row>
      </Modal>
    );
  }
}


BaseBookModal.propTypes = {
  children: PropTypes.element,
  header: PropTypes.string,
  actions: PropTypes.element
};


export default BaseBookModal;

