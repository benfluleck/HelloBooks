import React from 'react';
import { Row } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SideNav from '../presentation/common/SideNav/index.jsx';
import DisplayAllBorrowedBooks from '../container/booklist/DisplayBorrowedBooks.jsx';
import DisplayAllBooks from '../container/booklist/DisplayAllBooks.jsx';
import LoanHistoryTable from '../container/loanhistory/LoanHistory.jsx';
import MessageforNoOverdueBooks from '../presentation/messages/dashboardMessages/MessageforNoOverdueBooks.jsx';
import DisplayOverdueBooks from '../container/booklist/DisplayOverdueBooks.jsx';

/**
 * @description Show User Dashboard
 * @class DashboardView
 * @param {object} props
 */
const Dashoard = props =>
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
            <TabList>
              <Tab>DASHBOARD</Tab>
              <Tab>ALL BOOKS</Tab>
              <Tab>BOOKS OVERDUE</Tab>
              <Tab>LOAN HISTORY</Tab>
            </TabList>
            <Row>
              <TabPanel>
                <DisplayAllBorrowedBooks />
              </TabPanel>
              <TabPanel>
                <DisplayAllBooks />
              </TabPanel>
              <TabPanel>
                <DisplayOverdueBooks/>
              </TabPanel>
              <TabPanel>
                  <LoanHistoryTable/>
              </TabPanel>
            </Row>
          </Tabs>
          <hr />
        </div>
      </div>
    </div>
  );

export default Dashoard;
