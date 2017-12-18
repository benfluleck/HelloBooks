import React from 'react';
import { Row } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SideNav from '../presentation/common/SideNav/index.jsx';
import DisplayAllBorrowedBooks from
  '../container/booklist/DisplayBorrowedBooks.jsx';
import DisplayAllBooks from '../container/booklist/DisplayAllBooks.jsx';
import LoanHistoryTable from '../container/loanhistory/LoanHistory.jsx';
import DisplayOverdueBooks from '../container/booklist/DisplayOverdueBooks.jsx';
import getDashboardWrapper from '../container/Dashboard.jsx';
import DisplayBookModal from '../../components/presentation/common/book/DisplayBookModal.jsx';


/**
 * @description Show User Dashboard
 * @class DashboardView
 * @param {object} props
 *
 */
class UserDashboard extends React.PureComponent {
  /**
   *
   *
   *
   * @returns {Component} Userboard
   *
   * @memberOf UserDashboard
   */
  render() {
    return (
      <div>
        <div className="main-wrapper">
          <SideNav
            {...this.props}
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
        {/* <DisplayBookModal /> */}
      </div>
    );
  }
}


const ClientDashboard = getDashboardWrapper(UserDashboard);


export default ClientDashboard;
