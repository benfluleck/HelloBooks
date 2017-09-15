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
      <h2>
        User Dashboard
      </h2>
      {!isConfirmed && <ConfirmEmailMessage/>}

    </div>
  );
}

Dashboard.PropTypes = {
  isConfirmed: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {isConfirmed: state.user.confirmed}
}

export default connect(mapStateToProps)(Dashboard)
