import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

const Exercise = () => (
  <>
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle>Exercise</CardTitle>
        </CardHeader>
        <CardBody>
          <p>The slot machine (HTML5/Javascript/ReactJS - ReduxSaga if you think that it will be usefull).</p>
          <p>
            A slot machine is the machine you can see in many casinos where people insert a coin and then there are
            three wheels spinning with some fruits or symbols inside. In this case, we cannot enter coins.
          </p>
          <p>The behaviour will be as follows:</p>
          <p>
            The machine has 3 wheels.Each wheel has 4 symbols (strawberry, banana, orange and a monkey). Do not overdo
            the design. In our case, the machine can show only one symbol per wheel.{" "}
          </p>
          <p>
            The machine starts with the symbols in some random position The machine has a start button. When the user
            presses it, then the wheels spin (a symbol every, 50ms) If the user doesn’t press start, then the machine
            does it automatically after 5 seconds If the user doesn’t press stop, the machine stops automatically after
            10 seconds (after starting) The machine has a stop button. When the user presses it, then the wheels stop.
            If all the wheels show the two or more symbols of the same type, then we have a prize!!!. Two identical
            non-consecutive symbols, the prize is 10 dollars, Two consecutive symbols, then the prize is 20 dollars. The
            same symbol in all the wheels, the prize is 100 dollars
          </p>
          <p>
            Please, come with a reasonable simple design and a solution. It needs to be properly tested. No need of
            server side. Just HTML5/Javascript Please push the code to your Github repo otherwise you can send the code
            back attached to the mail.
          </p>
        </CardBody>
      </Card>
    </div>
  </>
);

export default Exercise;
