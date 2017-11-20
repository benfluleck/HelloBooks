import bcrypt from 'bcrypt';
import models from '../models';
import generateToken from '../controllers/middleware/authenticate';

const User = models.User;

export default {
  /**
  * Route: POST: /auth/users/signin
  * @description Create a new user
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {void|Response} status, send
  */
  create(req, res) {
    if (
      !req.body.firstname ||
    !req.body.lastname ||
    !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.passwordConfirmation
    ) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).send({ message: 'Password and Password confirmation do not match' });
    }
    User.findOne({ where: { username: req.body.username } }).then((usernameExists) => {
      if (usernameExists) {
        res.status(409).json({ success: false, message: 'This username is already in use' });
      } else {
        User.findOne({
          where: { email: req.body.email }
        })
          .then((userExists) => {
            if (userExists) {
              res.status(409).json({ success: false, message: 'This email is already in use' });
            } else {
              User.create({
                firstname: req.body.firstname.trim(),
                lastname: req.body.lastname.trim(),
                username: req.body.username.trim(),
                password: req.body.password.trim(),
                passwordConfirmation: req.body.passwordConfirmation.trim(),
                email: req.body.email.trim()
              }).then((user) => {
                if (user) {
                  res.status(201).send({
                    user,
                    message: `${user.username} has been added, Please Login`
                  });
                }
              });
            }
          })
          .catch((error) => {
            res.status(400).send({ success: false, message: ` ${error.message}` });
          });
      }
    });
  },

  /**
   *
   * Route: POST: /auth/users/sigin
   * @description User sign in
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} status, send
   *
   */
  signin(req, res) {
    return User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            message: `${req.body.username} does not exist, Make sure you are signed up`
          });
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
          const Userjwt = {
            id: user.id
          };
          generateToken
            .getJWT(Userjwt)
            .then((token) => {
              res.status(201).send({
                success: true,
                message: ` ${req.body.username} is now logged in!`,
                token: token.token,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                image: user.userimage
              });
            })
            .catch(error => res.status(500).send(error.message));
        } else {
          res.status(400).send({ success: false, message: 'Wrong Credentials' });
        }
      })
      .catch(error => res.status(500).send(error.message));
  }
};
