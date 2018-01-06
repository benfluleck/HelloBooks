import jwtDecode from 'jwt-decode';

/**
  *
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
    req.isAdmin = decodedToken.id.isAdmin;
    next();
  } else {
    res.status(403).send({ token: null, message: 'Unauthorised Access' });
  }
};
