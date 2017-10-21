/*
eslint-disable no-console
*/
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  return JSON.parse(serializedState);
};
