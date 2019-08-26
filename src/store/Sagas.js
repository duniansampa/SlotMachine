import { actionChannel, call, take, put, race, all, fork } from "redux-saga/effects";
import * as types from "./ActionTypes";
import { slotMachineActions as actions } from "./Actions";

const FIFTY_MS = 50;
const FIVE_SEG = 5 * FIFTY_MS * 20;
const TEN_SEG = 2 * FIVE_SEG;

// wait :: Number -> Promise
const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(ms), ms);
  });

function* startSaga() {
  const channel = yield actionChannel(types.SLOT_MACHINE_START);

  let timeCount = 0;
  while (yield take(channel)) {
    while (true) {
      const { stopped, tick } = yield race({
        stopped: take(types.SLOT_MACHINE_STOP),
        tick: call(wait, FIFTY_MS)
      });

      if (!stopped && timeCount < TEN_SEG) {
        timeCount += FIFTY_MS;
        //console.log(timeCount);
        yield put(actions.tick(timeCount));
      } else if (timeCount >= TEN_SEG) {
        yield put(actions.stop(timeCount));
        timeCount = 0;
        break;
      } else {
        timeCount = 0;
        break;
      }
    }
  }
}

function* stopSaga() {
  const channel = yield actionChannel(types.SLOT_MACHINE_STOP);

  while (yield take(channel)) {
    while (true) {
      const { started, tick5s } = yield race({
        started: take(types.SLOT_MACHINE_START),
        tick5s: call(wait, FIVE_SEG)
      });

      if (!started) {
        yield put(actions.start(0));
        break;
      } else {
        break;
      }
    }
  }
}

export default function* root() {
  yield all([fork(startSaga), fork(stopSaga)]);
}
