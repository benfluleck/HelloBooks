import React from 'react';
import { Row } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import SideNav from '../presentation/common/SideNav/index.jsx';
import DisplayAllBorrowedBooks from '../container/booklist/DisplayBorrowedBooks.jsx';
import DisplayAllBooks from '../container/booklist/DisplayAllBooks.jsx';
import LoanHistoryTable from '../container/loanhistory/LoanHistory.jsx';
import DisplayOverdueBooks from '../container/booklist/DisplayOverdueBooks.jsx';


/**
 * @description Show User Dashboard
 * @class DashboardView
 * @param {object} props
 */
const Dashboard = props =>
  (
    <div>
      <div className="main-wrapper">
        <SideNav
          imageLink={props.profilePic || ''}
          username={props.username || ''}
          firstname={props.firstname || ''}
          email={props.email || ''}
        />
        <div className="main-text">
          <Tabs>
            <Row>
              <TabList>
                <Tab>ALL BOOKS</Tab>
                <Tab>DASHBOARD</Tab>
                <Tab>BOOKS OVERDUE</Tab>
                <Tab>LOAN HISTORY</Tab>
              </TabList>
            </Row>
            <Row>
              <TabPanel>
                <DisplayAllBooks />
              </TabPanel>
              <TabPanel>
                <DisplayAllBorrowedBooks />
              </TabPanel>
              <TabPanel>
                <DisplayOverdueBooks />
              </TabPanel>
              <TabPanel>
                <LoanHistoryTable />
              </TabPanel>
            </Row>
          </Tabs>
          <hr />
        </div>
      </div>
    </div>
  );

Dashboard.propTypes = {
  firstname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
};


export default Dashboard;
