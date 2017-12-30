import React from 'react';
import { Row } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SideNav from '../common/SideNav/index.jsx';
import DisplayAllBooks from '../../container/booklist/DisplayAllBooks.jsx';
import GetDashboardWrapper from '../../container/common/Dashboard.jsx';
import
CategoryAdminTab from '../../container/categories/CategoriesAdminTab.jsx';
import UserListTab from '../../container/userlists/container/UserListTab.jsx';
import NotificationTab from '../../container/notification/NotificationTab.jsx';
/**
 *
 * @class AdminDashboard
 *
 * @extends {React.PureComponent}
 */
class AdminDashboard extends React.PureComponent {
  /**
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
                  <UserListTab />
                </TabPanel>
                <TabPanel>
                  <CategoryAdminTab />
                </TabPanel>
                <TabPanel>
                  <NotificationTab />
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


const AdministratorDashboard = GetDashboardWrapper(AdminDashboard);


export default AdministratorDashboard;
