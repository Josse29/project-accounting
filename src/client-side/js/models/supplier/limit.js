import { getSupplier1 } from "./utils.js";
import { uiTbodyLoad } from "./ui.js";
import { debounce } from "../../utils/debounce.js";

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
// limit
$("#supplier-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    searchVal = $("#supplier-search-input").val();
    uiTbodyLoad();
    handleBounce();
  });
