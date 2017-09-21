import axios from 'axios';

const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthorizationToken;


// const setAuthorizationToken = (token) => {
//   let headers = new Headers();
//   if (token) {
//     header['x-access-token'] = token;
//     axios.defaults.headers.common['x-access-token'] = token;
//   } else {
//     delete axios.defaults.headers.common['x-access-token'];
//   }
// };

// export default setAuthorizationToken;
