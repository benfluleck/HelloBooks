import bcrypt from 'bcrypt-nodejs';
import models from '../models';
import sendResetPasswordEmail from '../mailer/mailer';
import generateToken from '../controllers/middleware/authenticate';


const User = models.User;

export default {
  /**
  * Create a new user
  * Route: POST: /users
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {void|Response} status, send
  */
  create(req, res) {
    if (!req.body.firstname ||
      !req.body.lastname ||
      !req.body.username ||
      !req.body.password ||
      !req.body.email ||
      !req.body.password_confirmation) {
      res
        .status(400)
        .send('All fields are required');
    }
    User
      .findOne({
        where: { email: req.body.email }
      })
      .then((userExists) => {
        if (userExists) {
          res
            .status(409)
            .json({
              success: false,
              message: 'This email is already in use'
            });
        } else {
          User
            .create({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              password: req.body.password,
              password_confirmation: req.body.password_confirmation,
              email: req.body.email
            })
            .then((user) => {
              if (user) {
                res
                  .status(201)
                  .send({
                    success: true,
                    message: 'New User has been added'
                  });
              }
            })
            .catch((error) => {
              res
                .status(400)
                .send({ success: false, message: ` ${error.message}` });
            });
        }
      })
      .catch((error) => {
        res
          .status(400)
          .send({ success: false, message: ` ${error.message}` });
      });
  },

  /**
   * User sign in
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} status, send
   *
   */
  signin(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .send({
              success: false,
              message: `${req.body.username} does not exist, Go to User SignUp`
            });
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
          const Userjwt = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstname: user.firstname
          };
          generateToken.getJWT(Userjwt)
            .then((token) => {
              res
                .status(200)
                .send({
                  success: true,
                  message: ` ${req.body.username} is now logged in!`,
                  token: token.token,
                  username: req.body.username
                });
            });
        } else {
          res
            .status(400)
            .send({ success: false, message: 'Wrong Credentials' });
        }
      })
      .catch(error => res.status(500).send(error.message));
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {any} reset password
   *
   */
  reset_password(req, res) {
    User
      .findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          sendResetPasswordEmail(user);
          res.json({});
        } else {
          res
            .status(400)
            .json({
              errors: {
                global: 'There are no users with such email'
              }
            });
        }
      });
  },

  /**
   * Edit user Information
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {mixed}      - sends an http response
   */
  updateUserInfo(req, res) {
    User
      .findById(req.params.userId)
      .then((user) => {
        user
          .update(req.body, {
            returning: true,
            plain: true
          })
          .then(() => res.status(202).send({ success: true, user, message: 'Your information was successfully updated' }), (error) => {
            res
              .status(500)
              .send({ success: false, error });
          });
      })
      .catch(error => res.status(500).send({ success: false, error }));
  }
};
