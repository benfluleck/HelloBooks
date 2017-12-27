import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, signup } from '../../../actions/authenticate';
import { validateSignUpInput } from '../../../validators/validator';
import SiteFooter from '../../../components/presentation/common/Footer.jsx';


const AuthenticationWrapper = (WrappedComponent) => {
/**
 *
 *
 * @class Authentication
 * @extends {Component}
 */
  class AuthComponent extends Component {
    /**
 * @memberof Authentication
 * Creates an instance of Authentication.
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
          passwordConfirmation: '',
          errors: {}
        }
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
        this.setState({ user: { errors: {} } });
        this.props
          .signup(this.state.user)
          .then((res) => {
            if (res.statusText === 'Created') {
              this
                .props
                .history
                .push('/login');
            } else {
              Materialize.toast('Please sign in again', 3000);
            }
          })
          .catch(() => {});
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
   * @description handles goole Authentication
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
        this.setState({ user: { errors } });
      } else {
        return isValid;
      }
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
      return (
        <div>
          <WrappedComponent
            onChange={this.onChange}
            user={this.state.user}
            onSignInSubmit={this.onSignInSubmit}
            onSignUpSubmit={this.onSignUpSubmit}
            handleGoogleLogin={this.handleGoogleLogin}
          />
          <SiteFooter />
        </div>
      );
    }
  }

  AuthComponent.defaultProps = {
    signup: null,
    login: null,
    history: null,
  };

  AuthComponent.propTypes = {
    signup: PropTypes.func,
    login: PropTypes.func,
    history: PropTypes.oneOfType([
      PropTypes.object
    ])
  };


  return connect(null, { login, signup })(AuthComponent);
};


export default(AuthenticationWrapper);
