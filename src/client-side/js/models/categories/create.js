import { createCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain, getCategoryRef } from "./read.js";
import {
  createBlankValue,
  successActionCategory,
  uiCreateFailed,
} from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";

$(document).ready(function () {
  $("button#btnCreateCategory")
    .off("click")
    .on("click", function () {
      $("#category-create-failed").html("");
    });
  // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
  $("#category-submit")
    .off("click")
    .on("click", async () => {
      try {
        const categoryName = capitalizeWord($("#category-nama").val());
        const categoryInfo = $("#category-keterangan").val();
        const req = {
          categoryName,
          categoryInfo,
        };
        const response = await createCategory(req);
        getCategoryAgain();
        getCategoryRef();
        successActionCategory(response);
        createBlankValue();
        $("#categoryModal").modal("hide");
      } catch (error) {
        const errMsg = error || error.message;
        uiCreateFailed(errMsg);
        console.error(errMsg);
        const modalBody = $("#category-create-modal-body").get(0);
        modalBody.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
});
