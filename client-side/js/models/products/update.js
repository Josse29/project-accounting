import { updateProduct } from "../../../../serverless-side/functions/product.js";
import { getProductsAgain } from "./read.js";
import { successActionProduct } from "./ui.js";

$(document).ready(function () {
    // upadte | event binding
    $(document).off("click").on("click", "#editProduct", function () {
        // get value from params 
        const product = this.dataset;
        // all-input-product
        $("#editProductModalLabel").html(product.productname)
        $("#edit-product-name").val(product.productname)
        $("#edit-product-price").val(product.productprice)
        $("#edit-product-keterangan").val(product.productketerangan)
        // it doesn't exist productimage from params
        if (product.productimage === "null") {
            $("#section-edit-product-img").addClass("d-none")
            $("img#edit-product-image").attr("src", "")
        }
        // it exist productimage from params
        if (product.productimage !== "null") {
            $("#section-edit-product-img").removeClass("d-none")
            $("img#edit-product-image").attr("src", product.productimage)
        }
        // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
        $("#edit-product-submit").off("click");
        // action image kesell xxx
        $("#edit-product-submit").on("click", () => {
            // all - input
            const productId = parseInt(product.productid)
            const productName = $("#edit-product-name").val()
            const productCategoryId = $("#edit-category-product").val()
            const productPrice = $("#edit-product-price").val()
            const productInfo = $("#edit-product-keterangan").val()
            const productImg = document.getElementById('edit-product-image-file').files
            // with image
            if (productImg.length >= 1) {
                const reader = new FileReader()
                reader.onload = function () {
                    const imgbase64 = reader.result
                    updateProduct(productId, productName, productCategoryId, productPrice, productInfo, imgbase64, (status, response) => {
                        if (status) {
                            console.log(response)
                            getProductsAgain()
                            successActionProduct(response)
                            $("#edit-product-image-file").val("")
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
            if (productImg.length < 1) {
                updateProduct(productId, productName, productCategoryId, productPrice, productInfo, "", (status, response) => {
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