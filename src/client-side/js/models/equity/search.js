import { debounce } from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";
import { getEquityAll } from "./utils.js";

// get value
let searchVal = $("input#equity-read-search").val();
let limitVal = $("select#equity-read-limit").val();
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getEquityAll(req);
}, 1000);

$("input#equity-read-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = parseInt($("select#equity-read-limit").val());
    uiTbodyLoad();
    handleBounce();
  });
