import { deleteCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain, getCategoryRef } from "./read.js";
import { uiAlertSuccess } from "./ui.js";

$(document).ready(function () {
  $("tbody#category-data")
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
            uiAlertSuccess(response);
          } catch (error) {
            console.error(error);
          }
        });
    });
});
