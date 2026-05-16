const initialState = { courses: [] };
const reducerCourses = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COURSES': return { ...state, courses: action.payload };
    case 'ADD_COURSE': return { ...state, courses: [...state.courses, action.payload] };
    case 'UPDATE_COURSE': return { ...state, courses: state.courses.map(c => c.id === action.payload.id ? action.payload : c) };
    case 'DELETE_COURSE': return { ...state, courses: state.courses.filter(c => c.id !== action.payload) };
    default: return state;
  }
};
export default reducerCourses;