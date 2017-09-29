const Helper = {

  /**
  * Get user's profile'
  * @param {Object} data object containing user's details
  * @returns {Object} return user's data
  */
  errorArray(error) {
    const errorArray = [];
    error.errors.forEach((err) => {
      errorArray.push({ path: err.path, message: err.message });
    });
    return errorArray;
  },


};

export default Helper;
