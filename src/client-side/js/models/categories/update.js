import { updateCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain, getCategoryRef } from "./read.js";
import { uiAlertFailUpdate, uiAlertSuccess } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
$(document).ready(function () {
  $("tbody#category-data")
    .off("click", "#editCategory")
    .on("click", "#editCategory", function () {
      const category = this.dataset;
      $("#categoryModalLabelEdit").html(category.categorynama);
      $("#edit-category-nama").val(category.categorynama);
      $("#edit-category-keterangan").val(category.categoryketerangan);
      // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
      $("#edit-category-submit").off("click");
      $("#edit-category-submit").on("click", async () => {
        try {
          const categoryId = parseInt(category.categoryid);
          const categoryName = capitalizeWord($("#edit-category-nama").val());
          const categoryInfo = $("#edit-category-keterangan").val();
          const req = {
            categoryId,
            categoryName,
            categoryInfo,
          };
          const response = await updateCategory(req);
          getCategoryAgain();
          getCategoryRef();
          uiAlertSuccess(response);
          $("#categoryModalEdit").modal("hide");
        } catch (error) {
          const errMsg = error || error.message;
          uiAlertFailUpdate(errMsg);
          console.error(errMsg);
          const modalBody = $("#category-update-modal-body").get(0);
          modalBody.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      });
    });
});
