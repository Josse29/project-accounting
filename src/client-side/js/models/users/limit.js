import { debounce } from "../../utils/debounce.js";
import { uiLoad } from "./ui.js";
import { executeRead } from "./utils.js";

// value
let searchVal = $("input#user-search").val();
let limitVal = parseInt($("select#user-limit").val());
let offsetVal = 1;

// handlebounce
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  executeRead(req);
}, 1000);

// limit
$("select#user-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    uiLoad();
    handleBounce();
  });
