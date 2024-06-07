// UI tr Product from dbsqlite
export const uitrProduct = (el) => {
  return `<tr>
                <td class="text-center align-content-center">${el.ProductId}</td>
                <td class="text-nowrap align-content-center">${el.ProductName}</td>
                <td class="text-nowrap align-content-center">${el.CategoryName}</td>
                <td class="align-content-center">${el.ProductPrice}</td>
                <td>
                  <div class="d-flex w-100 justify-content-center gap-2">
                    <button 
                    class="btn btn-success text-white"
                    data-bs-toggle="modal" 
                    data-bs-target="#productsModalDetail" 
                    id="detailProduct" 
                    data-productid="${el.ProductId}"  
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
                    data-productid="${el.ProductId}"  
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
                    data-productid="${el.ProductId}" 
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
export const successActionProduct = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                            ${res}
                          </div>`
  $("#sectionSuccessActionProduct").html(alertSuccessMe)
  setTimeout(() => {
    $("#sectionSuccessActionProduct").html("")
  }, 20000);
}
// when total product row 0 being seaching
export const trProductZeroSearch = (searchVal) => {
  return `<tr>
              <td colspan="5" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">product ${searchVal} tidak ditemukan....</td>
            </tr>`
}
// when total product row 0 being seaching
export const trProductZero = () => {
  return `<tr>
              <td colspan="5" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">tidak ada product....</td>
            </tr>`
}
// blank value after submit action 
export const createBlankValue = () => {
  $("#product-name").val("")
  $("#product-price").val("")
  $("#product-keterangan").val("")
  $("#create-categories-selection").val("")
  $("#create-image-product").val("")
  $("#section-image").addClass("d-none")
}
// success create pdf
ipcRenderer.on("success:pdf-product", (e, file_path) => {
  successActionProduct(`File PDF tersimpan di ${file_path}`)
})