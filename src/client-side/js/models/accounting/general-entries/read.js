import {
  readAccounting,
  readInitAccounting,
} from "../../../../../serverless-side/functions/accounting.js";
import { uiTbody, uiTbodyZero } from "./ui.js";

$(document).ready(function () {
  let searchVal = $("input#general-entries-search").val();
  let limitVal = $("select#general-entries-limit").val();
  let offSetVal = 1;
  const req = {
    searchVal,
    limitVal: parseInt(limitVal),
    offsetVal: parseInt(offSetVal),
  };
  readInitAccounting(req, (status, response) => {
    if (status) {
      const totalPage = response.totalPage;
      const totalRow = response.totalRow;
      if (totalRow >= 1) {
        $("div#general-entries-pagination").removeClass("d-none");
        readpage(req);
        pagination(totalPage);
      }
      if (totalRow < 1) {
        $("div#general-entries-pagination").addClass("d-none");
        $("tbody#general-entries").html(uiTbodyZero);
      }
    }
    if (!status) {
      console.error(response);
    }
  });
  function readpage(req) {
    readAccounting(req, (status, response) => {
      if (status) {
        let tBody = ``;
        response.forEach((rows) => {
          tBody += uiTbody(rows);
        });
        $("tbody#general-entries").html(tBody);
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  function pagination(totalPage) {
    let btnPage = ``;
    for (let i = 1; i <= totalPage; i++) {
      btnPage += `<button
                    type="button"
                    class="btn border border-2 fs-6 general-entries-page ${
                      i === 1 && "general-entries-page-active"
                    }">
                      ${i}
                 </button>`;
    }
    $("div#general-entries-page-number").html(btnPage);
    const btnGeneralEntry = $("button.general-entries-page");
    $("button#general-entry-first")
      .off("click")
      .on("click", function () {
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: 1,
        };
        readpage(req);
        btnGeneralEntry.removeClass("general-entries-page-active");
        btnGeneralEntry.eq(1 - 1).addClass("general-entries-page-active");
      });
    $("button#general-entry-prev")
      .off("click")
      .on("click", function () {
        let activePage = parseInt(
          $("button.general-entries-page-active").text().trim()
        );
        let decrementPage = activePage - 1;
        console.log(decrementPage);
        if (decrementPage < 1) {
          decrementPage = totalPage;
        }
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: parseInt(decrementPage),
        };
        readpage(req);
        btnGeneralEntry.removeClass("general-entries-page-active");
        btnGeneralEntry
          .eq(decrementPage - 1)
          .addClass("general-entries-page-active");
      });
    $("div#general-entries-page-number")
      .off("click", "button.general-entries-page")
      .on("click", "button.general-entries-page", function () {
        const pageNumber = parseInt(this.textContent.trim());
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: pageNumber,
        };
        readpage(req);
        btnGeneralEntry.removeClass("general-entries-page-active");
        btnGeneralEntry
          .eq(pageNumber - 1)
          .addClass("general-entries-page-active");
      });
    $("button#general-entry-next")
      .off("click")
      .on("click", function () {
        let activePage = parseInt(
          $("button.general-entries-page-active").text().trim()
        );
        let incrementPage = activePage + 1;
        console.log(incrementPage);
        if (incrementPage > totalPage) {
          incrementPage = 1;
        }
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: parseInt(incrementPage),
        };
        readpage(req);
        btnGeneralEntry.removeClass("general-entries-page-active");
        btnGeneralEntry
          .eq(incrementPage - 1)
          .addClass("general-entries-page-active");
      });
    $("button#general-entry-last")
      .off("click")
      .on("click", function () {
        const req = {
          searchVal,
          limitVal: parseInt(limitVal),
          offsetVal: totalPage,
        };
        readpage(req);
        btnGeneralEntry.removeClass("general-entries-page-active");
        btnGeneralEntry
          .eq(totalPage - 1)
          .addClass("general-entries-page-active");
      });
  }
});
