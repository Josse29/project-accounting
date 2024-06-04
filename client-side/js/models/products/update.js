import { getCategory } from "../../../../serverless-side/functions/categories.js";
import { updateProduct } from "../../../../serverless-side/functions/product.js";
import { uiListCategory } from "../categories/ui.js";
import { getProductsAgain } from "./read.js";
import { successActionProduct } from "./ui.js";

$(document).ready(function () {
    // upadte | event binding
    $(document).on("click", "#editProduct", function () {

        // get value from params 
        const product = this.dataset;

        // all-input-product
        $("#editProductModalLabel").html(product.productname)
        $("#edit-product-name").val(product.productname)
        $("#edit-product-price").val(product.productprice)
        $("#edit-product-keterangan").val(product.productketerangan)

        // it doesn't exist productimage from params
        if (product.productimage === "null") {
            $("img#edit-product-image").attr("src", "")
            $("#section-edit-product-img").addClass("d-none")
        }

        // it exist productimage from params
        if (product.productimage !== "null") {
            $("#section-edit-product-img").removeClass("d-none")
            $("img#edit-product-image").attr("src", product.productimage)
        }
        // mckkkk
        getCategory((status, response) => {
            if (status) {
                let categoyEditProduct = ``
                response.forEach((el) => {
                    let selected = el.CategoryId === parseInt(product.productcategory) ? ' selected' : '';
                    categoyEditProduct += `<option value="${el.CategoryId}"${selected}>${el.CategoryName}</option>`;
                });
                console.log(categoyEditProduct);
                // $("#edit-category-product").html(categoyEditProduct);
            } else {
                console.error(response);
            }
        });
        // action image kesell xxx
        $("#edit-product-submit").on("click", () => {

            // all - input
            const productId = product.productid
            const productCategoryId = product.productcategory
            const productName = $("#edit-product-name").val()
            const productPrice = $("#edit-product-price").val()
            const productInfo = $("#edit-product-keterangan").val()
            const file = document.getElementById('edit-product-image-file').files
            // $("#edit-category-product")

            // with image
            if (file.length > 0) {
                const reader = new FileReader()
                reader.onload = function () {
                    const imgbase64 = reader.result
                    updateProduct(productId, productName, productPrice, productInfo, imgbase64, (status, response) => {
                        if (status) {
                            console.log(response)
                            getProductsAgain()
                            successActionProduct(response)
                        }
                        if (!status) {
                            console.log(response)
                        }
                    })
                }
                if (file[0]) {
                    reader.readAsDataURL(file[0])
                }
            }
            // without image
            if (file.length < 1) {
                updateProduct(productId, productName, productPrice, productInfo, "", (status, response) => {
                    if (status) {
                        console.log(response)
                        getProductsAgain()
                        successActionProduct(response)
                    }
                    if (!status) {
                        console.error(response)
                    }
                })
            }
        })

        // remove-image
        $("#edit-product-cancel-image").on("click", () => {
            db.run(`UPDATE products
                    SET image = 'null'
                    WHERE id = '${product.productid}'`, (err) => {
                if (!err) {
                    console.log("berhasil-hapus gambar ")
                    $("#edit-product-image-file").val("")
                    $("#section-edit-product-img").addClass("d-none")
                    getProductsAgain()
                }
                if (err) {
                    console.log(err)
                    console.log("gagal-hapus-gambar")
                }
            })
        })
    });
})