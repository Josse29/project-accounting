import { debounce } from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";
import { getAll } from "./utils.js";

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
// limit
$("select#persediaan-limit")
  .off("change")
  .on("change", function () {
    limitVal = $(this).val();
    searchVal = $("input#persediaan-search").val();
    uiTbodyLoad();
    handleBounce();
  });
