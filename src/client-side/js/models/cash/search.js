import { debounce } from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";
import { getCashAll } from "./utils.js";

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
  getCashAll(req);
}, 1000);

// search
$("input#cash-read-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = parseInt($("select#cash-read-limit").val());
    uiTbodyLoad();
    handleBounce();
  });
