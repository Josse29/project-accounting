import { debounce } from "../../utils/debounce.js";
import { getCash1 } from "./read.js";
import { uiTbodyLoad } from "./ui.js";

// get value
let searchVal = $("input#cash-read-search").val();
let limitVal = $("select#cash-read-limit").val();
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getCash1(req);
}, 1000);

// search
$("select#cash-read-limit")
  .off("change")
  .on("change", function () {
    limitVal = $(this).val();
    searchVal = $("input#cash-read-search").val();
    uiTbodyLoad();
    handleBounce();
  });
