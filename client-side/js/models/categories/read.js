import { getCategory } from "../../../../serverless-side/functions/categories.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import { uiListCategory, uiTrCategory } from "./ui.js";
getCategory((status, response) => {
    if (status) {
        let tr = ``
        let option = ``
        response.forEach((el) => {
            tr += uiTrCategory(el)
            option += uiListCategory(el)
        })
        $("#category-data").html(tr)
        $("#create-categories-selection").html(option)
        reinitializeTooltips();
    }
    if (!status) {
        console.error(response)
    }
})
export const getCategoryAgain = () => {
    getCategory((status, response) => {
        if (status) {
            let tr = ``
            let option = ``
            response.forEach((el) => {
                tr += uiTrCategory(el)
                option += uiListCategory(el)
            })
            $("#category-data").html(tr)
            $("#create-categories-selection").html(option)
            reinitializeTooltips();
        }
        if (!status) {
            console.error(response)
        }
    })
}