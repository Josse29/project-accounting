import {
  uiActivePageButton,
  uiBtnPersediaanPage,
  uiSumPersediaanDate2,
  uiTbody,
  uiTbodyEmpty,
} from "./ui.js";
import { addSpace } from "../../utils/formatSpace.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  getPersediaan,
  getPersediaanInit,
  getPersediaanRpSum,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
$(document).ready(function () {
  let searchVal = $("input#persediaan-search").val();
  let limitVal = parseInt($("#persediaan-limit").val());
  let offsetVal = 1;
  let totalRow;
  let totalPage;
  getInitAsync();
  $("button#persediaan-refresh")
    .off("click")
    .on("click", function () {
      // reset all select
      $("select#persediaan-refproduct-search").val("Produk");
      $("select#persediaan-refsupplier-search").val("Supplier");
      $("select#persediaan-refcategory-search").val("Kategori");
      $("div#persediaan-date-all-search").html(``);
      $("input#persediaan-search").val("");
      getInitAsync();
      uiSumPersediaanDate2();
    });
  $("input#persediaan-search")
    .off("keyup")
    .on("keyup", function () {
      searchVal = $(this).val();
      getInitAsync();
    });
  $("select#persediaan-limit")
    .off("change")
    .on("change", function () {
      limitVal = parseInt($(this).val());
      getInitAsync();
    });
  async function getInitAsync() {
    try {
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const init = await getPersediaanInit(req);
      totalRow = init.totalRow;
      totalPage = init.totalPage;
      // if it exist inventory
      if (totalRow >= 1) {
        // sum rupiah persediaan
        const totalRupiah = await getPersediaanRpSum();
        $("#persediaan-detail-totalrp").text(formatRupiah2(totalRupiah));
        await getPersediaanPage(req);
        handlePagination(totalPage);
        getDetail();
      }
      // if it doesn't exist inventory
      if (totalRow < 1) {
        $("tbody#persediaan-table").html(uiTbodyEmpty(searchVal));
        $("#persediaan-pagination").addClass("d-none");
      }
      $("#persediaan-sum-section").hide();
    } catch (error) {
      console.error(error);
    }
  }
  function handlePagination(totalPage) {
    // for pagination
    let uiBtnPaginate = "";
    for (let i = 1; i <= totalPage; i++) {
      uiBtnPaginate += uiBtnPersediaanPage(i);
    }
    $("#persediaan-number-page").html(uiBtnPaginate);
    $("#persediaan-pagination").removeClass("d-none");
    // first page
    $("#persediaan-first-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: 1,
        };
        await getPersediaanPage(req);
      });
    // previous page
    $("#persediaan-prev-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: decrementPage,
        };
        await getPersediaanPage(req);
      });
    // based on number when clicked
    $("div#persediaan-number-page")
      .off("click", "button.persediaan-btn-page")
      .on("click", "button.persediaan-btn-page", async function () {
        console.log(this);
        const pageNumber = parseInt(this.textContent.trim());
        console.log(pageNumber);
        const req = {
          searchVal,
          limitVal,
          offsetVal: pageNumber,
        };
        await getPersediaanPage(req);
      });
    // next page
    $("#persediaan-next-page")
      .off("click")
      .on("click", async () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal,
          offsetVal: incrementPage,
        };
        await getPersediaanPage(req);
      });
    // last page
    $("#persediaan-last-page")
      .off("click")
      .on("click", async () => {
        const req = {
          searchVal,
          limitVal,
          offsetVal: totalPage,
        };
        await getPersediaanPage(req);
      });
  }
  async function getPersediaanPage(req) {
    try {
      const response = await getPersediaan(req);
      let tr = ``;
      response.forEach((element) => {
        tr += uiTbody(element);
      });
      $("tbody#persediaan-table").html(tr);
      uiActivePageButton(req.offsetVal);
      // Inisialisasi ulang tooltip setelah konten baru di-load
      $('[data-bs-toggle="tooltip"]').tooltip();
    } catch (error) {
      console.error(error);
    }
  }
  function getDetail() {
    $(document)
      .off("click", "#persediaanDetail")
      .on("click", "#persediaanDetail", function () {
        const persediaan = this.dataset;
        const persediaanYMD = persediaan.persediaanddmy;
        const persediaanHMS = persediaan.persediaanhms;
        const persediaanInfo = persediaan.persediaaninfo;
        const persediaanQty = persediaan.persediaanqty;
        const persediaaanRp = persediaan.persediaanrp;
        const productName = persediaan.productname;
        const productPriceBuy = persediaan.productpricebuy;
        $("#persediaan-detail-productname").text(productName);
        $("#persediaan-detail-date").text(formatWaktuIndo(persediaanYMD));
        $("#persediaan-detail-second").text(persediaanHMS);
        if (persediaanInfo === "") {
          $("#persediaan-detail-info").text("-");
        }
        if (persediaanInfo !== "") {
          $("#persediaan-detail-info").text(persediaanInfo);
        }
        $("#persediaanDetailTitle").text(productName);
        // qty
        let tdProductQty = ``;
        if (persediaanQty < 1) {
          tdProductQty = `<span class="badge text-bg-danger">${addSpace(
            persediaanQty
          )}</span>`;
        }
        if (persediaanQty >= 1) {
          tdProductQty = `<span class="badge text-bg-success">+ ${persediaanQty}</span>`;
        }
        $("td#persediaan-detail-productqty").html(tdProductQty);
        // product price
        $("td#persediaan-detail-productprice").text(
          formatRupiah2(productPriceBuy)
        );
        // persediaan rp
        let txtPersediaanRp = ``;
        if (persediaaanRp < 1) {
          txtPersediaanRp =
            persediaaanRp.substr(0, 1) +
            " " +
            formatRupiah2(persediaaanRp.substr(1));
        }
        if (persediaaanRp >= 1) {
          txtPersediaanRp = formatRupiah2(persediaaanRp);
        }
        $("td#persediaan-detail-rp").text(txtPersediaanRp);
      });
  }
});
export const getPersediaanAgain = () => {
  let persediaanSearch = $("input#persediaan-search").val();
  let persediaanLimit = parseInt($("#persediaan-limit").val());
  let persediaanTotalRow;
  let persediaanTotalPage;
  let persediaanBtnPage;
  getInit("");
  $("button#persediaan-refresh")
    .off("click")
    .on("click", function () {
      // reset all select
      $("select#persediaan-refproduct-search").val("Produk");
      $("select#persediaan-refsupplier-search").val("Supplier");
      $("select#persediaan-refcategory-search").val("Kategori");
      $("div#persediaan-date-all-search").html(``);
      $("input#persediaan-search").val("");
      getInit("");
      uiSumPersediaanDate2();
    });
  $("input#persediaan-search")
    .off("keyup")
    .on("keyup", function () {
      persediaanSearch = $(this).val();
      getInit(persediaanSearch);
    });
  $("select#persediaan-limit")
    .off("change")
    .on("change", function () {
      persediaanLimit = parseInt($(this).val());
      getInit();
    });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getPersediaanTotalRow(persediaanSearch, (status, response) => {
      if (status) {
        persediaanTotalRow = parseInt(response);
        // existed product
        if (persediaanTotalRow >= 1) {
          getPersediaanRpSum((status, response) => {
            if (status) {
              const totalRupiah = formatRupiah2(response);
              $("#persediaan-detail-totalrp").text(totalRupiah);
              $("#persediaan-sum-section").hide();
            }
            if (!status) {
              console.error(response);
            }
          });
          $("#persediaan-pagination").removeClass("d-none");
          getTotalPage();
        }
        // non-existed product
        if (persediaanTotalRow < 1) {
          // with search
          if (persediaanSearch !== "") {
            $("tbody#persediaan-table").html(uiTrZeroSearch(persediaanSearch));
          }
          // without search
          if (persediaanSearch === "") {
            $("tbody#persediaan-table").html(uiTrZero);
          }
          $("#persediaan-pagination").addClass("d-none");
        }
        $("#persediaan-sum-section").hide();
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getPersediaanTotalPage(
      persediaanSearch,
      persediaanLimit,
      (status, response) => {
        if (status) {
          persediaanTotalPage = parseInt(response);
          uiPagination(persediaanTotalPage);
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // 3. Function to insert html pagination
  function uiPagination(persediaanTotalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= persediaanTotalPage; i++) {
      uiBtnPaginate += uiBtnPersediaanPage(i);
    }
    $("#persediaan-number-page").html(uiBtnPaginate);
    handlePagination(persediaanTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(persediaanTotalPage) {
    // Event listeners for pagination buttons
    persediaanBtnPage = document.getElementsByClassName("persediaan-btn-page");
    // first page
    $("#persediaan-first-page")
      .off("click")
      .on("click", () => {
        getPersediaanPage(1);
      });
    // previous page
    $("#persediaan-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = persediaanTotalPage;
        }
        getPersediaanPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < persediaanTotalPage; i++) {
      $(persediaanBtnPage)
        .eq(i)
        .off("click")
        .on("click", function () {
          const pageNumber = parseInt(this.textContent.trim());
          getPersediaanPage(pageNumber);
        });
    }
    // next page
    $("#persediaan-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".persediaan-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > persediaanTotalPage) {
          incrementPage = 1;
        }
        getPersediaanPage(incrementPage);
      });
    // last page
    $("#persediaan-last-page")
      .off("click")
      .on("click", () => getPersediaanPage(persediaanTotalPage));
    // get init
    getPersediaanPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getPersediaanPage(persediaanActivePage) {
    getPersediaan(
      persediaanSearch,
      persediaanLimit,
      persediaanActivePage,
      (status, response) => {
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrPersediaan(element);
          });
          $("tbody#persediaan-table").html(tr);
          uiActivePageButton(persediaanActivePage, persediaanBtnPage);
        }
        if (!status) {
          console.error(response);
        }
      }
    );
    getDetail();
  }
  function getDetail() {
    $(document)
      .off("click", "#persediaanDetail")
      .on("click", "#persediaanDetail", function () {
        const persediaan = this.dataset;
        const persediaanYMD = persediaan.persediaanddmy;
        const persediaanHMS = persediaan.persediaanhms;
        const persediaanInfo = persediaan.persediaaninfo;
        const persediaanQty = persediaan.persediaanqty;
        const persediaaanRp = persediaan.persediaanrp;
        const productName = persediaan.productname;
        const productPriceBuy = persediaan.productpricebuy;
        $("#persediaan-detail-productname").text(productName);
        $("#persediaan-detail-date").text(formatWaktuIndo(persediaanYMD));
        $("#persediaan-detail-second").text(persediaanHMS);
        if (persediaanInfo === "") {
          $("#persediaan-detail-info").text("-");
        }
        if (persediaanInfo !== "") {
          $("#persediaan-detail-info").text(persediaanInfo);
        }
        $("#persediaanDetailTitle").text(productName);
        // qty
        let tdProductQty = ``;
        if (persediaanQty < 1) {
          tdProductQty = `<span class="badge text-bg-danger">${addSpace(
            persediaanQty
          )}</span>`;
        }
        if (persediaanQty >= 1) {
          tdProductQty = `<span class="badge text-bg-success">+ ${persediaanQty}</span>`;
        }
        $("td#persediaan-detail-productqty").html(tdProductQty);
        // product price
        $("td#persediaan-detail-productprice").text(
          formatRupiah2(productPriceBuy)
        );
        // persediaan rp
        let txtPersediaanRp = ``;
        if (persediaaanRp < 1) {
          txtPersediaanRp =
            persediaaanRp.substr(0, 1) +
            " " +
            formatRupiah2(persediaaanRp.substr(1));
        }
        if (persediaaanRp >= 1) {
          txtPersediaanRp = formatRupiah2(persediaaanRp);
        }
        $("td#persediaan-detail-rp").text(txtPersediaanRp);
      });
  }
};
