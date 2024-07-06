import { addSpace } from "../../utils/addSpace.js";
import { formatWaktuIndo } from "../../utils/waktuIndo.js";

// ui tr inventory from db
export const uiTrInventory = (el) => {
  const splitDateTime = el.InventoryDate.split(" ");
  const dateInventory = formatWaktuIndo(splitDateTime[0]);
  const timeInventory = splitDateTime[1];
  let inventoryQty = ``;
  const formattedQty = addSpace(el.InventoryProductQty);
  if (el.InventoryProductQty >= 1) {
    inventoryQty = `<span class="badge text-bg-success fs-6"> + ${el.InventoryProductQty}</span>`;
  } else {
    inventoryQty = `<span class="badge text-bg-danger fs-6">${formattedQty}</span>`;
  }
  return `<tr>
                <td class="align-content-center text-center">${el.InventoryId}</td>
                <td class="align-content-center text-center">${dateInventory}</td>
                <td class="align-content-center text-center">${timeInventory}</td>
                <td class="align-content-center text-nowrap text-capitalize">${el.ProductName}</td>
                <td class="align-content-center text-nowrap text-capitalize">${el.CategoryName}</td>
                <td class="align-content-center text-nowrap text-capitalize">
                    ${el.SupplierName}
                </td>
                <td class="text-nowrap align-content-center">
                    Mr.JK
                </td>
                <td class="text-nowrap align-content-center text-center">
                    ${inventoryQty}
                </td>
                <td>
                    <div class="d-flex w-100 justify-content-center gap-2">
                        <button id="inventoryDetail"
                                class="btn btn-success text-white"                      
                                data-bs-toggle="modal" 
                                data-bs-target="#inventoryDetailModal"
                                data-inventoryid="${el.InventoryId}"
                                data-productname="${el.ProductName}" 
                                data-productprice=${el.ProductPrice} 
                                data-inventorydate="${dateInventory}" 
                                data-inventorysecond="${timeInventory}"
                                data-inventoryqty=${el.InventoryProductQty}
                                data-inventoryinfo="${el.InventoryInfo}">
                            <i class="fa-solid fa-eye"
                               data-bs-toggle="tooltip" 
                               data-bs-html="true"
                               data-bs-title="<span>lihat-${el.ProductName}</span>" 
                               data-bs-placement="bottom">
                            </i>
                        </button>
                        <button id="inventory-update-btn"
                                class="btn btn-primary text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#inventoryUpdateModal"
                                data-inventoryid=${el.InventoryId}
                                data-inventoryinfo="${el.InventoryInfo}"
                                data-inventorydate="${dateInventory}" 
                                data-inventorysecond="${timeInventory}"
                                data-inventoryproductid=${el.ProductId}
                                data-inventoryproductname="${el.ProductName}"
                                data-inventoryqty=${el.InventoryProductQty}">
                            <i class="fa-solid fa-pencil"
                               data-bs-toggle="tooltip" 
                               data-bs-html="true"
                               data-bs-title="<span>edit-${el.ProductName}</span>" 
                               data-bs-placement="bottom">
                            </i>
                        </button>
                        <button id="inventory-delete-btn"
                                class="btn btn-danger text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#inventoryDeleteModal"
                                data-inventoryid="${el.InventoryId}"
                                data-inventoryproduct="${el.ProductName}" 
                                data-inventorydate="${dateInventory}" 
                                data-inventorysecond="${timeInventory}"
                                data-inventoryqty="${el.InventoryProductQty}">
                            <i class="fa-solid fa-trash-can"
                               data-bs-toggle="tooltip" 
                               data-bs-html="true"
                               data-bs-title="<span>hapus-${el.ProductName}</span>" 
                               data-bs-placement="bottom"></i>
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
// when total row 0 being seaching
export const uiTrZeroSearch = (searchVal) => {
  return `<tr>
              <td colspan="9" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">Persediaan ${searchVal} tidak ditemukan....</td>
            </tr>`;
};
// when total row 0 being seaching
export const uiTrZero = () => {
  return `<tr>
              <td colspan="9" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">tidak ada persediaan....</td>
            </tr>`;
};
// blank value after submit action
export const createBlankValue = () => {
  $("input#inventory-refproduct-create-id").val("");
  $("input#inventory-refproduct-create-name").val("");
  $("input#inventory-refproduct-create-qty").val(0);
  $("textarea#inventory-create-info").val("");
};
