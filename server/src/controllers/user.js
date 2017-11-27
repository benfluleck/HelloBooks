import bcrypt from 'bcrypt';
import models from '../models';
import generateToken from '../controllers/middleware/authenticate';

const { User, Userlevel } = models;

export default {
  /**
  * Route: POST: /auth/users/signin
  * @description Create a new user
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {void|Response} status, send
  */
  create(req, res) {
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).send({ message: 'Password and Password confirmation do not match' });
    }
    User.findOne({ where: { username: req.body.username } })
      .then((usernameExists) => {
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
                  userImage: req.body.userImage || process.env.PROFILE_PIC,
                  passwordConfirmation: req.body.passwordConfirmation.trim(),
                  email: req.body.email.trim(),
                  isAdmin: req.body.isAdmin
                }).then((user) => {
                  if (user) {
                    res.status(201).send({
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
  signIn(req, res) {
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
            id: user.id,
            isAdmin: user.isAdmin
          };
          generateToken
            .getJWT(Userjwt)
            .then((token) => {
              res.status(200).send({
                success: true,
                message: ` You are now logged in as ${req.body.username}`,
                token: token.token,
                username: user.username,
                email: user.email,
                profilePic: `${user.userImage}`,
                firstname: user.firstname
              });
            });
        } else {
          res.status(400).send({ success: false, message: 'Wrong Credentials' });
        }
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** @description changes user password
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    * @returns {object} Message object
    */
  changePassword(req, res) {
    const userId = req.user.id.id || req.user.id;
    User
      .findOne({
        where: {
          id: userId
        }
      }).then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not logged In' });
        }
        const comparePasswords = bcrypt.compareSync(req.body.newPassword, user.password);
        if (comparePasswords) {
          return res.status(409)
            .send({ message: 'You cannot use a previous password' });
        }
        const encryptedPassword = bcrypt.hashSync(req.body.newPassword, 10);
        user.update({
          password: encryptedPassword
        });
        return res.status(200)
          .send({
            message: `${user.username}, your password has been updated`
          });
      })
      .catch(error => res.status(500).send(error.message));
  },
  /** Changes a users level
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
     * @returns {object} response object
     */
  changeLevel(req, res) {
    const newLevelId = req.body.newLevelId;
    const userId = req.body.userId;
    if (isNaN(newLevelId)) {
      return res.status(400).send({
        message: 'Please enter new Level'
      });
    }
    User
      .findById(userId).then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        if (newLevelId === user.userLevel) {
          return res.status(409)
            .send({ message: 'This user is already on this level' });
        }
        Userlevel.findById(newLevelId)
          .then((level) => {
            if (!level) {
              return res.status(404).send({ message: 'Level does not exist' });
            }
            user.update({
              userLevel: newLevelId
            });
            user.getLevel()
              .then((newLevel) => {
                const userDetails = {
                  username: user.username,
                  level: newLevel.levelName
                };
                res.status(200).send({ message: 'Level changed Successfully', userDetails });
              });
          });
      })
      .catch(error => res.status(500).send(error.message));
  }
};
