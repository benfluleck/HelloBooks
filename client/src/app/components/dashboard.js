import React from 'react'
import css from '../css/style.scss'
import {Row, Col} from 'react-materialize'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage'

/*
eslint-disable
 */
const Dashboard = ({isConfirmed}) => {

  return (
    <div className='dashboard'>
      <h3>
        User Dashboard
      </h3>
      {!isConfirmed && <ConfirmEmailMessage/>}
      <div>
        <h4>Favourite Book</h4>
        <div>
          <p>No Books have been loaned at the moment</p>
        </div>
      </div>
    </div>
  );
}

Dashboard.PropTypes = {
  isConfirmed: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {isConfirmed: state.confirmed}
}

export default connect(mapStateToProps)(Dashboard)
