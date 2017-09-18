export const saveState = (state) => {
  try {
    localStorage.setItem('username', state.user.user.username || null);

    localStorage.setItem('state', serializedState);
    const serializedState = JSON.stringify('state');
  } catch (e) {
    console.log(e);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
  }
};
