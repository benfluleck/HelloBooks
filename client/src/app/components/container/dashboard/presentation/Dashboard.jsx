import React from 'react';
import { Row } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SideNav from '../../../presentation/common/SideNav/index.jsx';
import DisplayAllBorrowedBooks from '../../booklist/DisplayAllBorrowedBooks.jsx';
import DisplayAllBooks from '../../booklist/DisplayAllBooks.jsx';
// import UploadModal from '../../../presentation/common/modal/UploadModal.jsx';
//import UploadModal from '../components/presentation/common/modal/UploadModal.jsx';
// import BookCoverUpload from './presentation/common/modal/BookCoverUpload.jsx';

/**
 * Show User Dashboard
 * @class DashboardView
 * @param {object} props
 */
const Dashoard = props =>
  (
    <div>
      <div className="main-wrapper">
        <SideNav
          imageLink="http://res.cloudinary.com/digpnxufx/image/upload/v1510582526/boy_avatar_s1rb9m.svg"
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
                <p>
                These books are overdue
                </p>
              </TabPanel>
              <TabPanel>
                <p>
                THIS IS YOUR HISTORY
                </p>
              </TabPanel>
            </Row>
          </Tabs>
          <hr />
        </div>
      </div>
    </div>
  );

export default Dashoard;
