import { getAccountingAllAPI } from "./utils.js";
import debounce from "../../utils/debounce.js";
import { uiTbody1 } from "./ui.js";

let selectedAccount = $("div#select-mode button.active").data("value");
let searchVal = $("#general-section #limit-search input").val();
let limitVal = $("#general-section #limit-search select").val();
let offsetVal = 1;

const handleBounce = debounce(() => {
  const req = {
    selectedAccount,
    searchVal,
    limitVal,
    offsetVal,
  };
  getAccountingAllAPI(req);
}, 1000);

$("#general-section #limit-search input")
  .off("keyup")
  .on("keyup", function () {
    searchVal = $(this).val();
    limitVal = $("#general-section #limit-search select").val();
    selectedAccount = $("div#select-mode button.active").data("value");
    uiTbody1(`loading.....`);
    handleBounce();
  });
