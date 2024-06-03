import { alertSuccessMe } from "../../utils/updateUi.js";

// UI tr Product from dbsqlite
export const uitrProduct = (el) => {
  return `<tr>
                <td class="text-center align-content-center">${el.Id}</td>
                <td class="text-nowrap align-content-center">${el.ProductName}</td>
                <td class="text-nowrap align-content-center">${el.CategoryId}</td>
                <td class="align-content-center">${el.ProductPrice}</td>
                <td>
                  <div class="d-flex w-100 justify-content-center gap-2">
                    <button 
                    class="btn btn-success text-white"
                    data-bs-toggle="modal" data-bs-target="#productsModalDetail" 
                    id="detailProduct" 
                    data-productid="${el.Id}"  
                    data-productname="${el.ProductName}" 
                    data-productprice="${el.ProductPrice}" 
                    data-productketerangan="${el.ProductInfo}" 
                    data-productcategory="${el.CategoryId}"
                    data-productimage="${el.ProductImage}">
                      <i 
                      class="fa-solid fa-eye"
                      data-bs-toggle="tooltip" 
                      data-bs-html="true"
                      data-bs-title="<span>lihat-${el.ProductName}</span>" data-bs-placement="bottom"
                      ></i>
                    </button>
                    <button 
                    class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#editProductModal" 
                    id="editProduct" 
                    data-productid="${el.Id}"  
                    data-productname="${el.ProductName}" 
                    data-productprice="${el.ProductPrice}" 
                    data-productketerangan="${el.ProductInfo}" 
                    data-productcategory="${el.CategoryId}"
                    data-productimage="${el.ProductImage}">
                      <i 
                      class="fa-solid fa-pencil" 
                      data-bs-toggle="tooltip" 
                      data-bs-html="true"
                      data-bs-title="<span>edit-${el.ProductName}</span>" data-bs-placement="bottom"></i>
                    </button>
                    <button 
                    class="btn btn-danger text-white" 
                    id="deleteProduct" 
                    data-productid="${el.Id}" 
                    data-productname="${el.ProductName}" 
                    data-bs-toggle="modal" 
                    data-bs-target="#confirmDeleteProductModal">
                      <i 
                      class="fa-solid fa-trash-can" data-bs-toggle="tooltip" 
                      data-bs-html="true"
                      data-bs-title="<span>hapus-${el.ProductName}</span>" data-bs-placement="bottom"></i>
                    </button>
                  </div>
                </td>
          </tr>`;
};
// make alert success after action crud 
export const successCreate = (res) => {
  $("#sectionSuccessCreate").html(alertSuccessMe(res))
  setTimeout(() => {
    $("#sectionSuccessCreate").html("")
  }, 15000);
}
// blank value after submit action 
export const blankValue = () => {
  $("#product-name").val("")
  $("#product-price").val("")
  $("#product-keterangan").val("")
  $("#create-categories-selection").val("")
  $("#create-image-product").val("")
  $("#section-image").addClass("d-none")
}