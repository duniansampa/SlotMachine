import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { slotMachineActions as actionCreators } from "store/Actions";

// reactstrap components
import { Button, Card, CardHeader, CardBody, CardGroup, CardFooter, CardTitle, Row, Badge } from "reactstrap";

const PlayWinningSound = () => (
  <audio autoplay="autoplay" className="player" preload="false">
    <source src={"/winning_slot.wav"} />
  </audio>
);

const offset = 188;
const Wheel = ({ position, slotMachineMini }) => (
  <div
    style={{
      backgroundImage: `url(/slotMachineSymbols.png)`,
      backgroundPosition: "0px " + offset * position + "px",
      height: slotMachineMini ? "188px" : "564px"
    }}
    className={`icons`}
  />
);

const SlotMachine = ({ start, stop, position, isRunning, prize, slotMachineMini }) => {
  let playWinningInfo = null;
  if (prize > 0) {
    playWinningInfo = (
      <>
        <Badge color="info">{`${prize} USD`}</Badge>
        <PlayWinningSound />
      </>
    );
  }

  return (
    <>
      <div className="content">
        <Row>
          <Card className="main-card text-center">
            <CardHeader>
              <CardTitle tag="h4">Slot Machine</CardTitle>
            </CardHeader>
            <CardBody className="card-border">
              <CardGroup className={`wheel-container`}>
                <Wheel position={position.w1} slotMachineMini={slotMachineMini} />
                <Wheel position={position.w2} slotMachineMini={slotMachineMini} />
                <Wheel position={position.w3} slotMachineMini={slotMachineMini} />
              </CardGroup>
            </CardBody>
            <CardFooter>
              {playWinningInfo}
              <br />
              <Button color="success" disabled={isRunning} onClick={() => start()}>
                <i className="tim-icons icon-triangle-right-17" /> Start
              </Button>
              <Button color="primary" disabled={!isRunning} onClick={() => stop()}>
                <i className="tim-icons icon-simple-remove" /> Stop
              </Button>
            </CardFooter>
          </Card>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  position: state.allReducer.position,
  isRunning: state.allReducer.isRunning,
  prize: state.allReducer.prize,
  slotMachineMini: state.allReducer.slotMachineMini
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlotMachine);
