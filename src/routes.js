import Exercise from "views/Exercise.jsx";
import SlotMachine from "views/SlotMachine.jsx";

const routes = [
  {
    path: "/slot-machine",
    name: "Game",
    icon: "tim-icons icon-user-run",
    component: SlotMachine,
    layout: "/main"
  },
  {
    path: "/exercise",
    name: "Exercise",
    icon: "tim-icons icon-paper",
    component: Exercise,
    layout: "/main"
  }
];

export default routes;
