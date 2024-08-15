import { deleteCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain, getCategoryRef } from "./read.js";
import { successActionCategory } from "./ui.js";

$(document).ready(function () {
  $(document).on("click", "#deleteCategory", function () {
    const category = this.dataset;
    const categoryId = parseInt(category.categoryid);
    const categoryName = category.categorynama;
    $("#confirmDeleteCategoryModalLabel").html(categoryName);
    const konfirmasiDelete = `Apakah anda yakin menghapus - <span class="fw-bold">${categoryName}</span> ? `;
    $("#confirmDeleteProductModalLabel").html(categoryName);
    $("#confirm-text-delete-category").html(konfirmasiDelete);
    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#sure-delete-category").off("click");
    $("#sure-delete-category").on("click", () => {
      deleteCategory(categoryId, categoryName, (status, response) => {
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
