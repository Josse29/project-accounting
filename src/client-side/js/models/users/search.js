import { debounce } from "../../utils/debounce.js";
import { uiLoad } from "./ui.js";
import { executeRead } from "./utils.js";

// value
let searchVal = $("input#user-search").val();
let limitVal = $("select#user-limit").val();
let offsetVal = 1;

// handlebounce
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal: parseInt(limitVal),
    offsetVal,
  };
  executeRead(req);
}, 1000);

// searching
$("input#user-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    $("span#user-total-row").text("waiting..");
    uiLoad();
    handleBounce();
  });
