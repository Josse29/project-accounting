import { deleteCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain, getCategoryRef } from "./read.js";
import { successActionCategory } from "./ui.js";

$(document).ready(function () {
  $(document)
    .off("click", "#deleteCategory")
    .on("click", "#deleteCategory", function () {
      const category = this.dataset;
      const categoryId = parseInt(category.categoryid);
      const categoryName = category.categorynama;
      $("#confirmDeleteCategoryModalLabel").html(categoryName);
      const konfirmasiDelete = `Are You sure to delete this - <span class="fw-bold">${categoryName}</span> ? `;
      $("#confirmDeleteProductModalLabel").html(categoryName);
      $("#confirm-text-delete-category").html(konfirmasiDelete);
      // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
      $("#sure-delete-category")
        .off("click")
        .on("click", async () => {
          try {
            const response = await deleteCategory(categoryId, categoryName);
            getCategoryAgain();
            getCategoryRef();
            successActionCategory(response);
          } catch (error) {
            console.error(error);
          }
        });
    });
});
