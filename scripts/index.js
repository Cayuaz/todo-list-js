import {setEventsListeners} from "./events.js";
import {render} from "./ui.js";
import {getTasks} from "./state.js";

const list = document.getElementById("list")

render(getTasks(), list);

setEventsListeners();

                        