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
  const serializedState = localStorage.getItem('state');
  return JSON.parse(serializedState);
};
