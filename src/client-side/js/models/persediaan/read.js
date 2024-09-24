import {
  uiBtnPageActive,
  uiBtnPage,
  uiInit,
  uiTbody,
  uiTbodyEmpty,
} from "./ui.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  getPersediaan,
  getPersediaanInit,
  getPersediaanRpSum,
} from "../../../../serverless-side/functions/persediaan.js";
import { reinitTooltip, uiLoad } from "../../utils/updateUi.js";
$(document).ready(function () {
  // loading
  $("div#persediaan-loading").html(uiLoad());
  $("div#persediaan-done").hide();
  let searchVal = $("input#persediaan-search").val();
  let limitVal = parseInt($("#persediaan-limit").val());
  let offsetVal = 1;
  getInitAsync();
  // refresh
  $("button#persediaan-refresh")
    .off("click")
    .on("click", function () {
      searchVal = "";
      getInitAsync();
      uiInit();
    });
  // search
  $("input#persediaan-search")
    .off("keyup")
    .on("keyup", function () {
      searchVal = $(this).val();
      getInitAsync();
    });
  // limit
  $("select#persediaan-limit")
    .off("change")
    .on("change", function () {
      limitVal = parseInt($(this).val());
      getInitAsync();
    });
  async function getInitAsync() {
    try {
      // sum rupiah persediaan
      const totalRupiah = await getPersediaanRpSum();
      $("#persediaan-detail-totalrp").text(formatRupiah2(totalRupiah));
      // get total row and page
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const init = await getPersediaanInit(req);
      const totalRow = init.totalRow;
      const totalPage = init.totalPage;
      // if it exist inventory
      if (totalRow >= 1) {
        await getPersediaanPage(req);
        handlePagination(totalPage);
        $("#persediaan-pagination").removeClass("d-none");
      }
      // if it doesn't exist inventory
      if (totalRow < 1) {
        $("tbody#persediaan-table").html(uiTbodyEmpty(searchVal));
        $("#persediaan-pagination").addClass("d-none");
      }
      // references and loading
      $("div#persediaan-done").show();
      $("div#persediaan-loading").html("");
    } catch (error) {
      console.error(error);
    }
  }
  async function getPersediaanPage(req) {
    try {
      const response = await getPersediaan(req);
      let tr = ``;
      response.forEach((element) => {
        tr += uiTbody(element);
      });
      $("tbody#persediaan-table").html(tr);
      uiBtnPageActive(req.offsetVal);
      reinitTooltip();
    } catch (error) {
      console.error(error);
    }
  }
  function handlePagination(totalPage) {
    // for pagination
    let uiBtnPaginate = "";
    for (let i = 1; i <= totalPage; i++) {
      uiBtnPaginate += uiBtnPage(i);
    }
    $("#persediaan-number-page").html(uiBtnPaginate);
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
        const pageNumber = parseInt(this.textContent.trim());
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
});
export const getPersediaanAgain = () => {
  let searchVal = "";
  let limitVal = parseInt($("#persediaan-limit").val());
  let offsetVal = 1;
  getInitAsync();
  uiInit();
  async function getInitAsync() {
    try {
      // sum rupiah persediaan
      const totalRupiah = await getPersediaanRpSum();
      $("#persediaan-detail-totalrp").text(formatRupiah2(totalRupiah));
      const req = {
        searchVal,
        limitVal,
        offsetVal,
      };
      const init = await getPersediaanInit(req);
      const totalRow = init.totalRow;
      const totalPage = init.totalPage;
      // if it exist inventory
      if (totalRow >= 1) {
        await getPersediaanPage(req);
        handlePagination(totalPage);
        $("#persediaan-pagination").removeClass("d-none");
      }
      // if it doesn't exist inventory
      if (totalRow < 1) {
        $("tbody#persediaan-table").html(uiTbodyEmpty(searchVal));
        $("#persediaan-pagination").addClass("d-none");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getPersediaanPage(req) {
    try {
      const response = await getPersediaan(req);
      let tr = ``;
      response.forEach((element) => {
        tr += uiTbody(element);
      });
      $("tbody#persediaan-table").html(tr);
      uiBtnPageActive(req.offsetVal);
      reinitTooltip();
    } catch (error) {
      console.error(error);
    }
  }
  function handlePagination(totalPage) {
    // for pagination
    let uiBtnPaginate = "";
    for (let i = 1; i <= totalPage; i++) {
      uiBtnPaginate += uiBtnPage(i);
    }
    $("#persediaan-number-page").html(uiBtnPaginate);
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
        const pageNumber = parseInt(this.textContent.trim());
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
};
