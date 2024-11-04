import { uiLoad } from "./ui.js";
import { handleDebounce } from "./utils.js";

// limit
$("select#user-limit")
  .off("change")
  .on("change", function () {
    limitVal = $(this).val();
    uiLoad();
    handleDebounce();
  });
