import { call, put, select, takeEvery } from 'redux-saga/effects';
import makeAction from '../core/action';
import logger from '../core/logger';

export function* incrementSaga() {
  const count = yield select(state => state.count);
  yield call(logger.info, 'increment saga', count);
}

export function* incrementBySaga({ payload }) {
  const num = yield call(parseInt, payload, 10);
  if (Number.isInteger(num)) {
    const arr = new Array(num);
    for (let i of arr) {
      yield put(makeAction('increment')(i));
    }
  }
}

export default function* mainSaga() {
  yield takeEvery('increment', incrementSaga);
  yield takeEvery('increment_by', incrementBySaga);
}
