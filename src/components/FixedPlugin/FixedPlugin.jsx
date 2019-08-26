import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { mainActions as actionCreators } from "store/Actions";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";

const FixedPlugin = ({
  classes,
  activeColor,
  sidebarMini,
  darkMode,
  slotMachineMini,
  changeBgColor,
  toggleFixedPlugin,
  toggleSideBar,
  changeSideBarColor,
  toggleMachineSize
}) => {
  return (
    <div className="fixed-plugin">
      <div className={classes}>
        <a
          href="#pablo"
          onClick={e => {
            e.preventDefault();
            toggleFixedPlugin();
          }}
        >
          <i className="fa fa-cog fa-2x" />
        </a>
        <ul className="dropdown-menu show">
          <li className="header-title">SIDEBAR BACKGROUND</li>
          <li className="adjustments-line">
            <div className="badge-colors text-center">
              <span
                className={
                  activeColor === "primary" ? "badge filter badge-primary active" : "badge filter badge-primary"
                }
                data-color="primary"
                onClick={() => {
                  changeSideBarColor("primary");
                }}
              />
              <span
                className={activeColor === "blue" ? "badge filter badge-info active" : "badge filter badge-info"}
                data-color="info"
                onClick={() => {
                  changeSideBarColor("blue");
                }}
              />
              <span
                className={activeColor === "green" ? "badge filter badge-success active" : "badge filter badge-success"}
                data-color="success"
                onClick={() => {
                  changeSideBarColor("green");
                }}
              />
              <span
                className={
                  activeColor === "orange" ? "badge filter badge-warning active" : "badge filter badge-warning"
                }
                data-color="warning"
                onClick={() => {
                  changeSideBarColor("orange");
                }}
              />
              <span
                className={activeColor === "red" ? "badge filter badge-danger active" : "badge filter badge-danger"}
                data-color="danger"
                onClick={() => {
                  changeSideBarColor("red");
                }}
              />
            </div>
          </li>
          <li className="header-title">SIDEBAR MINI</li>
          <li className="adjustments-line">
            <div className="togglebutton switch-sidebar-mini">
              <span className="label-switch">OFF</span>
              <Switch
                onChange={() => {
                  toggleSideBar();
                  document.body.classList.toggle("sidebar-mini");
                }}
                value={sidebarMini}
                onText=""
                offText=""
              />
              <span className="label-switch">ON</span>
            </div>
          </li>
          <li className="adjustments-line">
            <div className="togglebutton switch-change-color mt-3">
              <span className="label-switch">LIGHT MODE</span>
              <Switch
                onChange={() => {
                  changeBgColor();
                  document.body.classList.toggle("white-content");
                }}
                value={darkMode}
                onText=""
                offText=""
              />
              <span className="label-switch">DARK MODE</span>
            </div>
          </li>
          <li className="header-title">SLOT MACHINE</li>
          <li className="adjustments-line">
            <div className="togglebutton switch-change-color mt-3">
              <span className="label-switch">BIG</span>
              <Switch onChange={toggleMachineSize} value={slotMachineMini} onText="" offText="" />
              <span className="label-switch">SMALL</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  activeColor: state.allReducer.activeColor,
  sidebarMini: state.allReducer.sidebarMini,
  classes: state.allReducer.classes,
  darkMode: state.allReducer.darkMode,
  slotMachineMini: state.allReducer.slotMachineMini
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FixedPlugin);
