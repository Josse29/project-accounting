import { getProductAll } from "./utils.js";
import debounce from "../../utils/debounce.js";
import { uiTBodyLoad } from "./ui.js";

// get all value
let searchVal = $("#product-search-input").val();
let limitVal = $("#product-limit").val();
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = { searchVal, limitVal, offsetVal };
  getProductAll(req);
}, 1000);
// searching
$("#product-search-input")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = $("#product-limit").val();
    uiTBodyLoad();
    handleBounce();
  });
