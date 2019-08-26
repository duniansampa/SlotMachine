import * as types from "./ActionTypes";

export const mainActions = {
  changeBgColor: () => ({ type: types.CHANGE_BACKGROUND_COLOR }),
  changeSideBarColor: color => ({ type: types.CHANGE_SIDE_BAR_COLOR, color }),

  toggleSideBar: () => ({ type: types.TOGGLE_SIDE_BAR }),
  toggleFixedPlugin: () => ({ type: types.TOGGLE_FIXED_PLUGIN }),
  toggleMachineSize: () => ({ type: types.TOGGLE_SLOT_MACHINE_SIZE })
};

export const slotMachineActions = {
  start: mSeconds => ({ type: types.SLOT_MACHINE_START, mSeconds }),
  tick: mSeconds => ({ type: types.SLOT_MACHINE_TICKET, mSeconds }),
  stop: mSeconds => ({ type: types.SLOT_MACHINE_STOP, mSeconds })
};
