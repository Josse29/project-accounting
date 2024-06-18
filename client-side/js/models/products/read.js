import { getListProduct, getProducts, getTotalPageProduct, getTotalRowProduct } from "../../../../serverless-side/functions/product.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import { btnProductPage, trProductZero, trProductZeroSearch, uiActivePageButton, uiOption, uitrProduct } from "./ui.js";

$(document).ready(function () {
    let productSearch = $("#product-search-input").val();
    let productLimit = parseInt($("#product-limit").val());
    let productCurrentPage = 1;
    let productTotalRow;
    let productTotalPage;
    let productBtnPage;
    // Function to update product based on page number
    function getProductPage(productPageNumber) {
        // function to only get product based on search, limit, page
        getProducts(productSearch, productLimit, productPageNumber, (status, response) => {
            // if success 
            if (status) {
                let tr = '';
                response.forEach(element => {
                    tr += uitrProduct(element);
                });
                $("#product-data").html(tr);
                uiActivePageButton(productPageNumber, productBtnPage);
                reinitializeTooltips();
            }
            // if failed
            if (!status) {
                console.error(response)
            }
        });
        // get-detail-product event binding fuckkkkkkk 2 jam lebih
        $(document).on("click", "#productDetailBtn", function () {
            const product = this.dataset;
            console.log(product)
            $("#detailProductModalLabel").html(product.productname)
            $("#detail-product-name").text(product.productname)
            // if exist image
            if (product.productimage !== "null") {
                $("img#detail-product-image").attr("src", product.productimage)
                $("#detail-product-image").removeClass("d-none")
                $("#detail-no-image").text(``)
            }
            // if not exist image
            if (product.productimage === "null") {
                $("#detail-product-image").addClass("d-none")
                $("#detail-no-image").text(`no - image displayed`)
                $("img#detail-product-image").attr("src", "")
            }
            $("#detail-product-price").text(product.productprice)
            $("#detail-category-price").text(product.productcategory)
            $("#detail-product-keterangan").text(product.productketerangan)
        });
    }
    // Function to re=initialize pagination
    function reInitializePagination(response) {
        let uiBtnPaginate = '';
        for (let i = 1; i <= response; i++) {
            uiBtnPaginate += btnProductPage(i);
        }
        $("#product-number-page").html(uiBtnPaginate);
        // Event listeners for pagination buttons
        productBtnPage = document.getElementsByClassName("product-btn-page");
        productTotalPage = response
        // first page
        $("#product-first-page").off('click').on("click", () => {
            getProductPage(1)
        });
        // previous page
        $("#product-prev-page").off("click").on("click", () => {
            let pageActive = parseInt($(".product-active-page").text().trim());
            let decrementPage = pageActive - 1;
            if (decrementPage < 1) {
                decrementPage = productTotalPage;
            }
            getProductPage(decrementPage);

        });
        // based on number when clicked
        for (let i = 0; i < productTotalPage; i++) {
            productBtnPage[i].addEventListener("click", function () {
                const pageNumber = parseInt(this.textContent.trim());
                getProductPage(pageNumber);
            });
        }
        // next page 
        $("#product-next-page").off("click").on("click", () => {
            let pageActive = parseInt($(".product-active-page").text().trim());
            let incrementPage = pageActive + 1;
            if (incrementPage > productTotalPage) {
                incrementPage = 1;
            }
            getProductPage(incrementPage);
            console.log(pageActive)
        });
        // last page
        $("#product-last-page").off('click').on("click", () => getProductPage(productTotalPage));

        // Initial page load
        getProductPage(productCurrentPage);
    }
    // Function to handle search based on supplier
    function getProductSearch() {
        productSearch = $("#product-search-input").val();
        productCurrentPage = 1; // Reset page to 1 on search
        // get only total row product
        getTotalRowProduct(productSearch, (status, response) => {
            // success get total row product
            if (status) {
                productTotalRow = response
                $("#product-total-row").html(productTotalRow);
                // if it exist product
                if (response >= 1) {
                    // get only total page product
                    getTotalPageProduct(productLimit, productSearch, (status, response) => {
                        if (status) {
                            productTotalPage = parseInt(response)
                            reInitializePagination(productTotalPage);
                            $("#product-pagination").removeClass("d-none");
                        }
                        if (!status) {
                            console.error(response)
                        }
                    });
                }
                // if it doesn't exist product
                if (response < 1) {
                    $("#product-data").html(trProductZeroSearch(productSearch));
                    $("#product-pagination").addClass("d-none");
                }
            }
            // failed get total row product
            if (!status) {
                console.error(response);
            }
        });
    }
    // Initial fetch and setup
    function getProductAgain() {
        productSearch = $("#product-search-input").val();
        // get only total row product
        getTotalRowProduct(productSearch, (status, response) => {
            // success get total row product
            if (status) {
                const productTotalRow = response
                $("#product-total-row").html(productTotalRow);
                // if it exist product
                if (response >= 1) {
                    // get only list product
                    getListProduct((status, response) => {
                        if (status) {
                            let option = '';
                            response.forEach(element => {
                                option += uiOption(element);
                            });
                            $("#inventory-refproduct-create-name").html(option);
                        }
                        if (!status) {
                            console.error(response)
                        }
                    });
                    // get only total page product
                    getTotalPageProduct(productLimit, productSearch, (status, response) => {
                        if (status) {
                            productTotalPage = parseInt(response)
                            reInitializePagination(productTotalPage);
                            $("#product-pagination").removeClass("d-none");
                        }
                        if (!status) {
                            console.error(response)
                        }
                    });
                }
                // if it doesn't exist product
                if (response < 1) {
                    $("#product-data").html(trProductZero());
                    $("#product-pagination").addClass("d-none");
                }
            }
            // failed get total row product
            if (!status) {
                console.error(response);
            }
        });
    }
    // Function to handle limit change
    $("#product-limit").on('change', () => {
        productLimit = parseInt($("#product-limit").val());
        productCurrentPage = 1; // Reset page to 1 on limit change
        getProductAgain(); // Re-fetch suppliers based on new limit
    });
    // Search functionality
    $("#product-search-input").on("keyup", getProductSearch);
    $("#product-search-span").on("click", getProductSearch);
    // Initial load
    getProductAgain();
})

