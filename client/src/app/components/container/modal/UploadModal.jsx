import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import UploadModal from '../../../components/presentation/common/modal/UploadModal.jsx';
// import { updateProfilePicture } from '../../actions/actionCreators/UserActions';
// { updateProfilePicture })


const mapStateToProps = state =>
  ({
    // image: state.userReducer.user.data.userimage,
   // username: state.userReducer.user.data.username
  });

export default connect(mapStateToProps)(UploadModal);

