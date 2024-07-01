import { formatWaktuIndo } from "../../utils/waktuIndo.js";

// ui tr inventory from db
export const uiTrInventory = (el) => {
  const splitDateTime = el.InventoryDate.split(" ");
  const dateInventory = formatWaktuIndo(splitDateTime[0]);
  const timeInventory = splitDateTime[1];
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
                        <button 
                                id="inventoryDetail"
                                class="btn btn-success text-white"                      
                                data-bs-toggle="modal" 
                                data-bs-target="#inventoryDetailModal"
                                data-inventoryid="${el.InventoryId}"
                                data-inventoryproduct="${el.ProductName}" 
                                data-inventorycategory="${el.CategoryName}"
                                data-inventorydate="${dateInventory}" 
                                data-inventorysecond="${timeInventory}" >
                            <i class="fa-solid fa-eye"
                               data-bs-toggle="tooltip" 
                               data-bs-html="true"
                               data-bs-title="<span>lihat-${el.ProductName}</span>" 
                               data-bs-placement="bottom">
                            </i>
                        </button>
                        <button class="btn btn-primary text-white">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button class="btn btn-danger text-white">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
};
// make alert success after action crud
export const successActionInventory = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                              ${res}
                            </div>`;
  $("#sectionSuccessActionInventory").html(alertSuccessMe);
  setTimeout(() => {
    $("#sectionSuccessActionInventory").html("");
  }, 20000);
};
// button pagination
export const uiBtnInventoryPage = (i) => {
  return `<button type = "button" 
                  class="inventory-btn-page ${
                    i === 1 ? "inventory-active-page" : ""
                  }" >
                    ${i}
          </button>`;
}; // Function to update active page button
export const uiActivePageButton = (inventoryPageNumber, inventoryBtnPage) => {
  const inventoryBtnPageActive = document.getElementsByClassName(
    "inventory-active-page"
  );
  if (inventoryBtnPageActive.length >= 1) {
    inventoryBtnPageActive[0].classList.remove("inventory-active-page");
  }
  inventoryBtnPage[inventoryPageNumber - 1].classList.add(
    "inventory-active-page"
  );
};
