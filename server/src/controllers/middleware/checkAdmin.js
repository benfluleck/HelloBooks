import jwtDecode from 'jwt-decode';

/**
  * R
  *
  * @description Middleware that to check token for administrator parameters
  *
  * @param {object} req request object
  *
  * @param {object} res response object
  *
  * @param {object} next

  * @returns {next} response
  */
export default (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  const decodedToken = jwtDecode(token);
  if (decodedToken.id.isAdmin) {
    next(null, {
      isAdmin: decodedToken.id.isAdmin
    });
  } else {
    res.status(403).send({ message: 'You are forbidden, Sorry' });
  }
};
