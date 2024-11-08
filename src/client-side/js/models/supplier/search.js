import { debounce } from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";
import { getSupplier1 } from "./utils.js";
// get value
let searchVal = $("#supplier-search-input").val();
let limitVal = parseInt($("#supplier-limit").val());
let offsetVal = 1;
// debouncing
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getSupplier1(req);
}, 1000);
// searching
$("#supplier-search-input")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = parseInt($("#supplier-limit").val());
    uiTbodyLoad();
    handleBounce();
  });
