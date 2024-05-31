import { insertProducts } from "../../../../serverless-side/functions/product.js";
import { getProductsAgain } from "./read.js";

$(document).ready(function () {
    // create product
    $("#submit_product").on("click", () => {
        const file = document.getElementById('create-image-product').files
        // with image
        if (file.length > 0) {
            const reader = new FileReader()
            reader.onload = () => {
                const imageBase64 = reader.result
                insertProducts(
                    $("#product-name").val(),
                    $("#product-price").val(),
                    $("#product-keterangan").val(),
                    imageBase64,
                    (status, response) => {
                        if (status) {
                            console.log("upload image + form")
                            console.log(response);
                            getProductsAgain();
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
        if (file.length < 1) {
            insertProducts(
                $("#product-name").val(),
                $("#product-price").val(),
                $("#product-keterangan").val(),
                "null",
                (status, response) => {
                    if (status) {
                        console.log(response);
                        console.log("upload imageless + form")
                        getProductsAgain();
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