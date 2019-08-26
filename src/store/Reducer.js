import * as types from "./ActionTypes";

export const computeNewPosition = position => {
  let w1 = position.w1 + Math.floor(Math.random() * 2 + 1);
  let w2 = position.w2 + Math.floor(Math.random() * 2 + 1);
  let w3 = position.w3 + Math.floor(Math.random() * 2 + 1);
  return { w1, w2, w3 };
};

const computeThePrize = position => {
  let w1 = position.w1 % 4;
  let w2 = position.w2 % 4;
  let w3 = position.w3 % 4;

  if (w1 === w2 && w1 === w3) {
    return 1000;
  } else if (w1 === w2 || w2 === w3) {
    return 20;
  } else if (w1 === w3) {
    return 10;
  }
  return 0;
};

const INITIAL_STATE = {
  //slot machine
  mSeconds: 0,
  isRunning: false,
  prize: 0,
  position: computeNewPosition({
    w1: 0,
    w2: 0,
    w3: 0
  }),

  //main (Main, SideBars, FixedPuglin)
  classes: "dropdown",
  darkMode: true,
  activeColor: "blue",
  sidebarMini: true,
  opacity: 0,
  sidebarOpened: false,
  slotMachineMini: true
};

const allReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_BACKGROUND_COLOR:
      return { ...state, darkMode: !state.darkMode };
    case types.CHANGE_SIDE_BAR_COLOR:
      return { ...state, activeColor: action.color };
    case types.TOGGLE_FIXED_PLUGIN:
      let classes = "dropdown";
      if (state.classes === "dropdown") {
        classes = "dropdown show";
      }
      return { ...state, classes };
    case types.TOGGLE_SIDE_BAR:
      return { ...state, sidebarMini: !state.sidebarMini };
    case types.TOGGLE_SLOT_MACHINE_SIZE:
      return { ...state, slotMachineMini: !state.slotMachineMini };
    case types.SLOT_MACHINE_START:
      return { ...state, mSeconds: action.mSeconds, isRunning: true, prize: 0 };
    case types.SLOT_MACHINE_TICKET:
      let position = computeNewPosition(state.position);
      return { ...state, mSeconds: action.mSeconds, position };
    case types.SLOT_MACHINE_STOP:
      let prize = computeThePrize(state.position);
      return { ...state, mSeconds: action.mSeconds, isRunning: false, prize };
    default:
      return state;
  }
};

export default allReducer;
