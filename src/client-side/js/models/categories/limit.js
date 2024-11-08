import { executeRead } from "./utils.js";
import { debounce } from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";

// get value
let searchVal = $("input#category-search-input").val();
let limitVal = parseInt($("select#category-limit").val());
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  executeRead(req);
}, 1000);

// limit
$("#category-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    searchVal = $("#category-search-input").val();
    uiTbodyLoad();
    handleBounce();
  });
