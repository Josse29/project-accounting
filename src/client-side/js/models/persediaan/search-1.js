import { getAll2 } from "./utils.js";
import { uiLoad } from "./ui.js";
import { debounce } from "../../utils/debounce.js";

// get all
let searchVal = $("input#order-search").val();
let limitVal = 3;
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getAll2(req);
}, 1000);
// searching
$("input#order-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    uiLoad();
    handleBounce();
  });
