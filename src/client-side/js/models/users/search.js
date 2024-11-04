import { debounce } from "../../utils/debounce.js";
import { get1 } from "./read.js";
import { uiLoad } from "./ui.js";

// searching
$("input#user-search")
  .off("keyup")
  .on("keyup", function () {
    $("span#user-total-row").text("waiting..");
    uiLoad();
    debounce(async () => {
      await get1();
    }, 1000);
  });
