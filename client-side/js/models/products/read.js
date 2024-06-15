import { getListProduct, getProducts, getTotalPageProduct, getTotalRowProduct } from "../../../../serverless-side/functions/product.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import { btnProductPage, trProductZero, trProductZeroSearch, uitrProduct, updateActivePageButton } from "./ui.js";


$(document).ready(function () {
    // get total row , get all product, lastPageProduct
    getTotalRowProduct($("input#search-product").val(), (status, response) => {
        // success get total row product
        if (status) {
            $("#totalAllProduct").html(response)
            // if total row product is equal greater than 1 |  exist product
            if (response >= 1) {
                $("#product-pagination").removeClass("d-none")
                const searchProduct = $("input#search-product").val()
                const limitProduct = parseInt($("#product_limit").val())
                // get all product
                getProducts(
                    searchProduct,
                    limitProduct,
                    1,
                    (status, response) => {
                        if (status) {
                            let tr = ``;
                            response.forEach((el) => {
                                tr += uitrProduct(el);
                            });
                            $("#data-products").html(tr);
                            reinitializeTooltips()
                            $("#paginationProduct").removeClass("d-none")
                        }
                        if (!status) {
                            console.error(response)
                        }
                    }
                );
                // get only product without limit and offset
                getListProduct((status, response) => {
                    if (status) {
                        let option = ``
                        response.forEach((el) => {
                            option += `<option value="${el.ProductId}">${el.ProductName}</option>`
                        })
                        $("#inventory-refproduct-create-name").html(option)
                    }
                    if (!status) {
                        console.error(response)
                    }
                });
                // get only page product and update pagination
                getTotalPageProduct(
                    limitProduct,
                    searchProduct,
                    (status, response) => {
                        if (status) {
                            // update ui for paginate based on total page
                            let uiBtnPaginate = ``
                            for (let i = 1; i <= response; i++) {
                                uiBtnPaginate += btnProductPage(i)
                            }
                            $("#product-number-page").html(uiBtnPaginate)
                            // pagination
                            const productBtnPage = document.getElementsByClassName("product-btn-page");
                            // get first page product
                            $("#product-first-page").on("click", () => {
                                getProductPage(searchProduct, limitProduct, 1, productBtnPage);
                            });
                            // get previous page product
                            $("#product-prev-page").on("click", () => {
                                let activePage = parseInt($(".product-active-page").text().trim());
                                let totalPage = response
                                let decrementPage = activePage - 1
                                if (decrementPage < 1) {
                                    decrementPage = totalPage
                                }
                                getProductPage(searchProduct, limitProduct, decrementPage, productBtnPage);
                            });
                            // based event on click mckkkk
                            for (let i = 0; i < response; i++) {
                                productBtnPage[i].addEventListener("click", function () {
                                    const pageNumberActive = parseInt(this.textContent.trim());
                                    getProductPage(searchProduct, limitProduct, pageNumberActive, productBtnPage);
                                });
                            }
                            // get next page product
                            $("#product-next-page").on("click", () => {
                                let activePage = parseInt($(".product-active-page").text().trim());
                                let totalPage = response
                                let incrementPage = activePage + 1
                                if (incrementPage > totalPage) {
                                    incrementPage = 1
                                }
                                getProductPage(searchProduct, limitProduct, incrementPage, productBtnPage);
                            });
                            // get last page product
                            $("#product-last-page").on("click", () => {
                                getProductPage(searchProduct, limitProduct, response, productBtnPage);
                            });
                        }
                        if (!status) {
                            console.error(response);
                        }
                    }
                );
                // get product based on limit 
                $("#product_limit").on("change", function () {
                    getProductsAgain()
                });
                // get product based on value search product event keyup
                $("input#search-product").on("keyup", () => {
                    getProductSearch()
                });
                // get product based on value search product event click
                $("span#search-product").on("click", () => {
                    getProductSearch()
                });
            }
            // if total row product lesser than 1 | not exist product
            if (response < 1) {
                $("#data-products").html(trProductZero())
                $("#product-pagination").addClass("d-none")
            }
        }
        // failed get total row product
        if (!status) {
            console.error(response)
        }
    })
    // get-detail-product 
    $(document).on("click", "#detailProduct", function () {
        const product = this.dataset;

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
})

export const getProductsAgain = () => {
    // get total row , get all product, lastoffsetproducts
    const searchProduct = $("input#search-product").val()
    const limitProduct = parseInt($("#product_limit").val())
    const pageProduct = 1
    // get only total row product
    getTotalRowProduct(searchProduct, (status, response) => {
        // success get total row product
        if (status) {
            $("#totalAllProduct").html(response)
            // if total row product is equal greater than 1 |  exist product
            if (response >= 1) {
                // get only product 
                getProducts(
                    searchProduct,
                    limitProduct,
                    pageProduct,
                    (status, response) => {
                        if (status) {
                            let tr = ``;
                            response.forEach((el) => {
                                tr += uitrProduct(el);
                            });
                            $("#data-products").html(tr);
                            reinitializeTooltips()
                            $("#paginationProduct").removeClass("d-none")
                        }
                        if (!status) {
                            console.error(response)
                        }
                    }
                );
                // get only product without limit and offset
                getListProduct((status, response) => {
                    if (status) {
                        let option = ``
                        response.forEach((el) => {
                            option += `<option value="${el.ProductId}">${el.ProductName}</option>`
                        })
                        $("#inventory-refproduct-create-name").html(option)
                    }
                    if (!status) {
                        console.error(response)
                    }
                });
                // get only page product and update pagination
                getTotalPageProduct(
                    limitProduct,
                    searchProduct,
                    (status, response) => {
                        // success get only page product and update pagination
                        if (status) {
                            // update ui for paginate based on total page
                            let uiBtnPaginate = ``
                            for (let i = 1; i <= response; i++) {
                                uiBtnPaginate += btnProductPage(i)
                            }
                            $("#product-number-page").html(uiBtnPaginate)
                            // // pagination
                            // const productBtnPage = document.getElementsByClassName("product-btn-page");
                            // // get first page product
                            // $("#product-first-page").on("click", () => {
                            //     getProductPage(searchProduct, limitProduct, 1, productBtnPage);
                            // });
                            // // get previous page product
                            // $("#product-prev-page").on("click", () => {
                            //     let activePage = parseInt($(".product-active-page").text().trim());
                            //     let totalPage = response
                            //     let decrementPage = activePage - 1
                            //     if (decrementPage < 1) {
                            //         decrementPage = totalPage
                            //     }
                            //     getProductPage(searchProduct, limitProduct, decrementPage, productBtnPage);
                            // });
                            // // based event on click mckkkk
                            // for (let i = 0; i < response; i++) {
                            //     productBtnPage[i].addEventListener("click", function () {
                            //         const pageNumberActive = parseInt(this.textContent.trim());
                            //         getProductPage(searchProduct, limitProduct, pageNumberActive, productBtnPage);
                            //     });
                            // }
                            // // get next page product
                            // $("#product-next-page").on("click", () => {
                            //     let activePage = parseInt($(".product-active-page").text().trim());
                            //     let totalPage = response
                            //     let incrementPage = activePage + 1
                            //     if (incrementPage > totalPage) {
                            //         incrementPage = 1
                            //     }
                            //     getProductPage(searchProduct, limitProduct, incrementPage, productBtnPage);
                            // });
                            // // get last page product
                            // $("#product-last-page").on("click", () => {
                            //     getProductPage(searchProduct, limitProduct, response, productBtnPage);
                            // });
                        }
                        // failed get only page product and update pagination
                        if (!status) {
                            console.error(response);
                        }
                    }
                );
            }
            // if total row product lesser than 1 | not exist product
            if (response < 1) {
                $("#data-products").html(trProductZero())
                $("#paginationProduct").addClass("d-none")
            }
        }
        // failed get total row product
        if (!status) {
            console.error(response)
        }
    })
};
export const getProductPage = (searchProduct, limitProduct, pageNumberActive, productBtnPage) => {
    getProducts(
        searchProduct,
        limitProduct,
        pageNumberActive,
        (status, response) => {
            if (status) {
                let tr = ``;
                response.forEach((el) => {
                    tr += uitrProduct(el);
                });
                $("#data-products").html(tr);
                reinitializeTooltips()
                updateActivePageButton(pageNumberActive, productBtnPage)
            }
            if (!status) {
                console.error(response)
            }
        }
    );
}
export const getProductSearch = () => {
    // get total row , get all product, lastoffsetproducts
    const searchProduct = $("input#search-product").val()
    const limitProduct = parseInt($("#product_limit").val())
    const activePageProduct = parseInt($(".product-active-page").text().trim());
    // get only total row product
    getTotalRowProduct(searchProduct, (status, response) => {
        // success get total row product while search
        if (status) {
            $("#totalAllProduct").html(response)
            // if total row product is equal greater than 1 |  exist product
            if (response >= 1) {
                $("#product-pagination").removeClass("d-none")
                //get only product with limit and offset while search
                getProducts(
                    searchProduct,
                    limitProduct,
                    activePageProduct,
                    (status, response) => {
                        if (status) {
                            let tr = ``;
                            response.forEach((el) => {
                                tr += uitrProduct(el);
                            });
                            $("#data-products").html(tr);
                            reinitializeTooltips()
                            $("#paginationProduct").removeClass("d-none")
                        }
                        if (!status) {
                            console.error(response)
                        }
                    }
                );
                // get only product without limit and offset
                getListProduct((status, response) => {
                    if (status) {
                        let option = ``
                        response.forEach((el) => {
                            option += `<option value="${el.ProductId}">${el.ProductName}</option>`
                        })
                        $("#inventory-refproduct-create-name").html(option)
                    }
                    if (!status) {
                        console.error(response)
                    }
                });
                // get only page product and update pagination
                getTotalPageProduct(
                    limitProduct,
                    searchProduct,
                    (status, response) => {
                        // success get total page product
                        if (status) {
                            // update ui for paginate based on total page
                            let uiBtnPaginate = ``
                            for (let i = 1; i <= response; i++) {
                                uiBtnPaginate += btnProductPage(i)
                            }
                            $("#product-number-page").html(uiBtnPaginate)
                            // pagination
                            const productBtnPage = document.getElementsByClassName("product-btn-page");
                            // get first page product
                            $("#product-first-page").on("click", () => {
                                getProductPage(searchProduct, limitProduct, 1, productBtnPage);
                            });
                            // get previous page product
                            $("#product-prev-page").on("click", () => {
                                let activePage = parseInt($(".product-active-page").text().trim());
                                let totalPage = response
                                let decrementPage = activePage - 1
                                if (decrementPage < 1) {
                                    decrementPage = totalPage
                                }
                                getProductPage(searchProduct, limitProduct, decrementPage, productBtnPage);
                            });
                            // based event on click mckkkk
                            for (let i = 0; i < response; i++) {
                                productBtnPage[i].addEventListener("click", function () {
                                    const pageNumberActive = parseInt(this.textContent.trim());
                                    getProductPage(searchProduct, limitProduct, pageNumberActive, productBtnPage);
                                });
                            }
                            // get next page product
                            $("#product-next-page").on("click", () => {
                                let activePage = parseInt($(".product-active-page").text().trim());
                                let totalPage = response
                                let incrementPage = activePage + 1
                                if (incrementPage > totalPage) {
                                    incrementPage = 1
                                }
                                getProductPage(searchProduct, limitProduct, incrementPage, productBtnPage);
                            });
                            // get last page product
                            $("#product-last-page").on("click", () => {
                                getProductPage(searchProduct, limitProduct, response, productBtnPage);
                            });
                        }
                        // failed get total page product
                        if (!status) {
                            console.error(response);
                        }
                    }
                );
            }
            // if total row product lesser than 1 | not exist product
            if (response < 1) {
                $("#data-products").html(trProductZeroSearch(searchProduct))
                $("#product-pagination").addClass("d-none")
            }
        }
        // failed get total row product while search
        if (!status) {
            console.error(response)
        }
    })
};
