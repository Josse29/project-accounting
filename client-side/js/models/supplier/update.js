import { updateSupplier } from "../../../../serverless-side/functions/supplier.js"
import { getSupplierAgain } from "./read.js"
import { successActionSupplier } from "./ui.js"
$(document).ready(function () {
    $(document).on("click", "#supplierUpdate", function () {

        // get from params
        const supplier = this.dataset;

        // get vallue from params 
        $("#supplierUpdateModalLabel").text(supplier.suppliername)
        $("#supplier-update-name").val(supplier.suppliername)
        $("#supplier-update-info").val(supplier.supplierinfo)

        // with image 
        if (supplier.supplierimg !== "null") {
            $("#supplier-update-img-section").removeClass("d-none")
            $("#supplier-update-img-preview").attr("src", supplier.supplierimg)
        }

        // without img
        if (supplier.supplierimg === "null") {
            $("#supplier-update-img-section").addClass("d-none")
            $("#supplier-update-img-preview").attr("src", "")
        }

        // Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
        $("#supplier-update-submit").off("click");

        // event submit delete
        $("#supplier-update-submit").on("click", () => {
            const supplierId = parseInt(supplier.supplierid)
            const supplierName = $("#supplier-update-name").val()
            const supplierInfo = $("#supplier-update-info").val()
            const supplierImg = document.getElementById("supplier-update-img").files
            // with img
            if (supplierImg.length >= 1) {
                const reader = new FileReader()
                reader.onload = function () {
                    const supplierImgBase64 = reader.result
                    updateSupplier(supplierId, supplierName, supplierInfo, supplierImgBase64, (status, response) => {
                        if (status) {
                            successActionSupplier(response)
                            getSupplierAgain()
                        }
                        if (!status) {
                            console.error(response)
                        }
                    })
                }
                if (supplierImg[0]) {
                    reader.readAsDataURL(supplierImg[0])
                }
            }
            // without img
            if (supplierImg.length < 1) {
                updateSupplier(supplierId, supplierName, supplierInfo, "", (status, response) => {
                    if (status) {
                        successActionSupplier(response)
                        getSupplierAgain()
                    }
                    if (!status) {
                        console.error(response)
                    }
                })
            }
        })
        // canceling image
        $("#supplier-update-img-cancel").on("click", () => {
            db.run(`UPDATE Supplier 
                           SET SupplierImg = 'null'
                           WHERE SupplierId = ${parseInt(supplier.supplierid)}`, (err) => {
                if (!err) {
                    console.log("berhasil hapus gambar")
                    $("#supplier-update-img").val("")
                    $("#supplier-update-img-section").addClass("d-none")
                    getSupplierAgain()
                }
                if (err) {
                    console.error(err)
                }
            })
        })

    });
})
