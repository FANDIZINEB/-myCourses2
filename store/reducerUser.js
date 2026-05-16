const initialState = { errors: {} };

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    default:
      return state;
  }
};

export default reducerUser;