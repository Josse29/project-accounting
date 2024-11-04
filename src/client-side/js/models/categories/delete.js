import { getCategoryAgain, getCategoryRef } from "./read.js";
import { deleteById } from "./services.js";
import { uiAlertSuccess } from "./ui.js";

$("tbody#category-data")
  .off("click", "#deleteCategory")
  .on("click", "#deleteCategory", function () {
    const category = $(this).closest("tr")[0].dataset;
    const categoryId = parseInt(category.categoryid);
    const categoryName = category.categorynama;
    $("#confirmDeleteCategoryModalLabel").html(categoryName);
    const konfirmasiDelete = `
    Are You sure to delete this - <span class="fw-bold">${categoryName}</span> ? `;
    $("#confirmDeleteProductModalLabel").html(categoryName);
    $("#confirm-text-delete-category").html(konfirmasiDelete);
    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#sure-delete-category")
      .off("click")
      .on("click", async () => {
        const req = {
          categoryId,
          categoryName,
        };
        const { status, response } = await deleteById(req);
        if (status) {
          await getCategoryAgain();
          await getCategoryRef();
          uiAlertSuccess(response);
          $("#confirmDeleteCategoryModal").modal("hide");
        }
        if (!status) {
          console.error(response);
        }
      });
  });
