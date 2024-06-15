import { getListSupplier, getSupplier, getTotalPageSupplier, getTotalRowSupplier } from "../../../../serverless-side/functions/supplier.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import { btnSupplierPage, trSupplier, trSupplierZero, trSupplierZeroSearch, updateActivePageButton } from "./ui.js";

$(document).ready(function () {
    // get all value
    const searchSupplier = $("#supplier-search-input").val()
    const limitSupplier = parseInt($("#supplier-limit").val())
    // get total row supplier, get all supplier, get total page&pagination, search supplier 
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
                        reinitializeTooltips()
                    }
                    // failed get supplier
                    if (!status) {
                        console.error(response)
                    }
                })
                // get only last page product and pagination
                getTotalPageSupplier(limitSupplier, searchSupplier, (status, response) => {
                    // if success get only last page product
                    if (status) {
                        // update ui for paginate based on total page
                        let uiBtnPaginate = ``
                        for (let i = 1; i <= response; i++) {
                            uiBtnPaginate += btnSupplierPage(i)
                        }
                        $("#supplier-number-page").html(uiBtnPaginate)
                        // pagination
                        const supplierBtnPage = document.getElementsByClassName("supplier-btn-page");
                        // first page
                        $("#supplier-first-page").on("click", () => {
                            getSupplierPage(searchSupplier, limitSupplier, 1, supplierBtnPage);
                        })
                        // previous page mckkk
                        $("#supplier-prev-page").on("click", () => {
                            let pageActive = parseInt($(".supplier-active-page").text().trim());
                            let totalPage = parseInt(response);
                            let decrementPage = pageActive - 1;
                            if (decrementPage < 1) {
                                decrementPage = totalPage;
                            }
                            getSupplierPage(searchSupplier, limitSupplier, decrementPage, supplierBtnPage);
                        })
                        // based event on click mckkkk
                        for (let i = 0; i < response; i++) {
                            supplierBtnPage[i].addEventListener("click", function () {
                                const pageNumber = parseInt(this.textContent.trim());
                                getSupplierPage(searchSupplier, limitSupplier, pageNumber, supplierBtnPage);
                            });
                        }
                        // next page mckkk
                        $("#supplier-next-page").on("click", () => {
                            let pageNumber = parseInt($(".supplier-active-page").text().trim());
                            let totalPage = parseInt(response);
                            let incrementPage = pageNumber + 1;
                            if (incrementPage > totalPage) {
                                incrementPage = 1;
                            }
                            getSupplierPage(searchSupplier, limitSupplier, incrementPage, supplierBtnPage);
                        })
                        // last page 
                        $("#supplier-last-page").on("click", () => {
                            const lastPage = parseInt(response)
                            getSupplierPage(searchSupplier, limitSupplier, lastPage, supplierBtnPage)
                        })
                    }
                    // failed get only last page product
                    if (!status) {
                        console.error(response)
                    }
                })
                // get all supplier based on value search product event keyup
                $("#supplier-search-input").on("keyup", () => {
                    getSupplierSearch()
                })
                // get all supplier based on value search product event keyup
                $("#supplier-search-btn").on("click", () => {
                    getSupplierSearch()
                })
                // get all based on limit
                $("#supplier-limit").on('change', () => {
                    getSupplierAgain()
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
        // if it no information further
        if (supplierInfo === "") {
            $("#supplier-detail-info").text("-")
        }
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
    const pageSupplier = 1;
    // get total row supplier 
    getTotalRowSupplier(searchSupplier, (status, response) => {
        // success get total supplier
        if (status) {
            $("#totalAllSupplier").html(response)
            // if exist supplier
            if (response >= 1) {
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
                getSupplier(searchSupplier, limitSupplier, pageSupplier, (status, response) => {
                    if (status) {
                        let tr = ``
                        let option = ``
                        response.forEach(element => {
                            tr += trSupplier(element)
                        });
                        $("#supplier-data").html(tr)
                        $("#inventory-refsupplier-create-name").html(option)
                        $("#supplier-pagination").removeClass("d-none")
                        reinitializeTooltips()
                    }
                    if (!status) {
                        console.error(response)
                    }
                })
                // get only last page product and pagination
                getTotalPageSupplier(limitSupplier, searchSupplier, (status, response) => {
                    // if success get only last page product
                    if (status) {
                        // update ui for paginate based on total page
                        let uiBtnPaginate = ``
                        for (let i = 1; i <= response; i++) {
                            uiBtnPaginate += btnSupplierPage(i)
                        }
                        $("#supplier-number-page").html(uiBtnPaginate)
                        // pagination
                        const supplierBtnPage = document.getElementsByClassName("supplier-btn-page");
                        // first page
                        $("#supplier-first-page").on("click", () => {
                            getSupplierPage(searchSupplier, limitSupplier, 1, supplierBtnPage);
                        })
                        // previous page mckkk
                        $("#supplier-prev-page").on("click", () => {
                            let pageActive = parseInt($(".supplier-active-page").text().trim());
                            let totalPage = parseInt(response);
                            let decrementPage = pageActive - 1;
                            if (decrementPage < 1) {
                                decrementPage = totalPage;
                            }
                            getSupplierPage(searchSupplier, limitSupplier, decrementPage, supplierBtnPage);
                        })
                        // based event on click mckkkk
                        for (let i = 0; i < response; i++) {
                            supplierBtnPage[i].addEventListener("click", function () {
                                console.log(this)
                                let pageNumber = parseInt(this.textContent.trim());
                                getSupplierPage(searchSupplier, limitSupplier, pageNumber, supplierBtnPage);
                            });
                        }
                        // next page mckkk
                        $("#supplier-next-page").on("click", () => {
                            let pageNumber = parseInt($(".supplier-active-page").text().trim());
                            let totalPage = parseInt(response);
                            let incrementPage = pageNumber + 1;
                            if (incrementPage > totalPage) {
                                incrementPage = 1;
                            }
                            getSupplierPage(searchSupplier, limitSupplier, incrementPage, supplierBtnPage);
                        })
                        // last page 
                        $("#supplier-last-page").on("click", () => {
                            const lastPage = parseInt(response)
                            getSupplierPage(searchSupplier, limitSupplier, lastPage, supplierBtnPage)
                        })
                    }
                    // failed get only last page product
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
export function getSupplierPage(searchSupplier, limitSupplier, pageNumber, supplierBtnPage) {
    getSupplier(searchSupplier, limitSupplier, pageNumber, (status, response) => {
        if (status) {
            let tr = ``;
            response.forEach(element => {
                tr += trSupplier(element);
            });
            $("#supplier-data").html(tr);
            updateActivePageButton(pageNumber, supplierBtnPage)
            reinitializeTooltips()
        } else {
            console.error(response);
        }
    });
}
export const getSupplierSearch = () => {
    // get all value
    const searchSupplier = $("#supplier-search-input").val()
    const limitSupplier = parseInt($("#supplier-limit").val())
    const pageSupplier = parseInt($(".supplier-active-page").text().trim());
    // get total row supplier 
    getTotalRowSupplier(searchSupplier, (status, response) => {
        // success get total supplier
        if (status) {
            $("#totalAllSupplier").html(response)
            // if exist supplier
            if (response >= 1) {
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
                getSupplier(searchSupplier, limitSupplier, pageSupplier, (status, response) => {
                    if (status) {
                        let tr = ``
                        let option = ``
                        response.forEach(element => {
                            tr += trSupplier(element)
                        });
                        $("#supplier-data").html(tr)
                        $("#inventory-refsupplier-create-name").html(option)
                        $("#supplier-pagination").removeClass("d-none")
                    }
                    if (!status) {
                        console.error(response)
                    }
                })
                // get only last page product and pagination
                getTotalPageSupplier(limitSupplier, searchSupplier, (status, response) => {
                    // if success get only last page product
                    if (status) {
                        // update ui for paginate based on total page
                        let uiBtnPaginate = ``
                        for (let i = 1; i <= response; i++) {
                            uiBtnPaginate += btnSupplierPage(i)
                        }
                        $("#supplier-number-page").html(uiBtnPaginate)
                        // pagination
                        const supplierBtnPage = document.getElementsByClassName("supplier-btn-page");
                        // first page
                        $("#supplier-first-page").on("click", () => {
                            getSupplierPage(searchSupplier, limitSupplier, 1, supplierBtnPage);
                        })
                        // previous page mckkk
                        $("#supplier-prev-page").on("click", () => {
                            let pageActive = parseInt($(".supplier-active-page").text().trim());
                            let totalPage = parseInt(response);
                            let decrementPage = pageActive - 1;
                            if (decrementPage < 1) {
                                decrementPage = totalPage;
                            }
                            getSupplierPage(searchSupplier, limitSupplier, decrementPage, supplierBtnPage);
                        })
                        // based event on click mckkkk
                        for (let i = 0; i < response; i++) {
                            supplierBtnPage[i].addEventListener("click", function () {
                                let pageNumber = parseInt(this.textContent.trim());
                                getSupplierPage(searchSupplier, limitSupplier, pageNumber, supplierBtnPage);
                            });
                        }
                        // next page mckkk
                        $("#supplier-next-page").on("click", () => {
                            let pageNumber = parseInt($(".supplier-active-page").text().trim());
                            let totalPage = parseInt(response);
                            let incrementPage = pageNumber + 1;
                            if (incrementPage > totalPage) {
                                incrementPage = 1;
                            }
                            getSupplierPage(searchSupplier, limitSupplier, incrementPage, supplierBtnPage);
                        })
                        // last page 
                        $("#supplier-last-page").on("click", () => {
                            const lastPage = parseInt(response)
                            getSupplierPage(searchSupplier, limitSupplier, lastPage, supplierBtnPage)
                        })
                    }
                    // failed get only last page product
                    if (!status) {
                        console.error(response)
                    }
                })
            }
            // if it doesn't exist supplier
            if (response < 1) {
                $("#supplier-data").html(trSupplierZeroSearch(searchSupplier))
                $("#supplier-pagination").addClass("d-none")
            }
        }
        // failed get total supplier
        if (!status) {
            console.error(response)
        }
    })
}