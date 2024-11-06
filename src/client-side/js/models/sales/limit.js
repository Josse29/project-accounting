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

// limit
$("select#sales-read-limit")
  .off("change")
  .on("change", function () {
    limitVal = parseInt($(this).val());
    searchVal = $("input#sales-read-search").val();
    uiLoad();
    handleDebounce();
  });
