import { debounce } from "../../utils/debounce.js";
import { uiLoad } from "./ui.js";
import { getAll } from "./utils.js";
// get all value
let searchVal = $("input#sales-read-search").val();
let limitVal = parseInt($("select#sales-read-limit").val());
let offsetVal = 1;

// Debounced event handler
const handleDebounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getAll(req);
}, 1000);

// search
$("input#sales-read-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = parseInt($("select#sales-read-limit").val());
    uiLoad();
    handleDebounce();
  });
$("span#sales-search")
  .off("click")
  .on("click", function () {
    searchVal = $(this).val();
    limitVal = parseInt($("select#sales-read-limit").val());
    uiLoad();
    handleDebounce();
  });
