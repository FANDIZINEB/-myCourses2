const initialState = { payments: [] };
const reducerPayment = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PAYMENT': return { ...state, payments: [...state.payments, ...action.payload] };
    default: return state;
  }
};
export default reducerPayment;