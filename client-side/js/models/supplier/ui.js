// ui tr supplier from db
export const trSupplier = (el) => {
    return `<tr>
                <td class="text-center align-content-center">1</td>
                <td class="align-content-center">Tuesday , 20-04-2024</td>
                <td class="align-content-center text-nowrap">${el.SupplierName}</td>
                <td class="align-content-center text-nowrap">
                    ${el.SupplierInfo}
                </td>
                <td>
                    <div class="d-flex w-100 justify-content-center gap-2">
                        <button 
                            class="btn btn-success text-white"
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierDetailModal" 
                            id="supplierDetail" 
                            data-supplierid="${el.SupplierId}"  
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}">
                                <i 
                                    class="fa-solid fa-eye"
                                    data-bs-toggle="tooltip" 
                                    data-bs-html="true"
                                    data-bs-title="<span>lihat-${el.SupplierName}</span>" 
                                    data-bs-placement="bottom">
                                </i>
                        </button>
                        <button 
                            class="btn btn-primary text-white"
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierUpdateModal" 
                            id="supplierUpdate" 
                            data-supplierid="${el.SupplierId}"  
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}">
                                <i 
                                    class="fa-solid fa-pencil"
                                    data-bs-toggle="tooltip" 
                                    data-bs-html="true"
                                    data-bs-title="<span>edit-${el.SupplierName}</span>" 
                                    data-bs-placement="bottom">
                                </i>
                        </button>
                        <button
                            class="btn btn-danger text-white"
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierDeleteModal" 
                            id="supplierDelete" 
                            data-supplierid="${el.SupplierId}"  
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}">
                                <i 
                                    class="fa-solid fa-trash-can"
                                    data-bs-toggle="tooltip" 
                                    data-bs-html="true"
                                    data-bs-title="<span>hapus-${el.SupplierName}</span>" 
                                    data-bs-placement="bottom">
                                </i>
                        </button>
                    </div>
                </td>
            </tr>`
}
// make alert success after action crud 
export const successActionSupplier = (res) => {
    const alertSuccessMe = `<div class="alert alert-success" role="alert">
                              ${res}
                            </div>`
    $("#sectionSuccessActionSupply").html(alertSuccessMe)
    setTimeout(() => {
        $("#sectionSuccessActionSupply").html("")
    }, 20000);
}