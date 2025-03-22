import { getStock3API } from "./utils-1.js";
import debounce from "../../utils/debounce.js";
import { uiLoad } from "./ui-1.js";

// get all value
let searchVal = $("input#sales-read-search").val();
let limitVal = $("select#sales-read-limit").val();
let offsetVal = 1;

// Debounced event handler
const handleDebounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getStock3API(req);
}, 1000);

// search
$("select#sales-read-limit")
  .off("change")
  .on("change", function () {
    limitVal = $(this).val();
    searchVal = $("input#sales-read-search").val();
    uiLoad();
    handleDebounce();
  });
