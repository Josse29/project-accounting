import { createCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain, getCategoryRef } from "./read.js";
import { createBlankValue, successActionCategory } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";

$(document).ready(function () {
  // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
  $("#category-submit").off("click");
  $("#category-submit").on("click", () => {
    const categoryName = capitalizeWord($("#category-nama").val());
    const categoryInfo = $("#category-keterangan").val();
    createCategory(categoryName, categoryInfo, (status, response) => {
      if (status) {
        getCategoryAgain();
        getCategoryRef();
        successActionCategory(response);
        createBlankValue();
      }
      if (!status) {
        console.error(response);
      }
    });
  });
});
