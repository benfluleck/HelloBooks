export const saveState = (state) => {
  try {
    // localStorage.setItem('username', state.user.user.username || null);
    //let serializedState;
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
