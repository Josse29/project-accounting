import { getAll } from "./utils.js";
import { uiInit, uiTbodyLoad } from "./ui.js";
import { debounce } from "../../utils/debounce.js";

// debouncing
const handleBounce = debounce(() => {
  getAll();
}, 1000);

// refresh
$("button#persediaan-refresh")
  .off("click")
  .on("click", function () {
    uiInit();
    uiTbodyLoad();
    handleBounce();
  });
