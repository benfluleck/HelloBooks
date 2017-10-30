import React from 'react';
import ForgetPassordform from '../components/ForgetPasswordformComponent';
import PropTypes from 'prop-types'
import {Message} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {resetPasswordRequest} from '../actions/auth'

class Forgetpass extends React.Component {
	state ={
		 success:false
	};
		submit = (data) => {
				this.props.resetPasswordRequest(data)
				.then(()=> this.setState({success:true}));
		}
		render() {

				return (
						<div className='forgetpass'>
							{this.state.success ? ( 
								<Message> Email has been sent </Message>
								) :(

								<Forgetpassform submit ={this.submit}/>
							)}
						</div>
				);
		}

}

Forgetpass.propTypes = {
	// resetPasswordRequest : PropTypes.func.isRequired
}

export default connect(null,{resetPasswordRequest})(Forgetpass);
