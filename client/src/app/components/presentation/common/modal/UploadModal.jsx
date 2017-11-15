import React from 'react';
import PropTypes from 'prop-types';

/**
 * display modal with a file input field and a submit button
 * @class UploadPictureModal
 * @extends CommonModal
 */
class UploadModal extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.triggerFileSelect = this.triggerFileSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  /**
   * handle change in file input
   * @method onInputChange
   * @memberof UploadPictureModal
   * @param {object} event
   * @return {void}
   */
  onInputChange(event) {
    const filename = event.target.files[0].name;
    this.setState({ filename });
  }
  /**
   * trigger file selection
   * @method triggerFileSelect
   * @memberof UploadPictureModal
   * @return {void}
   */
  triggerFileSelect() {
    this.fileinput.click();
  }
  /**
   * set content of modal
   * @method setContentAndFooter
   * @memberof UploadPictureModal
   * @return {void}
   */
  render() {
    console.log(this.props, '????????' )
    return (

      <div id="user1" className="modal modal-fixed-footer">
        <div className="modal-content">{this.state.content}
          <h4>Change profile picture</h4> <i
            className="fa fa-picture-o"
          />
          <img
            className="current-profile-photo responsive-img"
            src={this.props.image}
            alt={this.props.username}
          />
          <a
            className="btn-floating btn-large waves-effect waves-light teal upload"
            onClick={this.triggerFileSelect}
            role="button"
            tabIndex="0"
          ><i className="fa fa-folder-open-o" />
          </a>
          <input
            type="file"
            ref={(fileinput) => { this.fileinput = fileinput; }}
            id="upload-input"
            onChange={this.onInputChange}
            className="hidden"
          />
        </div>
        <div className="modal-footer">{this.state.footer}
          {
            (this.state.filename) ?
            (
              <div>
                <span className="selected-file-intro">Selected File |</span>
                <span className="fileName">{this.state.filename}</span>
              </div>
            ) : null
          }
          <a
            href="#!"
            className="modal-action modal-close waves-effect waves-green btn-flat"

          >Upload<i className="material-icons right">send</i></a>
        </div>
      </div>
    );
  }
}

UploadModal.propTypes = {
  updateProfilePicture: PropTypes.func,
  image: PropTypes.string,
  username: PropTypes.string
};
// UploadModal.defaultProps = {
//   image: null,
//   username: null
// };
export default UploadModal;
