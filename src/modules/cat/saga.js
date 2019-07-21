import { call, select, takeEvery } from 'redux-saga/effects';
import logger from '../core/logger';

export function* incrementSaga() {
  const count = yield select(state => state.count);
  yield call(logger.info, 'increment saga', count);
}

export default function* mainSaga() {
  yield takeEvery('increment', incrementSaga);
}
