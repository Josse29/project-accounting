import { getListSupplier, getSupplier, getTotalPageSupplier, getTotalRowSupplier } from "../../../../serverless-side/functions/supplier.js";
import { trSupplier, trSupplierZero } from "./ui.js";

$(document).ready(function () {
    // get all value
    const searchSupplier = $("#supplier-search-input").val()
    const limitSupplier = parseInt($("#supplier-limit").val())
    // get total row supplier 
    getTotalRowSupplier(searchSupplier, (status, response) => {
        // success get total supplier
        if (status) {
            // insert respond total row
            $("#totalAllSupplier").html(response)
            // if exist supplier
            if (response >= 1) {
                $("#supplier-pagination").removeClass("d-none")
                // get only list supplier
                getListSupplier((status, response) => {
                    if (status) {
                        let option = ``
                        response.forEach(element => {
                            option += `<option value="${element.SupplierId}" class="text-capitalize">${element.SupplierName}</option>`
                        })
                        $("#inventory-refsupplier-create-name").html(option)
                    }
                    if (!status) {
                        console.log(response)
                    }
                })
                // get all supplier
                getSupplier(searchSupplier, limitSupplier, 1, (status, response) => {
                    // succes get supplier
                    if (status) {
                        let tr = ``
                        response.forEach(element => {
                            tr += trSupplier(element)
                        });
                        $("#supplier-data").html(tr)
                        // get only last page product
                        getTotalPageSupplier(limitSupplier, searchSupplier, (status, response) => {
                            // if success get only last page product
                            if (status) {
                                // update ui for paginate based on total page
                                let uiBtnPaginate = ``
                                for (let i = 1; i <= response; i++) {
                                    uiBtnPaginate += `<button type="button" class="supplier-btn-page ${i === 1 ? 'supplier-active-page' : ''}">
                                                                                        ${i}
                                                                                    </button>`
                                }
                                $("#supplier-number-page").html(uiBtnPaginate)
                                // pagination
                                let supplierBtnPage = document.getElementsByClassName("supplier-btn-page");
                                // based event on click mckkkk
                                for (let i = 0; i < supplierBtnPage.length; i++) {
                                    supplierBtnPage[i].addEventListener("click", function () {
                                        let current = document.getElementsByClassName("supplier-active-page");
                                        if (current.length >= 1) {
                                            current[0].classList.remove("supplier-active-page");
                                        }
                                        this.classList.add("supplier-active-page");
                                        // get all supplier based on page
                                        getSupplier(searchSupplier, limitSupplier, parseInt(this.textContent.trim()), (status, response) => {
                                            if (status) {
                                                let tr = ``
                                                response.forEach(element => {
                                                    tr += trSupplier(element)
                                                });
                                                $("#supplier-data").html(tr)
                                            }
                                            if (!status) {
                                                console.error(response)
                                            }
                                        })
                                    });
                                }
                                // next page
                                let numberPage = parseInt($(".supplier-active-page").text().trim())
                                let totalPage = parseInt(response)
                                $("#supplier-next-page").on("click", () => {
                                    let incrementPage = numberPage += 1
                                    if (incrementPage <= totalPage) {
                                        getSupplier(searchSupplier, limitSupplier, incrementPage, (status, response) => {
                                            if (status) {
                                                let tr = ``
                                                response.forEach(element => {
                                                    tr += trSupplier(element)
                                                });
                                                $("#supplier-data").html(tr)
                                            }
                                            if (!status) {
                                                console.error(response)
                                            }
                                        })
                                    }
                                    if (incrementPage > totalPage) {
                                        getSupplier(searchSupplier, limitSupplier, 1, (status, response) => {
                                            if (status) {
                                                let tr = ``
                                                response.forEach(element => {
                                                    tr += trSupplier(element)
                                                });
                                                $("#supplier-data").html(tr)
                                                numberPage = incrementPage
                                            }
                                            if (!status) {
                                                console.error(response)
                                            }
                                        })
                                    }
                                })
                            }
                            // failed get only last page product
                            if (!status) {
                                console.error(response)
                            }
                        })
                    }
                    // failed get supplier
                    if (!status) {
                        console.error(response)
                    }
                })

            }
            // if it doesn't exist supplier
            if (response < 1) {
                $("#supplier-data").html(trSupplierZero())
                $("#supplier-pagination").addClass("d-none")
            }
        }
        // failed get total supplier
        if (!status) {
            console.error(response)

        }
    })
    // get detail based on paramsid
    $(document).on("click", "#supplierDetail", function () {
        const supplier = this.dataset;
        const supplierName = supplier.suppliername
        const supplierInfo = supplier.supplierinfo
        const supplierImg = supplier.supplierimg
        $("#supplierDetailModalLabel").text(supplierName)
        $("#supplier-detail-name").text(supplierName)
        $("#supplier-detail-info").text(supplierInfo)
        // if exist photo
        if (supplierImg === "null") {
            $("#no-image").removeClass("d-none")
            $("#supplier-detail-img").attr('src', "")
        }
        // if it doesn't exist photo
        if (supplierImg !== "null") {
            $("#no-image").addClass("d-none")
            $("#supplier-detail-img").attr('src', supplierImg)
        }
    });
})
export const getSupplierAgain = () => {
    // get all value
    const searchSupplier = $("#supplier-search-input").val()
    const limitSupplier = parseInt($("#supplier-limit").val())
    const pageSupplier = parseInt($("#supplier-page-active").text().trim())
    // get total row supplier 
    getTotalSupplier(searchSupplier, (status, response) => {
        // success get total supplier
        if (status) {
            $("#totalAllSupplier").html(response)
            // if exist supplier
            if (response >= 1) {
                // get all supplier
                getSupplier(searchSupplier, limitSupplier, pageSupplier, (status, response) => {
                    if (status) {
                        let tr = ``
                        let option = ``
                        response.forEach(element => {
                            tr += trSupplier(element)
                            option += `<option value="${element.SupplierId}">${element.SupplierName}</option>`
                        });
                        $("#supplier-data").html(tr)
                        $("#inventory-refsupplier-create-name").html(option)
                        $("#supplier-pagination").removeClass("d-none")
                    }
                    if (!status) {
                        console.error(response)
                    }
                })
            }
            // if it doesn't exist supplier
            if (response < 1) {
                $("#supplier-data").html(trSupplierZero())
                $("#supplier-pagination").addClass("d-none")
            }
        }
        // failed get total supplier
        if (!status) {
            console.error(response)
        }
    })
}
