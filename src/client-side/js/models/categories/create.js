import { createCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain } from "./read.js";
import { createBlankValue, successActionCategory } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { listCategoryRefProductCreate } from "./list.js";

$(document).ready(function () {
  // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
  $("#category-submit").off("click");
  $("#category-submit").on("click", () => {
    const categoryName = capitalizeWord($("#category-nama").val());
    const categoryInfo = $("#category-keterangan").val();
    createCategory(categoryName, categoryInfo, (status, response) => {
      if (status) {
        getCategoryAgain();
        successActionCategory(response);
        createBlankValue();
        listCategoryRefProductCreate();
      }
      if (!status) {
        console.error(response);
      }
    });
  });
});
