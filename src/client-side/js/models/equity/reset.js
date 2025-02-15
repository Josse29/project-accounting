import { debounce } from "../../utils/debounce.js";
import { animateFade } from "../../utils/updateUi.js";
import { uiTbodyLoad } from "./ui.js";
import { getEquityAll } from "./utils.js";

const handleBounce = debounce(() => {
  getEquityAll();
}, 1000);

$("button#equity-reset")
  .off("click")
  .on("click", () => {
    animateFade("#equity-card");
    $("div#section-alert").html(``);
    $("#equity-card #limit-search").removeClass("d-none");
    $("#equity-read-date input#startDate").val("");
    $("#equity-read-date input#endDate").val("");
    $("input#equity-read-search").val("");
    $("select#equity-read-limit").val(10);
    uiTbodyLoad();
    handleBounce();
  });
