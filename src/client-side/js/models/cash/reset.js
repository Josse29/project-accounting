import { debounce } from "../../utils/debounce.js";
import { animateFade } from "../../utils/updateUi.js";
import { uiTbodyLoad } from "./ui.js";
import { getAll } from "./utils.js";

const handleBounce = debounce(() => {
  getAll();
}, 1000);

$("button#cash-read-reset")
  .off("click")
  .on("click", () => {
    animateFade("#cash-card");
    $("#section-alert").html(``);
    $("div#cash-summary").html(``);
    $("div#cash-card #limit-search").removeClass("d-none");
    $("#cash-read-date input#startDate").val("");
    $("#cash-read-date input#endDate").val("");
    $("input#cash-read-search").val("");
    $("select#cash-read-limit").val(10);
    uiTbodyLoad();
    handleBounce();
  });
