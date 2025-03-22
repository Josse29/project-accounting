import { getStock2API } from "./utils.js";
import debounce from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";

// get value
let searchVal = $("input#persediaan-search").val();
let limitVal = $("select#persediaan-limit").val();
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getStock2API(req);
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
