import { debounce } from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";
import { getEquityAll } from "./utils.js";

// get value
let searchVal = $("input#equity-read-search").val();
let limitVal = $("select#equity-read-limit").val();
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = { searchVal, limitVal, offsetVal };
  getEquityAll(req);
}, 1000);

// limit
$("select#equity-read-limit")
  .off("change")
  .on("change", function () {
    limitVal = $(this).val();
    searchVal = $("input#equity-read-search").val();
    uiTbodyLoad();
    handleBounce();
  });
