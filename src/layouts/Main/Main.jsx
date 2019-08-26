import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { slotMachineActions as actionCreators } from "store/Actions";
import { Route, Switch } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

var ps;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.add("sidebar-mini");
    window.addEventListener("scroll", this.showNavbarButton);
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    window.removeEventListener("scroll", this.showNavbarButton);
  }
  componentDidUpdate(e) {
    if (e.location.pathname !== e.history.location.pathname) {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      this.refs.mainPanel.scrollTop > 50
    ) {
      this.setState({ opacity: 1 });
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      this.refs.mainPanel.scrollTop <= 50
    ) {
      this.setState({ opacity: 0 });
    }
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/main") {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };
  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (window.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  render() {
    this.props.stop(0);
    return (
      <div className="wrapper">
        <div className="rna-container"></div>
        <div className="navbar-minimize-fixed" style={{ opacity: this.state.opacity }}>
          <button className="minimize-sidebar btn btn-link btn-just-icon" onClick={this.handleMiniClick}>
            <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
            <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
          </button>
        </div>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            outterLink: "https://career.luxoft.com/careers/206853/front-end-developer/",
            text: "Front-End Developer",
            imgSrc: "/react-logo.png"
          }}
        />
        <div className="main-panel" ref="mainPanel" data={this.state.activeColor}>
          <AdminNavbar
            {...this.props}
            brandText={this.getActiveRoute(routes)}
            sidebarOpened={this.state.sidebarOpened}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          {// we don't want the Footer to be rendered on full screen maps page
          this.props.location.pathname.indexOf("full-screen-map") !== -1 ? null : <Footer fluid />}
        </div>
        <FixedPlugin />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
