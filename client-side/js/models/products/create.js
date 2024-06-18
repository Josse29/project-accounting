import { insertProducts } from "../../../../serverless-side/functions/product.js";
import { getProductsAgain } from "./read.js";
import { createBlankValue, successActionProduct } from "./ui.js";

$(document).ready(function () {
    // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
    $("#submit_product").off("click");
    // create product
    $("#submit_product").on("click", () => {
        const productName = $("#product-name").val()
        const productPrice = $("#product-price").val()
        const productInfo = $("#product-keterangan").val()
        const productCategoryId = $("#create-categories-selection").val()
        const productImg = document.getElementById('create-image-product').files
        // with image
        if (productImg.length > 0) {
            const reader = new FileReader()
            reader.onload = () => {
                const imageBase64 = reader.result
                insertProducts(
                    productName,
                    productPrice,
                    productInfo,
                    imageBase64,
                    productCategoryId,
                    (status, response) => {
                        if (status) {
                            console.log("create with image")
                            console.log(response);
                            getProductsAgain();
                            successActionProduct(response)
                            createBlankValue()
                        }
                        if (!status) {
                            console.error(response);
                        }
                    }
                );
            }
            if (file[0]) {
                reader.readAsDataURL(file[0]);
            }
        }
        // without image
        if (productImg.length < 1) {
            insertProducts(
                productName,
                productPrice,
                productInfo,
                "null",
                productCategoryId,
                (status, response) => {
                    if (status) {
                        console.log(response);
                        console.log("upload imageless + form")
                        getProductsAgain();
                        createBlankValue()
                        successActionProduct(response)
                    }
                    if (!status) {
                        console.error(response);
                    }
                }
            );
        }
    });
    // cancel-product-create-image
    $("#cancel-image").on("click", () => {
        $("#create-image-product").val("")
        $("#section-image").addClass("d-none")
    })
})