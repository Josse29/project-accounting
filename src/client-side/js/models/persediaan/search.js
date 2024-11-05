import { debounce } from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";
import { getAll } from "./utils.js";

// get value
let searchVal = $("input#persediaan-search").val();
let limitVal = parseInt($("select#persediaan-limit").val());
let offsetVal = 1;

// debouncing
const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getAll(req);
}, 1000);
// search
$("input#persediaan-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = parseInt($("select#persediaan-limit").val());
    uiTbodyLoad();
    handleBounce();
  });
