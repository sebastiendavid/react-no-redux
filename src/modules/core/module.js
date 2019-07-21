import React from 'react';
import logger from './logger';
import makeSaga from './saga';

export default function makeModule({ name, Provider, reducer, saga }) {
  let lastState;
  let moduleSaga;
  const getState = () => lastState;

  const Module = props => {
    logger.info('render module', name);

    React.useEffect(() => {
      logger.info(`module ${name} did mount`);
      moduleSaga = makeSaga(saga, getState, name);
      moduleSaga.run();
      return () => {
        logger.info(`module ${name} will unmount`);
        moduleSaga.cancel();
      };
    }, []);

    const reducerWrapper = React.useCallback((state, action) => {
      lastState = reducer(state, action);
      moduleSaga.dispatch(action);
      return lastState;
    }, []);

    const [state, dispatch] = React.useReducer(
      reducerWrapper,
      reducer.initialState
    );

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
