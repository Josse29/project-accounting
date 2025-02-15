import { debounce } from "../../utils/debounce.js";
import { uiTr2 } from "./ui.js";
import { getAssetNameAll } from "./utils.js";

let searchVal = $("input#asset-search").val();
let limitVal = $("select#asset-limit").val();
let offsetVal = 1;

const handleBounce = debounce(() => {
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  getAssetNameAll(req);
}, 1000);

$("input#asset-search")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = parseInt($("select#asset-limit").val());
    uiTr2();
    handleBounce();
  });
