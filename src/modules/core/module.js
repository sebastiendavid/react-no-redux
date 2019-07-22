/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import logger from './logger';
import makeSaga from './saga';

export default function makeModule({ name, Provider, reducer, saga }) {
  const Module = props => {
    logger.info('render module', name);
    let dispatchToReducer;

    const lastState = React.useRef(null);

    const moduleSaga = React.useMemo(
      () =>
        makeSaga({
          saga,
          getState: () => lastState.current,
          name,
          onPut: action => dispatchToReducer(action),
        }),
      []
    );

    React.useEffect(() => {
      logger.info(`module ${name} did mount`);
      moduleSaga.run();
      return () => {
        logger.info(`module ${name} will unmount`);
        moduleSaga.cancel();
      };
    }, []);

    const reducerWrapper = React.useCallback((state, action) => {
      const newState = reducer(state, action);
      lastState.current = newState;
      moduleSaga.put(action);
      return newState;
    }, []);

    const [state, dispatch] = React.useReducer(
      reducerWrapper,
      reducer.initialState
    );
    dispatchToReducer = dispatch;

    const select = React.useCallback(
      callback => {
        try {
          return callback(state);
        } catch (err) {
          logger.warn(`Selected data does not exist in ${name} module state`);
          logger.warn(err);
          return null;
        }
      },
      [state]
    );

    const value = React.useMemo(() => ({ dispatch, select }), [
      dispatch,
      select,
    ]);

    return <Provider value={value}>{props.children}</Provider>;
  };

  return Module;
}
