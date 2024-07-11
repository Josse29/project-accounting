import { deleteCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain, getCategoryRef } from "./read.js";
import { successActionCategory } from "./ui.js";

$(document).ready(function () {
  $(document).on("click", "#deleteCategory", function () {
    const category = this.dataset;
    $("#confirmDeleteCategoryModalLabel").html(category.categorynama);
    const konfirmasiDelete = `Apakah anda yakin menghapus - <span class="fw-bold">${category.categorynama}</span> ? `;
    $("#confirmDeleteProductModalLabel").html(category.categorynama);
    $("#confirm-text-delete-category").html(konfirmasiDelete);
    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#sure-delete-category").off("click");
    $("#sure-delete-category").on("click", () => {
      deleteCategory(
        category.categoryid,
        category.categorynama,
        (status, response) => {
          if (status) {
            getCategoryAgain();
            getCategoryRef();
            successActionCategory(response);
          }
          if (!status) {
            console.error(response);
          }
        }
      );
    });
  });
});
