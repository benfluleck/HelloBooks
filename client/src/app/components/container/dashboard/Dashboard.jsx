import React from 'react';
import {Row, Preloader, Button} from 'react-materialize';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// mport {Book} from '../../presentation/common/Book/DisplayBook.jsx';
import SideNav from '../../presentation/common/SideNav/index.jsx';
import {fetchAllBooksbyId} from '../../../actions/fetchbooks';
import DisplayAllBorrowedBooks from '../booklist/DisplayAllBorrowedBooks.jsx';
import DisplayAllBooks from  '../booklist/DisplayAllBooks.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

/**
 * Show User Dashboard
 * @class DashboardView
 * @extends React.Component
 */
class Dashoard extends React.Component{
	constructor(props) {
    super(props);
  }



/**
   * dispatch actions that help load Side Nav,
   * execute jquery function
   * @method componentWilReceiveProps
   * @memberof Dashboard
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    $(document).ready(function(){
      $('.button-collapse').sideNav({
        closeOnClick: true
      });


    });
  }
/**
   * render component
   * @method render
   * @returns {object} component
   */
render() {

    return (
    <div>
        <div className ='main-wrapper'>
        <SideNav
        imageLink={'http://res.cloudinary.com/digpnxufx/image/upload/v1510582526/boy_avatar_s1rb9m.svg'}
        username={this.props.username || ''}
        firstname={this.props.firstname || ''}
        email={this.props.email|| ''}
        />
        <div className= 'main-text'>

      <Tabs>
        <TabList>
          <Tab>DASHBOARD</Tab>
          <Tab>ALL BOOKS</Tab>
          <Tab>BOOKS OVERDUE</Tab>
          <Tab>LOAN HISTORY</Tab>
        </TabList>
        <Row>
          <TabPanel>
            <DisplayAllBorrowedBooks/>
          </TabPanel>

          <TabPanel>
            <DisplayAllBooks/>
          </TabPanel>
          <TabPanel>
            <p> These books are overdue </p>
          </TabPanel>
          <TabPanel>
            <p> THIS IS YOUR HISTORY</p>
          </TabPanel>
        </Row>
      </Tabs>

        <hr/>

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

export default connect (mapStateToProps)(Dashoard);
