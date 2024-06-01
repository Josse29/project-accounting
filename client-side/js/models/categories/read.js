import { reinitializeTooltips } from "../../utils/updateUi.js";
import { uiListCategory, uiTrCategory } from "./ui.js";
// for table categories
db.all(`SELECT *
        FROM categories`, (err, res) => {
    if (!err) {
        let tr = ``
        res.forEach((el) => {
            tr += uiTrCategory(el)
        })
        $("#category-data").html(tr)
        reinitializeTooltips();
    }
    if (err) {
        console.error(err)
        // return callback(false, err);
    }
});
// for list categories
db.all(`SELECT * FROM categories`, (err, res) => {
    if (!err) {
        let option = ``
        res.forEach((el) => {
            option += uiListCategory(el)
        })
        $("#create-categories-selection").html(option)
    }
    if (err) {
        console.log(res)
    }
})
export const getCategoryAgain = () => {
    db.all(`SELECT *
            FROM categories`, (err, res) => {
        if (!err) {
            let tr = ``
            res.forEach((el) => {
                tr += uiTrCategory(el)
            })
            $("#category-data").html(tr)
            reinitializeTooltips();
        }
        if (err) {
            console.error(err)
            // return callback(false, err);
        }
    });
}