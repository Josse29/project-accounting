import { getInventory } from "../../../../serverless-side/functions/inventory.js"
import { trInventory } from "./ui.js"
$(document).ready(function () {
    getInventory((status, response) => {
        if (status) {
            let tr = ``
            console.log(response)
            response.forEach(element => {
                tr += trInventory(element)
            });
            $("#inventory-data").html(tr)
        }
        if (!status) {
            console.error(response)
        }
    })
})
export const getInventoryAgain = () => {
    getInventory((status, response) => {
        if (status) {
            let tr = ``
            console.log(response)
            response.forEach(element => {
                tr += trInventory(element)
            });
            $("#inventory-data").html(tr)
        }
        if (!status) {
            console.error(response)
        }
    })
}