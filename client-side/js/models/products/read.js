import { getProducts, getTotalProduct, lastOffsetProducts } from "../../../../serverless-side/functions/product.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import { trProductZero, trProductZeroSearch, uitrProduct } from "./ui.js";


$(document).ready(function () {

    // get total row , get all product, lastoffsetproducts
    getTotalProduct($("input#search-product").val(), (status, response) => {
        if (status) {
            $("#totalAllProduct").html(response)
            // if total row product lesser than 1 | not exist product
            if (response < 1) {
                $("#data-products").html(trProductZero())
                $("#paginationProduct").addClass("d-none")
            }
            // if total row product is equal greater than 1 | not exist product
            if (response >= 1) {
                getProducts(
                    $("input#search-product").val(),
                    $("#product_limit").val(),
                    $("#product_offset").text().trim(),
                    (status, response) => {
                        if (status) {
                            let tr = ``;
                            response.forEach((el) => {
                                tr += uitrProduct(el);
                            });
                            $("#data-products").html(tr);
                            reinitializeTooltips()
                            $("#paginationProduct").removeClass("d-none")
                            lastOffsetProducts(
                                $("#product_limit").val(),
                                $("input#search-product").val(),
                                (status, response) => {
                                    if (status) {
                                        $("#product_offset_last").text(response);
                                    }
                                    if (!status) {
                                        console.error(response);
                                    }
                                }
                            );
                        }
                        if (!status) { console.error(response) }
                    }
                );
            }
        }
        if (!status) {
            console.error(response)
        }
    })
    // get first page product
    $("#product_first_page").on("click", () => {
        getProducts(
            $("input#search-product").val(),
            $("#product_limit").val(),
            1,
            (status, response) => {
                if (status) {
                    let tr = ``;
                    response.forEach((el) => {
                        tr += uitrProduct(el);
                    });
                    $("#data-products").html(tr);
                    $("#product_offset").text(1);
                    reinitializeTooltips();
                }
                if (!status) {
                    console.err(response);
                }
            }
        );
    });

    // get previous page product
    $("#product_prev_page").on("click", () => {
        let limit = $("#product_limit").val();
        let offset = parseInt($("#product_offset").text().trim());
        let currentOffset = (offset -= 1);
        if (currentOffset >= 1) {
            getProducts(
                $("input#search-product").val(),
                limit,
                currentOffset,
                (status, response) => {
                    if (status) {
                        let tr = ``;
                        response.forEach((el) => {
                            tr += uitrProduct(el);
                        });
                        $("#data-products").html(tr);
                        $("#product_offset").text(currentOffset);
                        reinitializeTooltips();
                    }
                    if (!status) {
                        console.err(response);
                    }
                }
            );
        }
        if (currentOffset < 1) {
            getProducts(
                limit,
                $("#product_offset_last").text(),
                $("input#search-product").val(),
                (status, response) => {
                    if (status) {
                        let tr = ``;
                        response.forEach((el) => {
                            tr += uitrProduct(el);
                        });
                        $("#data-products").html(tr);
                        $("#product_offset").text($("#product_offset_last").text());
                    }
                    if (!status) {
                        console.err(response);
                    }
                }
            );
        }
    });

    // get next page product
    $("#product_next_page").on("click", () => {
        let limit = $("#product_limit").val();
        let lastOffset = $("#product_offset_last").text();
        let offset = parseInt($("#product_offset").text().trim());
        let currentOffset = (offset += 1);
        if (currentOffset <= lastOffset) {
            getProducts(
                $("input#search-product").val(),
                limit,
                currentOffset,
                (status, response) => {
                    if (status) {
                        let tr = ``;
                        response.forEach((el) => {
                            tr += uitrProduct(el);
                        });
                        $("#data-products").html(tr);
                        $("#product_offset").text(currentOffset);
                        reinitializeTooltips();
                    }
                    if (!status) {
                        console.err(response);
                    }
                }
            );
        }
        if (currentOffset > lastOffset) {
            getProducts(
                limit,
                1,
                $("input#search-product").val(),
                (status, response) => {
                    if (status) {
                        let tr = ``;
                        response.forEach((el) => {
                            tr += uitrProduct(el);
                        });
                        $("#data-products").html(tr);
                        $("#product_offset").text(1);
                        reinitializeTooltips();
                    }
                    if (!status) {
                        console.err(response);
                    }
                }
            );
        }
    });

    // get last page product
    $("#product_last_page").on("click", () => {
        getProducts(
            $("input#search-product").val(),
            $("#product_limit").val(),
            $("#product_offset_last").text(),
            (status, response) => {
                if (status) {
                    let tr = ``;
                    response.forEach((el) => {
                        tr += uitrProduct(el);
                    });
                    $("#data-products").html(tr);
                    $("#product_offset").text($("#product_offset_last").text());
                    reinitializeTooltips();
                }
                if (!status) {
                    console.err(response);
                }
            }
        );
    });

    // get product based on limit 
    $("#product_limit").change(function () {
        getProducts(
            $("input#search-product").val(),
            $(this).val(),
            1,
            (status, response) => {
                if (status) {
                    let tr = ``;
                    response.forEach((el) => {
                        tr += uitrProduct(el);
                    });
                    $("#data-products").html(tr);
                    $("#product_offset").text(1);
                    reinitializeTooltips();
                    lastOffsetProducts(
                        $("#product_limit").val(),
                        $("input#search-product").val(),
                        (status, response) => {
                            if (status) {
                                $("#product_offset_last").text(response);
                                console.log("last page : " + response);
                            }
                            if (!status) {
                                console.log(response);
                            }
                        }
                    );
                }
                if (!status) {
                    console.err(response);
                }
            }
        );
    });

    // // get-detail-product 
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

    // get product based on value search product event click
    $("span#search-product").on("click", () => {
        getProducts(
            $("input#search-product").val(),
            $("#product_limit").val(),
            $("#product_offset").text().trim(),
            (status, response) => {
                if (status) {
                    let tr = ``;
                    response.forEach((el) => {
                        tr += uitrProduct(el);
                    });
                    $("#data-products").html(tr);
                    reinitializeTooltips();
                    lastOffsetProducts(
                        $("#product_limit").val(),
                        $("input#search-product").val(),
                        (status, response) => {
                            if (status) {
                                $("#product_offset_last").text(response);
                                console.log("last page : " + response);
                            }
                            if (!status) {
                                console.log(response);
                            }
                        }
                    );
                }
                if (!status) {
                    console.err(response);
                }
            }
        );
    });

    // get product based on value search product event keyup
    $("input#search-product").on("keyup", () => {
        getProducts(
            $("input#search-product").val(),
            $("#product_limit").val(),
            $("#product_offset").text().trim(),
            (status, response) => {
                if (status) {
                    let tr = ``;
                    response.forEach((el) => {
                        tr += uitrProduct(el);
                    });
                    $("#data-products").html(tr);
                    reinitializeTooltips();
                    lastOffsetProducts(
                        $("#product_limit").val(),
                        $("input#search-product").val(),
                        (status, response) => {
                            if (status) {
                                $("#product_offset_last").text(response);
                                console.log("last page : " + response);
                            }
                            if (!status) {
                                console.log(response);
                            }
                        }
                    );
                    getTotalProduct($("input#search-product").val(), (status, response) => {
                        if (status) {
                            if (response < 1) {
                                $("#data-products").html(trProductZeroSearch($("input#search-product").val()));
                            }
                            $("#totalAllProduct").html(response)
                        }
                        if (!status) {
                            console.error(response)
                        }
                    })
                }
                if (!status) {
                    console.err(response);
                }
            }
        );
    });
})

