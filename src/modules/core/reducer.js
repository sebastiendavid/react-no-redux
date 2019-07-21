export default function makeReducer(initialState, reducerDict) {
  const reducer = (state = initialState, action) => {
    const callback = reducerDict[action.type];
    if (typeof callback === 'function') {
      return callback(state, action);
    }
    return state;
  };
  reducer.initialState = initialState;
  return reducer;
}
