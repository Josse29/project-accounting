import debounce from "../../utils/debounce.js";
import { uiTBodyLoad } from "./ui.js";
import { getProductAll } from "./utils.js";

// get all value
let searchVal = $("#product-search-input").val();
let limitVal = $("#product-limit").val();
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = { searchVal, limitVal, offsetVal };
  getProductAll(req);
}, 1000);
// limit
$("#product-limit")
  .off("change")
  .on("change", function () {
    limitVal = $(this).val();
    searchVal = $("#product-search-input").val();
    uiTBodyLoad();
    handleBounce();
  });
