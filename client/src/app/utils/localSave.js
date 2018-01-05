/**
 * saves application state to disk
 *
 * @param  {Object} state application state
 *
 * @return {undefined} writes to disk
 */
export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

const initializeState = {};
/**
 * loads state from disk
 *
 * @return {Object} State Object
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return initializeState;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return initializeState;
  }
};
