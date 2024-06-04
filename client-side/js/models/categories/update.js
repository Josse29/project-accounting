import { updateCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain } from "./read.js";
import { successActionCategory } from "./ui.js";

$(document).on("click", "#editCategory", function () {
    const category = this.dataset;
    $("#categoryModalLabelEdit").html(category.categorynama)
    $("#edit-category-nama").val(category.categorynama)
    $("#edit-category-keterangan").val(category.categoryketerangan)
    $("#edit-category-submit").on("click", () => {
        updateCategory(category.categoryid, $("#edit-category-nama").val(), $("#edit-category-keterangan").val(), (status, response) => {
            if (status) {
                console.log(response)
                successActionCategory(response)
                getCategoryAgain()
            }
            if (!status) {
                console.error(response)
            }
        })
    })
});