// Initial fetch and setup
export function getProductsAgain() {
    let productSearch = $("#product-search-input").val();
    let productLimit = parseInt($("#product-limit").val());
    let productCurrentPage = 1; // Initial page
    let productTotalRow;
    let productTotalPage;
    let productBtnPage;
    // Function to update product based on page number
    function getProductPage(productPageNumber) {
        getProducts(productSearch, productLimit, productPageNumber, (status, response) => {
            if (status) {
                let tr = '';
                response.forEach(element => {
                    tr += uitrProduct(element);
                });
                $("#product-data").html(tr);
                uiActivePageButton(productPageNumber, productBtnPage); // Ensure active page button
                reinitializeTooltips();
            }
            if (!status) {
                console.error(response)
            }
        });
    }
    // Function to initialize pagination
    function reInitializePagination(response) {
        let uiBtnPaginate = '';
        for (let i = 1; i <= response; i++) {
            uiBtnPaginate += btnProductPage(i);
        }
        $("#product-number-page").html(uiBtnPaginate);
        // Event listeners for pagination buttons
        productBtnPage = document.getElementsByClassName("product-btn-page");
        productTotalPage = response
        // first page
        $("#product-first-page").off('click').on("click", () => {
            getProductPage(1)
        });
        // previous page
        $("#product-prev-page").off('click').on("click", () => {
            let pageActive = parseInt($(".product-active-page").text().trim());
            let decrementPage = pageActive - 1;
            if (decrementPage < 1) {
                decrementPage = productTotalPage;
            }
            getProductPage(decrementPage);
        });
        // based on number when clicked
        for (let i = 0; i < productTotalPage; i++) {
            productBtnPage[i].addEventListener("click", function () {
                const pageNumber = parseInt(this.textContent.trim());
                getProductPage(pageNumber);
            });
        }
        // next page 
        $("#product-next-page").off('click').on("click", () => {
            let pageActive = parseInt($(".product-active-page").text().trim());
            let incrementPage = pageActive + 1;
            if (incrementPage > productTotalPage) {
                incrementPage = 1;
            }
            getProductPage(incrementPage);
        });
        // last page
        $("#product-last-page").off('click').on("click", () => getProductPage(productTotalPage));

        // Initial page load
        getProductPage(productCurrentPage);
    }
    // get only total row product
    getTotalRowProduct(productSearch, (status, response) => {
        // success get total row product
        if (status) {
            productTotalRow = response
            $("#product-total-row").html(productTotalRow);
            // if it exist product
            if (response >= 1) {
                // get only list product
                getListProduct((status, response) => {
                    if (status) {
                        let option = '';
                        response.forEach(element => {
                            option += uiOption(element);
                        });
                        $("#inventory-refproduct-create-name").html(option);
                    }
                    if (!status) {
                        console.error(response)
                    }
                });
                // get only total page product
                getTotalPageProduct(productLimit, productSearch, (status, response) => {
                    if (status) {
                        productTotalPage = parseInt(response)
                        reInitializePagination(productTotalPage);
                        $("#product-pagination").removeClass("d-none");
                    }
                    if (!status) {
                        console.error(response)
                    }
                });
            }
            // if it doesn't exist product
            if (response < 1) {
                $("#pproduct-data").html(trProductZero());
                $("#supplier-pagination").addClass("d-none");
            }
        }
        // failed get total row product
        if (!status) {
            console.error(response);
        }
    });
}