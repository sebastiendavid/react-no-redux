import { runSaga, stdChannel } from 'redux-saga';
import { cancel, cancelled, fork, take } from 'redux-saga/effects';
import makeAction from './action';
import logger from './logger';

const CANCEL_SAGA = '!cancel_saga!';

export default function makeSaga({ saga, getState, name, onPut }) {
  const channel = stdChannel();
  if (!saga) {
    return { put() {}, run() {}, cancel() {} };
  }
  return {
    put: action => channel.put(action),
    run: () => {
      const rootTask = runSaga(
        {
          channel,
          dispatch: onPut,
          getState,
        },
        function* rootSaga() {
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
        }
      );
    },
    cancel: () => {
      channel.put(makeAction(CANCEL_SAGA)());
      channel.close();
    },
  };
}
