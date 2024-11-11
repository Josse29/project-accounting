import { update } from "./services.js";
import { uiAlertFailUpdate, uiAlertSuccess } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { executeRead, getCategoryRef } from "./utils.js";

$("tbody#category-data")
  .off("click", "#editCategory")
  .on("click", "#editCategory", function () {
    const category = $(this).closest("tr")[0].dataset;
    $("#categoryModalLabelEdit").html(category.categorynama);
    $("#edit-category-nama").val(category.categorynama);
    $("#edit-category-keterangan").val(category.categoryketerangan);
    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#edit-category-submit")
      .off("click")
      .on("click", async () => {
        const categoryId = parseInt(category.categoryid);
        const categoryName = capitalizeWord(
          $("#edit-category-nama").val().trim()
        );
        const categoryInfo = $("#edit-category-keterangan").val();
        const req = {
          categoryId,
          categoryName,
          categoryInfo,
        };
        const { status, response } = await update(req);
        if (status) {
          await executeRead();
          await getCategoryRef();
          uiAlertSuccess(response);
          $("#categoryModalEdit").modal("hide");
        }
        if (!status) {
          console.error(response);
          uiAlertFailUpdate(response);
          const modalBody = $("#category-update-modal-body").get(0);
          modalBody.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      });
  });
