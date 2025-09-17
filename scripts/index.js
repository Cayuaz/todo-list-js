import {setEventsListeners, list} from "./events.js";
import {render} from "./ui.js";
import {getTasks} from "./state.js";

render(getTasks(), list);

setEventsListeners();

                        