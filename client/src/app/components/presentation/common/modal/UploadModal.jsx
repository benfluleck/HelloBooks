import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {imageUploadToCloud, imageUploadToDb} from '../../../../actions/uploadImage';
import ShowProgressBar from '../Preloader/ShowProgressBar.jsx'

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
    this.state = {
      username: '',
      isLoading: false
      


    };
    this.triggerFileSelect = this
      .triggerFileSelect
      .bind(this);
    this.onInputChange = this
      .onInputChange
      .bind(this);
      this.onClick = this
      .onClick
      .bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.username && nextProps.username !== ''){
      this.setState({username: nextProps.username})
    }
  }
  /**
   * handle change in file input
   * @method onInputChange
   * @memberof UploadPictureModal
   * @param {object} event
   * @return {void}
   */
  onInputChange(event) {
    event.preventDefault();
    this.setState({isLoading: true});
    // let reader = new FileReader();
    const profilePic = event.target.files[0];

    const fileExt = UploadModal.getFileExtension(event.target.files[0].name);
    const filename = `${this.props.username}.${fileExt}` || event.target.files[0].name;

  
    this
      .props
      .imageUploadToCloud(this.props.username, profilePic)
      .then((response)=>{
        this.setState({isLoading: false})
          console.log('this should happen', response)
          this.setState({filename});
          
      }

      )
      
  }



  onClick(event){
    event.preventDefault();
    this.setState({isLoading: true});
    if(this.state.filename)
      {
        console.log('I am here', this.props.secure_url)
        // imageUploadToDb
      }

  }


  static getFileExtension(filename) {
    return filename
      .split('.')
      .pop();
  }
  /**
   * trigger file selection
   * @method triggerFileSelect
   * @memberof UploadPictureModal
   * @return {void}
   */
  triggerFileSelect() {
    this
      .fileinput
      .click();
  }
  /**
   * set content of modal
   * @method setContentAndFooter
   * @memberof UploadPictureModal
   * @return {void}
   */
  render() {
   
    return (
      <div id="user1" className="modal ">
        <div className="modal-content">{this.state.content}
          <div className="modal-header">
            <h4>Change profile picture</h4>
          </div>
          <div className="modal-innercontent">
            <i className="fa fa-picture-o"/>
            {!this.props.image && 
            <span>
            {this.state.username}
            </span>
           }
            <a
              className="btn-floating btn-large waves-effect waves-light #ef6c00 orange darken-3 upload"
              onClick={this.triggerFileSelect}
              role="button"
              tabIndex="0"><i className="fa fa-folder-open-o"/>

              <input
                type="file"
                ref={(fileinput) => {
                this.fileinput = fileinput;
              }}
                id="upload-input"
                onChange={this.onInputChange}
                className="hidden"/>
            </a>
            {/* <Row>
            <div className="pre-loader">
            <Col l={4} s={4} m={4}>
              {this.state.isLoading && <ProgressBar/>
              && <div> Loading....</div>}
              </Col>
             
            </div>
            </Row> */}
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
            onClick={
              this.onClick
            }
              href="#!"
              className="modal-action modal-close waves-effect waves-green btn-flat">Upload<i className="material-icons right">send</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

UploadModal.propTypes = {
  updateProfilePicture: PropTypes.func,
  image: PropTypes.string,
  username: PropTypes.string.isRequired
};
UploadModal.defaultProps = {
  image: null
};

const mapStateToProps = state => {
  return {
    // image: state.userReducer.user.data.userimage,
    username: (state.userReducer.user.data)
      ? state.userReducer.user.data.username
      : '',
    secure_url: state.imageReducer.url
  }
};

export default connect(mapStateToProps, {imageUploadToCloud})(UploadModal);
