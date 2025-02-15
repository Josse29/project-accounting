import { debounce } from "../../utils/debounce.js";
import { uiTr2 } from "./ui.js";
import { getExpenseAll } from "./utils.js";

let searchVal = $("input#expense-search").val();
let limitVal = $("select#expense-limit").val();
let offsetVal = 1;

const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getExpenseAll(req);
}, 1000);

$("select#expense-limit")
  .off("change")
  .on("change", function () {
    searchVal = $("input#expense-search").val();
    limitVal = parseInt($(this).val());
    uiTr2();
    handleBounce();
  });
