import { getProducts, lastOffsetProducts } from "../../../../serverless-side/functions/product.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import { uitrProduct } from "./ui.js";


$(document).ready(function () {

    // get all product
    getProducts(
        $("#product_limit").val(),
        $("#product_offset").text().trim(),
        $("input#search-product").val(),
        (status, response) => {
            if (status) {
                let tr = ``;
                response.forEach((el) => {
                    tr += uitrProduct(el);
                });
                $("#data-products").html(tr);
                reinitializeTooltips()
                lastOffsetProducts(
                    $("#product_limit").val(),
                    $("input#search-product").val(),
                    (status, response) => {
                        if (status) {
                            $("#product_offset_last").text(response);
                        }
                        if (!status) {
                            console.log(response);
                        }
                    }
                );
            } else {
                console.error(response);
            }
        }
    );

    // get first page product
    $("#product_first_page").on("click", () => {
        getProducts(
            $("#product_limit").val(),
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
    });

    // get previous page product
    $("#product_prev_page").on("click", () => {
        let limit = $("#product_limit").val();
        let offset = parseInt($("#product_offset").text().trim());
        let currentOffset = (offset -= 1);
        if (currentOffset >= 1) {
            getProducts(
                limit,
                currentOffset,
                $("input#search-product").val(),
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
                limit,
                currentOffset,
                $("input#search-product").val(),
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
            $("#product_limit").val(),
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
            $(this).val(),
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

    // get previous based on value search product
    $("span#search-product").on("click", () => {
        getProducts(
            $("#product_limit").val(),
            $("#product_offset").text().trim(),
            $("input#search-product").val(),
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

    // get-detail-product 
    $(document).on("click", "#detailProduct", function () {
        const product = this.dataset;
        console.log(product)
        $("#detailProductModalLabel").html(product.productname)
        $("#detail-product-name").text(product.productname)
        document.getElementById('detail-product-image').src = `${product.productimage}`
        if (product.productimage === "null") {
            $("#detail-product-image").addClass("d-none")
            $("#detail-no-image").text(`no - image displayed`)
        }
        $("#detail-product-price").text(product.productprice)
        $("#detail-category-price").text(product.productcategory)
        $("#detail-product-keterangan").text(product.productketerangan)
    });

})
export const getProductsAgain = () => {
    getProducts(
        $("#product_limit").val(),
        1,
        "",
        (status, response) => {
            if (status) {
                let tr = ``;
                response.forEach((el) => {
                    tr += uitrProduct(el);
                });
                $("#data-products").html(tr);
                reinitializeTooltips();
            }
            if (!status) {
                console.err(response);
            }
        }
    );
};