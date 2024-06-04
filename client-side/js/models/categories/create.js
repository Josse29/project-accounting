import { createCategory } from "../../../../serverless-side/functions/categories.js";
import { getCategoryAgain } from "./read.js";
import { successActionCategory } from "./ui.js";

$("#category-submit").on("click", () => {
    const categoryName = $("#category-nama").val()
    const categoryInfo = $("#category-keterangan").val()
    createCategory(categoryName, categoryInfo, (status, response) => {
        if (status) {
            getCategoryAgain();
            console.log(response)
            successActionCategory(response)
        }
        if (!status) {
            console.error(response)
        }
    })
})