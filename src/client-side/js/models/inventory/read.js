import {
  getInventory,
  getTotalPageInventory,
  getTotalRowInventory,
} from "../../../../serverless-side/functions/inventory.js";
import {
  uiActivePageButton,
  uiBtnInventoryPage,
  uiTrInventory,
  uiTrZero,
  uiTrZeroSearch,
} from "./ui.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
$(document).ready(function () {
  let inventorySearch = $("input#inventory-search").val();
  let inventoryLimit = parseInt($("#inventory-limit").val());
  let inventoryTotalRow;
  let inventoryTotalPage;
  let inventoryBtnPage;
  getInit(inventorySearch);
  $("input#inventory-search").on("keyup", function () {
    inventorySearch = $(this).val();
    getInit(inventorySearch);
  });
  $("select#inventory-limit").on("change", function () {
    inventoryLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowInventory(inventorySearch, (status, response) => {
      if (status) {
        inventoryTotalRow = parseInt(response);
        if (inventoryTotalRow >= 1) {
          getTotalPage();
          $("#inventory-pagination").removeClass("d-none");
        }
        if (inventoryTotalRow < 1) {
          if (inventorySearch) {
            $("#inventory-data").html(uiTrZeroSearch(inventorySearch));
          } else {
            $("#inventory-data").html(uiTrZero);
          }
          $("#inventory-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPageInventory(
      inventorySearch,
      inventoryLimit,
      (status, response) => {
        if (status) {
          inventoryTotalPage = parseInt(response);
          uiPagination(inventoryTotalPage);
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // 3. Function to insert html pagination
  function uiPagination(inventoryTotalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= inventoryTotalPage; i++) {
      uiBtnPaginate += uiBtnInventoryPage(i);
    }
    $("#inventory-number-page").html(uiBtnPaginate);
    handlePagination(inventoryTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(inventoryTotalPage) {
    // Event listeners for pagination buttons
    inventoryBtnPage = document.getElementsByClassName("inventory-btn-page");
    // first page
    $("#inventory-first-page")
      .off("click")
      .on("click", () => {
        getInventoryPage(1);
      });
    // previous page
    $("#inventory-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".inventory-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = inventoryTotalPage;
        }
        getInventoryPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < inventoryTotalPage; i++) {
      inventoryBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getInventoryPage(pageNumber);
      });
    }
    // next page
    $("#inventory-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".inventory-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > inventoryTotalPage) {
          incrementPage = 1;
        }
        getInventoryPage(incrementPage);
      });
    // last page
    $("#inventory-last-page")
      .off("click")
      .on("click", () => getInventoryPage(inventoryTotalPage));
    getInventoryPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getInventoryPage(inventoryActivePage) {
    getInventory(
      inventorySearch,
      inventoryLimit,
      inventoryActivePage,
      (status, response) => {
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrInventory(element);
          });
          $("#inventory-data").html(tr);
          console.log(response);
          uiActivePageButton(inventoryActivePage, inventoryBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  $(document).on("click", "#inventoryDetail", function () {
    const inventory = this.dataset;
    $("#inventoryDetailTitle").text(inventory.inventoryproduct);
    $("#inventory-detail-productname").text(inventory.inventoryproduct);
    $("#inventory-detail-date").text(inventory.inventorydate);
    $("#inventory-detail-second").text(inventory.inventorysecond);
    if (inventory.inventoryqty < 0) {
      $("div#inventory-detail-qty").addClass("bg-danger");
      $("div#inventory-detail-qty").removeClass("bg-success");
      $("span#inventory-detail-qty").text(inventory.inventoryqty);
    }
    if (inventory.inventoryqty >= 1) {
      $("div#inventory-detail-qty").addClass("bg-success");
      $("div#inventory-detail-qty").removeClass("bg-danger");
      $("span#inventory-detail-qty").text(`+ ${inventory.inventoryqty}`);
    }
    $("#inventory-detail-info").text(inventory.inventoryinfo);
  });
});

export const getInventoryAgain = () => {
  let inventorySearch = $("input#inventory-search").val();
  let inventoryLimit = parseInt($("#inventory-limit").val());
  let inventoryTotalRow;
  let inventoryTotalPage;
  let inventoryBtnPage;
  getInit(inventorySearch);
  $("input#inventory-search").on("keyup", function () {
    inventorySearch = $(this).val();
    getInit(inventorySearch);
  });
  $("select#inventory-limit").on("change", function () {
    inventoryLimit = parseInt($(this).val());
    getInit();
  });
  // 1. get first,  get total row, upadate ui (total row) as condition
  function getInit() {
    getTotalRowInventory(inventorySearch, (status, response) => {
      if (status) {
        inventoryTotalRow = parseInt(response);
        if (inventoryTotalRow >= 1) {
          getTotalPage();
          $("#inventory-pagination").removeClass("d-none");
        }
        if (inventoryTotalRow < 1) {
          if (inventorySearch) {
            $("#inventory-data").html(uiTrZeroSearch(inventorySearch));
          } else {
            $("#inventory-data").html(uiTrZero);
          }
          $("#inventory-pagination").addClass("d-none");
        }
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // 2. get total page, update ui (total row)
  function getTotalPage() {
    getTotalPageInventory(
      inventorySearch,
      inventoryLimit,
      (status, response) => {
        if (status) {
          inventoryTotalPage = parseInt(response);
          uiPagination(inventoryTotalPage);
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
  // 3. Function to insert html pagination
  function uiPagination(inventoryTotalPage) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= inventoryTotalPage; i++) {
      uiBtnPaginate += uiBtnInventoryPage(i);
    }
    $("#inventory-number-page").html(uiBtnPaginate);
    handlePagination(inventoryTotalPage);
  }
  // 4. function to handle pagination(first,prev,number,next,last)
  function handlePagination(inventoryTotalPage) {
    // Event listeners for pagination buttons
    inventoryBtnPage = document.getElementsByClassName("inventory-btn-page");
    // first page
    $("#inventory-first-page")
      .off("click")
      .on("click", () => {
        getInventoryPage(1);
      });
    // previous page
    $("#inventory-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".inventory-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = inventoryTotalPage;
        }
        getInventoryPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < inventoryTotalPage; i++) {
      inventoryBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getInventoryPage(pageNumber);
      });
    }
    // next page
    $("#inventory-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".inventory-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > inventoryTotalPage) {
          incrementPage = 1;
        }
        getInventoryPage(incrementPage);
      });
    // last page
    $("#inventory-last-page")
      .off("click")
      .on("click", () => getInventoryPage(inventoryTotalPage));
    getInventoryPage(1);
  }
  // 5. function to handle get satuan based on pageActive
  function getInventoryPage(inventoryActivePage) {
    getInventory(
      inventorySearch,
      inventoryLimit,
      inventoryActivePage,
      (status, response) => {
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrInventory(element);
          });
          $("#inventory-data").html(tr);
          uiActivePageButton(inventoryActivePage, inventoryBtnPage);
          reinitializeTooltips();
        }
        if (!status) {
          console.error(response);
        }
      }
    );
  }
};
