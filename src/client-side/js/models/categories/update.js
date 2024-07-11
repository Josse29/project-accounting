import { updateCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain, getCategoryRef } from "./read.js";
import { successActionCategory } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
$(document).ready(function () {
  $(document).on("click", "#editCategory", function () {
    const category = this.dataset;
    $("#categoryModalLabelEdit").html(category.categorynama);
    $("#edit-category-nama").val(category.categorynama);
    $("#edit-category-keterangan").val(category.categoryketerangan);
    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#edit-category-submit").off("click");
    $("#edit-category-submit").on("click", () => {
      const valueId = parseInt(category.categoryid);
      const valueName = capitalizeWord($("#edit-category-nama").val());
      const valueInfo = $("#edit-category-keterangan").val();
      updateCategory(valueId, valueName, valueInfo, (status, response) => {
        if (status) {
          getCategoryAgain();
          getCategoryRef();
          successActionCategory(response);
        }
        if (!status) {
          console.error(response);
        }
      });
    });
  });
});
