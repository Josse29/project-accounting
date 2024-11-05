import { debounce } from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";
import { executeRead } from "./utils.js";

// get value
let searchVal = $("#category-search-input").val();
let limitVal = parseInt($("#category-limit").val());
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

// searching
$("#category-search-input")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = parseInt($("#category-limit").val());
    uiTbodyLoad();
    handleBounce();
  });
