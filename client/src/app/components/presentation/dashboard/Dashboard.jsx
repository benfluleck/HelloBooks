import React from 'react';
import {Row, Preloader, Button} from 'react-materialize';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Book} from '../../presentation/common/Book/DisplayBook.jsx';
import SideNav from '../common/SideNav/index.jsx';
import fetchAllBooks from '../../../actions/fetchbooks';
import InlineNavigationBar from '../../presentation/common/InlineNavigationBar.jsx';

class Dashoard extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillReceiveProps(nextProps) {
    $(document).ready(function(){
      $('.button-collapse').sideNav({
        closeOnClick: true
      });

    });
  }
render() {
    const navLinks= ['dashboard' , 'all books', 'history']
    return (
    <div>
        <div className ='main-wrapper'>
        <SideNav
        imageLink={'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,w_400/v1510432964/generic-male-avatar_i935xq.png'}
        username={this.props.username || ''}
        firstname={this.props.firstname || ''}
        email={this.props.email|| ''}
        />
        <div className= 'main-text'>
        <Row>
        <InlineNavigationBar
        activeLink={this.props.activeLink}
        className="right"
        navLinks={navLinks}
        />
        </Row>
        <hr/>
        <Row>

            <p>Benny Ogidan</p>
        </Row>
          </div>


    </div>

</div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.user.data.username,
    firstname: state.userReducer.user.data.firstname,
    email: state.userReducer.user.data.email
  };
};

export default connect (mapStateToProps,{ fetchAllBooks})(Dashoard);
