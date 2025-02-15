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

$("select#asset-limit")
  .off("change")
  .on("change", function () {
    searchVal = $("input#asset-search").val();
    limitVal = parseInt($(this).val());
    uiTr2();
    handleBounce();
  });
