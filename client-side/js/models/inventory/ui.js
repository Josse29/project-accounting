import { formatWaktuIndo } from "../../utils/waktuIndo.js"

// ui tr inventory from db
export const trInventory = (el) => {
    const splitDateTime = el.InventoryDate.split(" ")
    const dateInventory = formatWaktuIndo(splitDateTime[0])
    const timeInventory = splitDateTime[1]
    return `<tr>
                <td class="text-center align-content-center">${el.InventoryId}</td>
                <td class="align-content-center">${dateInventory}</td>
                <td class="align-content-center">${timeInventory}</td>
                <td class="align-content-center text-nowrap text-capitalize">${el.ProductName}</td>
                <td class="align-content-center text-nowrap text-capitalize">${el.CategoryName}</td>
                <td class="align-content-center text-nowrap text-capitalize">
                    ${el.SupplierName}
                </td>
                <td class="text-nowrap align-content-center">
                    Mr.JK
                </td>
                <td class="text-nowrap align-content-center">
                    ${el.InventoryInfo}
                </td>
                <td class="text-nowrap align-content-center text-center">
                    1
                </td>
                <td>
                    <div class="d-flex w-100 justify-content-center gap-2">
                        <button class="btn btn-success text-white">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="btn btn-primary text-white">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button class="btn btn-danger text-white">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>`
}
// make alert success after action crud 
export const successActionInventory = (res) => {
    const alertSuccessMe = `<div class="alert alert-success" role="alert">
                              ${res}
                            </div>`
    $("#sectionSuccessActionInventory").html(alertSuccessMe)
    setTimeout(() => {
        $("#sectionSuccessActionInventory").html("")
    }, 20000);
}