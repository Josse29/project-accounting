import { deleteProductId } from "../../../../serverless-side/functions/product.js";
import { getProductsAgain } from "./read.js";
import { successActionProduct } from "./ui.js";

$(document).ready(function () {
    // Delete Product event binding mckkkk
    $(document).on("click", "#deleteProduct", function () {
        const product = this.dataset;
        const konfirmasiDelete = `Apakah anda yakin menghapus - <span class="fw-bold">${product.productname}</span> ?`;
        $("#confirmDeleteProductModalLabel").html(product.productname);
        $("#confirm-text").html(konfirmasiDelete);
        $("#sureDelete").on("click", () => {
            deleteProductId(product.productid, product.productname, (status, response) => {
                if (status) {
                    console.log(response);
                    getProductsAgain();
                    successActionProduct(response)
                }
                if (!status) {
                    console.error(response);
                }
            });
        });
    });
})