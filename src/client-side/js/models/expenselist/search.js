import { getExpenseAll } from "./utils.js";
import { debounce } from "../../utils/debounce.js";
import { uiTr2 } from "./ui.js";

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

$("input#expense-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = $("select#expense-limit").val();
    uiTr2();
    handleBounce();
  });
