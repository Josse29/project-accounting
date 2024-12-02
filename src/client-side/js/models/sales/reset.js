import { debounce } from "../../utils/debounce.js";
import { uiLoad, uiReset } from "./ui.js";
import { getAll } from "./utils.js";

// Debounced event handler
const handleDebounce = debounce(() => {
  getAll();
}, 1000);

// reset
$("button#sales-read-reset")
  .off("click")
  .on("click", function () {
    uiReset();
    uiLoad();
    handleDebounce();
  });
