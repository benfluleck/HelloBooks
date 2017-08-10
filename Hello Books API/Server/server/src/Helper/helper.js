const Helper = {

 /**
  * Get user's profile'
  * @param {Object} data object containing user's details
  * @returns {Object} return user's data
  */
 userProfile() {
  return {
   firstname: firstname,
   lastname: lastname,
   username: username,
   password: password,
   password_confirmation: password_confirmation,
   email: email
  };
 },
};

export default Helper;