export const getProductsAgain = () => {
    // get total row , get all product, lastoffsetproducts
    getTotalProduct($("input#search-product").val(), (status, response) => {
        if (status) {
            $("#totalAllProduct").html(response)
            // if total row product lesser than 1 | not exist product
            if (response < 1) {
                $("#data-products").html(trProductZero())
                $("#paginationProduct").addClass("d-none")
            }
            // if total row product is equal greater than 1 | not exist product
            if (response >= 1) {
                getProducts(
                    $("input#search-product").val(),
                    $("#product_limit").val(),
                    $("#product_offset").text().trim(),
                    (status, response) => {
                        if (status) {
                            let tr = ``;
                            response.forEach((el) => {
                                tr += uitrProduct(el);
                            });
                            $("#data-products").html(tr);
                            reinitializeTooltips()
                            $("#paginationProduct").removeClass("d-none")
                            lastOffsetProducts(
                                $("#product_limit").val(),
                                $("input#search-product").val(),
                                (status, response) => {
                                    if (status) {
                                        $("#product_offset_last").text(response);
                                    }
                                    if (!status) {
                                        console.error(response);
                                    }
                                }
                            );
                        }
                        if (!status) { console.error(response) }
                    }
                );
            }
        }
        if (!status) {
            console.error(response)
        }
    })
};