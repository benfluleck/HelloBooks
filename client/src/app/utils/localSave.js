/**
 * saves application state to disk
 *
 * @param  {Object} state application state
 *
 * @return {object} writes to disk
 */
export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('http://hellobooks', serializedState);
};

const initializeState = {
  notifierReducer: {},
  categoryReducer: {},
  userReducer: {},
};
/**
 * loads state from disk
 *
 * @return {Object} State Object
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('http://hellobooks');
    if (serializedState === null) {
      return initializeState;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return initializeState;
  }
};
