import { getProductsAgain } from "./read.js";

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

        // action image kesell xxx
        $("#edit-product-submit").on("click", () => {

            // with image
            const file = document.getElementById('edit-product-image-file').files
            if (file.length > 0) {
                const reader = new FileReader()
                reader.onload = function () {
                    const imgbase64 = reader.result
                    db.run(`UPDATE products
                            SET name = '${$("#edit-product-name").val()}',
                                price = '${$("#edit-product-price").val()}',
                                keterangan = '${$("#edit-product-keterangan").val()}', 
                                image = '${imgbase64}'
                            WHERE id = '${product.productid}'`, (err) => {
                        if (!err) {
                            console.log("berhasil diupdated dengan gambar")
                            getProductsAgain()
                        }
                        if (err) {
                            console.log(err)
                            console.log("gagal updated")
                        }
                    })
                }
                if (file[0]) {
                    reader.readAsDataURL(file[0])
                }
            }
            // without image
            if (file.length < 1) {
                db.run(`UPDATE products
                      SET name = '${$("#edit-product-name").val()}',
                          price = '${$("#edit-product-price").val()}',
                          keterangan = '${$("#edit-product-keterangan").val()}'
                      WHERE id = '${product.productid}'`, (err) => {
                    if (!err) {
                        console.log("berhasil diupdated tanpa gambar")
                        getProductsAgain()
                    }
                    if (err) {
                        console.log(err)
                        console.log("gagal updated")
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