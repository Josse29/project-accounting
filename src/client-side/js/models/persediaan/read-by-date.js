import {
  getPersediaanDate,
  getPersediaanDateCategoryId,
  getPersediaanDateProductId,
  getPersediaanDateQtyProductId,
  getPersediaanDateRpCategoryId,
  getPersediaanDateRpSupplierId,
  getPersediaanDateSum,
  getPersediaanDateSumProduct,
  getPersediaanDateSupplierId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { listCategoryRefPersediaanReadDate } from "../categories/list.js";
import { listProductRefPersediaanReadDate } from "../products/list.js";
import { listSupplierRefPersediaanReadDate } from "../supplier/list.js";
import { uiSumPersediaanDate, uiTrPersediaan, uiTrZeroSearch } from "./ui.js";

$(document).ready(function () {
  $("button#persediaan-date-search").on("click", function () {
    const startDate = $("input#persediaan-start-date").val();
    const endDate = $("input#persediaan-end-date").val();
    if (startDate !== "" && endDate !== "" && startDate <= endDate) {
      getPersediaanDate(startDate, endDate, (status, response) => {
        if (status) {
          const existed = response.length >= 1;
          if (existed) {
            let tr = "";
            response.forEach((element) => {
              tr += uiTrPersediaan(element);
            });
            $("#persediaan-sum-section").show();
            $("#persediaan-table").html(tr);
            $("#persediaan-date-all-search").show();
            getSum(startDate, endDate);
            listProductRefPersediaanReadDate();
            listSupplierRefPersediaanReadDate();
            listCategoryRefPersediaanReadDate();
            selectDateBy(startDate, endDate);
          }
          if (!existed) {
            const tr = uiTrZeroSearch(
              formatWaktuIndo(startDate) + " - " + formatWaktuIndo(endDate)
            );
            $("#persediaan-table").html(tr);
            $("#persediaan-sum-section").hide();
            $("#persediaan-date-all-search").hide();
          }
          uiSumPersediaanDate();
          $("#only-product").hide();

          $("#persediaan-pagination").addClass("d-none");
        }
        if (!status) {
          console.error(response);
        }
      });
      function getSum(startDate, endDate) {
        getPersediaanDateSum(startDate, endDate, (status, response) => {
          if (status) {
            $("span#persediaan-date-product").text("All Product");
            $("#persediaan-id").html(
              ` ${formatWaktuIndo(startDate)}  - ${formatWaktuIndo(endDate)}`
            );
            const rupiah = formatRupiah2(parseFloat(response));
            $("span#total-rupiah-byid").text(rupiah);
          }
          if (!status) {
            console.error(response);
          }
        });
      }
      function selectDateBy(startDate, endDate) {
        const html = `<select
                        class="form-control w-auto mb-3"
                        id="persediaan-date-product">
                          <option value="test" class="fs-6">Product</option>
                      </select>
                      <select
                        class="form-control w-auto mb-3"
                        id="persediaan-date-supplier">
                          <option value="test" class="fs-6">Supplier</option>
                      </select>
                      <select
                        class="form-control w-auto mb-3"
                        id="persediaan-date-category">
                          <option value="test" class="fs-6">Kategori</option>
                      </select>`;
        $("div#persediaan-date-all-search").html(html);
        // get persediaan date and product
        $("select#persediaan-date-product").on("change", function () {
          $("span#persediaan-date-product").text(
            $(this).find("option:selected").text()
          );
          getPersediaanDateProductId(
            startDate,
            endDate,
            parseInt($(this).val()),
            (status, response) => {
              if (status) {
                const existed = response.length >= 1;
                if (existed) {
                  const rupiah = formatRupiah2(
                    parseFloat(response[0].ProductPrice)
                  );
                  $("#rupiah-byid").text(rupiah);
                  $("#only-product").show();
                  let tr = ``;
                  response.forEach((element) => {
                    tr += uiTrPersediaan(element);
                  });
                  $("#persediaan-table").html(tr);
                  $("select#persediaan-date-category").val("Kategori");
                  $("select#persediaan-date-supplier").val("Supplier");
                }
                if (!existed) {
                  $("#only-product").hide();
                  const tr = uiTrZeroSearch(` - ${$(this)
                    .find("option:selected")
                    .text()} :          
                    ${formatWaktuIndo(startDate)}  -
                     ${formatWaktuIndo(endDate)}`);
                  $("#persediaan-table").html(tr);
                }
              }
              if (!status) {
                console.error(response);
              }
            }
          );
          getPersediaanDateSumProduct(
            startDate,
            endDate,
            parseInt($(this).val()),
            (status, response) => {
              if (status) {
                const rupiah = formatRupiah2(parseFloat(response));
                $("span#total-rupiah-byid").text(rupiah);
              }
              if (!status) {
                console.error(response);
              }
            }
          );
          getPersediaanDateQtyProductId(
            startDate,
            endDate,
            parseInt($(this).val()),
            (status, response) => {
              if (status) {
                console.log(response);
                $("span#total-qty-byid").text(response);
              }
              if (!status) {
              }
            }
          );
        });
        // get persediaan date and supplier
        $("select#persediaan-date-supplier").on("change", function () {
          $("span#persediaan-date-product").text(
            $(this).find("option:selected").text()
          );
          getPersediaanDateSupplierId(
            startDate,
            endDate,
            parseInt($(this).val()),
            (status, response) => {
              if (status) {
                const existed = response.length >= 1;
                if (existed) {
                  let tr = ``;
                  response.forEach((element) => {
                    tr += uiTrPersediaan(element);
                  });
                  $("#persediaan-table").html(tr);
                  $("#only-product").hide();
                  $("select#persediaan-date-product").val("Produk");
                  $("select#persediaan-date-category").val("Kategori");
                }
                if (!existed) {
                  const tr = uiTrZeroSearch(` - ${$(this)
                    .find("option:selected")
                    .text()} :          
                    ${formatWaktuIndo(startDate)}  -
                     ${formatWaktuIndo(endDate)}`);
                  $("#persediaan-table").html(tr);
                }
              }
              if (!status) {
                console.error(response);
              }
            }
          );
          getPersediaanDateRpSupplierId(
            startDate,
            endDate,
            parseInt($(this).val()),
            (status, response) => {
              if (status) {
                const result = formatRupiah2(response);
                $("span#total-rupiah-byid").text(result);
              }
              if (!status) {
                console.error(response);
              }
            }
          );
        });
        // get persediaan date and category
        $("select#persediaan-date-category").on("change", function () {
          $("span#persediaan-date-product").text(
            $(this).find("option:selected").text()
          );
          getPersediaanDateCategoryId(
            startDate,
            endDate,
            parseInt($(this).val()),
            (status, response) => {
              if (status) {
                const existed = response.length >= 1;
                if (existed) {
                  let tr = ``;
                  response.forEach((element) => {
                    tr += uiTrPersediaan(element);
                  });
                  $("#persediaan-table").html(tr);
                  $("#only-product").hide();
                  $("select#persediaan-date-product").val("Produk");
                  $("select#persediaan-date-supplier").val("Supplier");
                }
                if (!existed) {
                  const tr = uiTrZeroSearch(` - ${$(this)
                    .find("option:selected")
                    .text()} :          
                    ${formatWaktuIndo(startDate)}  -
                     ${formatWaktuIndo(endDate)}`);
                  $("#persediaan-table").html(tr);
                }
              }
              if (!status) {
                console.error(response);
              }
            }
          );
          getPersediaanDateRpCategoryId(
            startDate,
            endDate,
            parseInt($(this).val()),
            (status, response) => {
              if (status) {
                const result = formatRupiah2(response);
                $("span#total-rupiah-byid").text(result);
              }
              if (!status) {
                console.error(response);
              }
            }
          );
        });
      }
    }
  });
});
