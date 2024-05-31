// reinit tooltip 
export const reinitializeTooltips = () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};

// UI tr Product from dbsqlite
export const uitrProduct = (el) => {
  return `<tr>
                <td class="text-center align-content-center">${el.id}</td>
                <td class="text-nowrap align-content-center">${el.name}</td>
                <td class="text-nowrap align-content-center">${el.category}</td>
                <td class="align-content-center">${el.price}</td>
                <td>
                  <div class="d-flex w-100 justify-content-center gap-2">
                    <button 
                    class="btn btn-success text-white"
                    data-bs-toggle="modal" data-bs-target="#productsModalDetail" 
                    id="detailProduct" 
                    data-productid="${el.id}"  
                    data-productname="${el.name}" 
                    data-productprice="${el.price}" data-productketerangan="${el.keterangan}" 
                    data-productcategory="${el.category}"
                    data-productimage="${el.image}">
                      <i 
                      class="fa-solid fa-eye"
                      data-bs-toggle="tooltip" 
                      data-bs-html="true"
                      data-bs-title="<span>lihat-${el.name}</span>" data-bs-placement="bottom"
                      ></i>
                    </button>
                    <button 
                    class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#editProductModal" 
                    id="editProduct" 
                    data-productid="${el.id}"  
                    data-productname="${el.name}" 
                    data-productprice="${el.price}" data-productketerangan="${el.keterangan}" 
                    data-productcategory="${el.category}"
                    data-productimage="${el.image}">
                      <i 
                      class="fa-solid fa-pencil" 
                      data-bs-toggle="tooltip" 
                      data-bs-html="true"
                      data-bs-title="<span>edit-${el.name}</span>" data-bs-placement="bottom"></i>
                    </button>
                    <button 
                    class="btn btn-danger text-white" 
                    id="deleteProduct" 
                    data-productid="${el.id}" 
                    data-productname="${el.name}" 
                    data-bs-toggle="modal" data-bs-target="#confirmDeleteProductModal">
                      <i 
                      class="fa-solid fa-trash-can" data-bs-toggle="tooltip" 
                      data-bs-html="true"
                      data-bs-title="<span>hapus-${el.name}</span>" data-bs-placement="bottom"></i>
                    </button>
                  </div>
                </td>
              </tr>`;
};