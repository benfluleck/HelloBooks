import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, signup } from '../../../actions/authenticate';
import { validateSignUpInput } from '../../../validators/validator';
import SiteFooter from '../../../components/presentation/common/Footer.jsx';


/**
 *
 *
 * @class Authentication
 *
 * @extends {Component}
 */
export class AuthComponent extends Component {
/**
 * @memberof Authentication
 *
 * Creates an instance of Authentication.
 *
 * @param {any} props
 *
 * @memberOf Authentication
 */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        passwordConfirmation: ''
      },
      errors: {}
    };
    this.onChange = this
      .onChange
      .bind(this);
    this.onSignInSubmit = this
      .onSignInSubmit
      .bind(this);
    this.onSignUpSubmit = this
      .onSignUpSubmit
      .bind(this);
    this.handleGoogleLogin = this
      .handleGoogleLogin
      .bind(this);
  }
  /**
   * @method componentWillMount
   *
   * @memberof DisplayRecentBooks
   *
   * @returns {object} void
   *
   * @memberOf DisplayRecentBooks
  * */
  componentWillMount() {
    this.setState({ initPage: true });
    $('body').css('background-color', 'rgb(204, 204, 204)');
  }
  /**
   * Submit state
   * This is called when the submit button is clicked
   *
   * @method submit
   *
   * @memberof AuthComponent
   *
   * @param {object} event
   *
   * @returns {void}
   */
  onSignUpSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props
        .signup(this.state.user)
        .then((response) => {
          if (response.statusText === 'Created') {
            this
              .props
              .history
              .push('/login');
          } else {
            Materialize.toast('Please sign in again', 3000);
          }
        });
    }
  }

  /**
   * Submit state
   * @description This is called when the submit button is clicked
   *
   * @method onSignInSubmit
   *
   * @param {object} event
   *
   * @memberof AuthComponent
   *
   *
   * @returns {function} response
   */
  onSignInSubmit(event) {
    event.preventDefault();
    this
      .props
      .login(this.state.user)
      .then((response) => {
        if (response.success && response.isAdmin) {
          return (this.props.history.push('/admin'));
        }
        this.props
          .history
          .push('/dashboard');
      })
      .catch(() => {

      });
  }

  /**
   * @description handles google Authentication
   *
   * @returns {void} void
   *
   * @param {object} response
   *
   * @memberof AuthComponent
   */
  handleGoogleLogin(response) {
    this
      .props
      .login(response.profileObj)
      .then((res) => {
        if (res) {
          this.props
            .history
            .push('/dashboard');
        }
      });
  }
  /**
   * Handle onChange events on form inputs
   *
   * @method isValid
   *
   * @memberof AuthComponent
   *
   * @returns {bool} true/ false
   */
  isValid() {
    const { errors, isValid } = validateSignUpInput(this.state.user);
    if (!isValid) {
      this.setState({ errors });
    } else {
      return isValid;
    }
  }

  /**
   * Handle onChange events on form inputs
   *
   * @method onChange
   *
   * @memberof AuthComponent
   *
   * @param {object} event
   *
   * @returns {function} a function that handles change event on inputs
   */
  onChange(event) {
    const { user } = this.state;
    const newUserDetails = {
      ...user,
      [event.target.name]: event.target.value
    };
    this.setState({ user: newUserDetails });
  }
  /**
   * render AuthWrapper
   *
   * @method render
   *
   * @returns {Component} WrappedComponent
   *
   * @memberOf AuthComponent
   */
  render() {
    const WrappedComponent = this.props.wrappedComponent;
    return (

      <div>
        <WrappedComponent
          onChange={this.onChange}
          user={this.state.user}
          errors={this.state.errors}
          onSignInSubmit={this.onSignInSubmit}
          onSignUpSubmit={this.onSignUpSubmit}
          handleGoogleLogin={this.handleGoogleLogin}
        />
        <SiteFooter />
      </div>
    );
  }
}


AuthComponent.propTypes = {
  signup: PropTypes.func,
  login: PropTypes.func,
  wrappedComponent: PropTypes.func.isRequired,
  history: PropTypes.func
};

const AuthenticationWrapper = (WrappedComponent) => {
  const mapStateToProps = state => ({

    wrappedComponent: WrappedComponent

  });

  return connect(mapStateToProps, { login, signup })(AuthComponent);
};
export default(AuthenticationWrapper);
