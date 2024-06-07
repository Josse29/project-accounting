//  ui tr satuan from looping
export const trSatuan = (el) => {
    return `<tr>
                <td class="text-center align-content-center">${el.SatuanId}</td>
                <td class="text-nowrap align-content-center text-capitalize">${el.SatuanName}</td>
                <td>
                    <div class="d-flex w-100 justify-content-center gap-2">
                        <button class="btn btn-success text-white"
                            data-bs-toggle="modal" 
                            data-bs-target="#satuanModalDetail" 
                            id="satuanDetail" 
                            data-satuanid="${el.SatuanId}"  
                            data-satuanname="${el.SatuanName}"
                            data-satuaninfo="${el.SatuanInfo}"
                             >
                                <i class="fa-solid fa-eye"
                                    data-bs-toggle="tooltip" 
                                    data-bs-html="true"
                                    data-bs-title="<span>lihat-${el.SatuanName}</span>" 
                                    data-bs-placement="bottom">
                                </i>
                        </button>
                        <button class="btn btn-primary text-white"
                                data-bs-toggle="modal" 
                                data-bs-target="#satuanUpdateModal" 
                                id="satuanEdit" 
                                data-satuanid="${el.SatuanId}"  
                                data-satuanname="${el.SatuanName}"
                                data-satuaninfo="${el.SatuanInfo}">
                                <i class="fa-solid fa-pencil"
                                    data-bs-toggle="tooltip" 
                                    data-bs-html="true"
                                    data-bs-title="<span>edit-${el.SatuanName}</span>" 
                                    data-bs-placement="bottom">
                                </i>
                        </button>
                        <button class="btn btn-danger text-white"
                                data-bs-toggle="modal" 
                                data-bs-target="#satuanDeleteModal" 
                                id="satuanDelete" 
                                data-satuanid="${el.SatuanId}"  
                                data-satuanname="${el.SatuanName}"
                                data-satuaninfo="${el.SatuanInfo}">
                                <i class="fa-solid fa-trash-can"
                                    data-bs-toggle="tooltip" 
                                    data-bs-html="true"
                                    data-bs-title="<span>delete-${el.SatuanName}</span>" 
                                    data-bs-placement="bottom">
                                </i>
                        </button>
                    </div>
                </td>
            </tr>`
}
// make alert success after action crud 
export const successActionSatuan = (res) => {
    const alertSuccessMe = `<div class="alert alert-success" role="alert">
                              ${res}
                            </div>`
    $("#sectionSuccessActionSatuan").html(alertSuccessMe)
    setTimeout(() => {
        $("#sectionSuccessActionSatuan").html("")
    }, 20000);
}