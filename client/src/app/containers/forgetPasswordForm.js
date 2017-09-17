import React from 'react';
import ForgetPassordform from '../components/ForgetPasswordform';

export class Forgetpassform extends React.Component {
		submit = (data) => {
				console.log(data)
		}
		render() {

				return (
						<div className='forgetpass'>

								<h4>
										Forget Password</h4>
								<Forgetpassform submit ={this.submit}/>

						</div>
				);
		}

}
