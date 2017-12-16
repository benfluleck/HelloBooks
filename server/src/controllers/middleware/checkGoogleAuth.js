export default (req, res, next) => {
  if (req.body.googleId) {
    const googleId = req.body.googleId;
    const {
      email,
      givenName: firstname,
      familyName: lastname,
      imageUrl: userImage
    } = req.body;
    const username = email.slice(0, email.indexOf('@')) + googleId;
    const password = googleId;
    const passwordConfirmation = googleId;
    req.body = {
      email,
      username,
      password,
      passwordConfirmation,
      lastname,
      firstname,
      googleId,
      userImage
    };
    return next();
  }
  next();
};
