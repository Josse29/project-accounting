import { getAll } from "./utils.js";
import { uiInit, uiTbodyLoad } from "./ui.js";
import { debounce } from "../../utils/debounce.js";

// get value
let searchVal = $("input#persediaan-search").val();
let limitVal = parseInt($("select#persediaan-limit").val());
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getAll(req);
}, 1000);

// refresh
$("button#persediaan-refresh")
  .off("click")
  .on("click", function () {
    searchVal = "";
    uiInit();
    uiTbodyLoad();
    handleBounce();
  });
