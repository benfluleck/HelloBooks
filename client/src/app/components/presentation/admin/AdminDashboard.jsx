import React from 'react';
import { Row } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SideNav from '../common/SideNav/index';
import DisplayAllBooks from '../../container/booklist/DisplayAllBooks';
import GetDashboardWrapper from '../../container/common/Dashboard';
import
CategoryAdminTab from '../../container/categories/CategoriesAdminTab';
import UserListTab from '../../container/userlists/container/UserListTab';
import NotificationTab from '../../container/notification/NotificationTab';
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
        <div id="adminboard" className="main-wrapper">
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
