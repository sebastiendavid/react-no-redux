import makeReducer from '../core/reducer';

const initialState = { count: 0 };

export default makeReducer(initialState, {
  increment: state => ({ count: state.count + 1 }),
  decrement: state => ({ count: state.count - 1 }),
  reset: () => initialState,
});
