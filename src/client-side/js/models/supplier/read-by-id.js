import { getProductSupplierId } from "../../../../serverless-side/functions/product.js";
// get detail based on paramsid
$(document).ready(function () {
  $(document)
    .off("click", "#supplierDetail")
    .on("click", "#supplierDetail", async function () {
      try {
        const supplier = this.dataset;
        const supplierId = parseInt(supplier.supplierid);
        const supplierName = supplier.suppliername;
        const supplierInfo = supplier.supplierinfo;
        const supplierImg = supplier.supplierimg;
        $("#supplierDetailModalLabel").text(supplierName);
        $("#supplier-detail-name").text(supplierName);
        $("#supplier-detail-info").text(supplierInfo);
        // if it no information further
        if (supplierInfo === "") {
          $("#supplier-detail-info").text("-");
        }
        // if exist photo
        if (supplierImg === "null") {
          $("#no-image").removeClass("d-none");
          $("#supplier-detail-img").attr("src", "");
        }
        // if it doesn't exist photo
        if (supplierImg !== "null") {
          $("#no-image").addClass("d-none");
          $("#supplier-detail-img").attr("src", supplierImg);
        }
        const listProduct = await getProductSupplierId(supplierId);
        const existedProduct = listProduct.length >= 1;
        if (existedProduct) {
          let list = `<ul>`;
          listProduct.forEach((el) => {
            list += `<li class="fs-5">${el.ProductName}</li>`;
          });
          list += `</ul>`;
          $("div#supplier-detail-productid").html(list);
        }
        if (!existedProduct) {
          const list = `<p class='fs-5 ms-2 text-muted fst-italic'>product-no available</p>`;
          $("div#supplier-detail-productid").html(list);
        }
      } catch (error) {
        console.error(error);
      }
    });
});
