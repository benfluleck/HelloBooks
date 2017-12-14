import React from 'react';
import { Row } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SideNav from '../common/SideNav/index.jsx';
import DisplayAllBooks from '../../container/booklist/DisplayAllBooks.jsx';
import getDashboardWrapper from '../../container/Dashboard.jsx';
import CategoryAdminTab from '../../container/categories/CategoriesAdminTab.jsx';
import UserList from '../../container/userlists/container/UserList.jsx';

/**
 *
 *
 * @class AdminDashboard
 * @extends {React.PureComponent}
 */
class AdminDashboard extends React.PureComponent {
  /**
   *
   *
   * @returns {Component} Component
   *
   * @memberOf AdminDashboard
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
                  <Tab>USERS</Tab>
                  <Tab>CATEGORIES</Tab>
                  <Tab>NOTIFICATIONS</Tab>
                </TabList>
              </Row>
              <Row>
                <TabPanel>
                  <DisplayAllBooks />
                </TabPanel>
                <TabPanel>
                  <UserList />
                </TabPanel>
                <TabPanel>
                  <CategoryAdminTab />
                </TabPanel>
                <TabPanel>
                  <p>Something light</p>
                </TabPanel>
              </Row>
            </Tabs>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}


const AdministratorDashboard = getDashboardWrapper(AdminDashboard);


export default AdministratorDashboard;
