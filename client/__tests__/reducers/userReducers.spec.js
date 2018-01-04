import userReducer from '../../src/app/reducers/userReducers';
import { signUpUserSuccess,
  userLoggedIn,
  userLoggedOut } from '../../src/app/actions/authenticate';
import { getUserListSuccess,
  getUserListFailure } from '../../src/app/actions/admin/getUserList';
import { getUserLevelListSuccess,
  getUserLevelListFailure } from
  '../../src/app/actions/admin/getUserLevelList';
import {
  changeUserLevelSuccess
} from '../../src/app/actions/admin/changeUserLevel';
import {
  getUserSuccess,
  getUserFailure
} from '../../src/app/actions/admin/getSelectedUser';


let action;
let newState;

const initialState = {
  user: {},
  isAuthenticated: false
};

const user = {

  id: 4,
  username: 'aimee',
  password: 'test',
};


describe('User Reducer', () => {
  it(' should return Initial state for undefined prop types', () => {
    expect(userReducer(undefined, { type: 'undefinedAction' })).toEqual({
      user: {},
      isAuthenticated: false
    });
  });

  it('should handle action type SIGNUP_USER_SUCCESS', () => {
    action = signUpUserSuccess(user);
    newState = userReducer(initialState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.user).toEqual(undefined);
  });

  it('should handle action type USER_LOGGED_IN', () => {
    action = userLoggedIn(user);
    newState = userReducer(initialState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.user).toEqual(user);
  });

  it('should handle action type GET_USER_LIST_SUCCESS', () => {
    const userList = {

      users: [
        {
          id: 1,
          firstname: 'Ben',
          username: 'Benny',
          lastname: 'Amarachi',
          userlevel: 1
        },
        {
          id: 2, firstname: 'Amarachi', lastname: 'Williams', userlevel: 1
        },
        {
          id: 3, firstname: 'Dino', lastname: 'Williams', userlevel: 1
        }
      ]
    };
    action = getUserListSuccess(userList);
    newState = userReducer(initialState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.userList).toEqual(userList);
    expect(newState.userList.users).toHaveLength(3);
  });

  it('should handle action type GET_USER_LEVEL_LIST_SUCCESS', () => {
    const userLevelList = {

      userLevels: [
        {
          id: 1, levelName: 'Bronze', userlevel: 1
        },
        {
          id: 2, levelName: 'Silver', userlevel: 2
        },
        {
          id: 3, levelName: 'Gold', userlevel: 3
        },
        {
          id: 3, levelName: 'Diamond', userlevel: 4
        }
      ]
    };

    action = getUserLevelListSuccess(userLevelList);
    newState = userReducer(initialState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.userLevels.userLevels).toEqual(userLevelList.userLevels);
    expect(newState.userLevels.userLevels).toHaveLength(4);
  });

  it('should handle action type CHANGE_USER_LEVEL_SUCCESS', () => {
    const newUserLevel = {

      selectedUserLevel: 2
    };

    action = changeUserLevelSuccess(newUserLevel.selectedUserLevel);
    newState = userReducer(initialState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.selectedUserLevel).toEqual(newUserLevel.selectedUserLevel);
  });

  it('should handle action type GET_USER_SUCCESS', () => {
    const selectedUser = {
      user: {
        id: 1,
        username: 'Benny'
      }

    };
    action = getUserSuccess(selectedUser);
    newState = userReducer(initialState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.selectedUser).toEqual(selectedUser);
  });

  it('should handle action type USER_LOGGED_OUT', () => {
    action = userLoggedOut(user);
    newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState, action);
    expect(newState.user).toEqual({});
  });

  it('should handle action to GET_USER_LIST_FAILURE', () => {
    action = getUserListFailure();
    newState = userReducer(initialState, action);
    expect(newState.error).toEqual(undefined);
  });

  it('should handle action to GET_USER_LEVEL_LIST_FAILURE', () => {
    action = getUserLevelListFailure();
    newState = userReducer(initialState, action);
    expect(newState.error).toEqual(undefined);
  });

  it('should handle action to GET_USER_FAILURE', () => {
    action = getUserFailure();
    newState = userReducer(initialState, action);
    expect(newState.error).toEqual(undefined);
  });
});
