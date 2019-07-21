import { runSaga, stdChannel } from 'redux-saga';
import { cancel, cancelled, fork, take } from 'redux-saga/effects';
import logger from './logger';

const CANCEL_SAGA = '!cancel_saga!';

export default function makeSaga(saga, getState, name) {
  const channel = stdChannel();
  const config = {
    channel,
    dispatch(action) {
      channel.put(action);
    },
    getState,
  };
  return {
    dispatch: config.dispatch,
    run: () => {
      const rootTask = runSaga(config, function* rootSaga() {
        try {
          while (true) {
            const forkedTask = yield fork(saga);
            yield take(CANCEL_SAGA);
            yield cancel(forkedTask);
            yield cancel(rootTask);
          }
        } finally {
          if (yield cancelled()) {
            logger.info(`${name} root saga has been cancelled`);
          }
        }
      });
    },
    cancel: () => {
      config.dispatch({ type: CANCEL_SAGA });
    },
  };
}
