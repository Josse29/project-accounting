import { getPage } from "./read-by-group-product.js";
import { uiBtnPage1 } from "./ui.js";

export const handlePagination1 = (totalPage) => {
  // insert to html
  uiBtnPage1(totalPage);
  // get all value
  const searchVal = $("input#order-search").val();
  const limitVal = 3;
  // first page
  $("button#product-ref-persediaan-first-page")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal,
        offsetVal: 1,
      };
      await getPage(req);
    });
  // prev page
  $("button#product-ref-persediaan-prev-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt(
        $("button.product-ref-persediaan-page-active").text().trim()
      );
      let decrement = pageActive - 1;
      if (decrement < 1) {
        decrement = totalPage;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: decrement,
      };
      await getPage(req);
    });
  // by click
  $("div#product-ref-persediaan-page-number")
    .off("click", ".product-ref-persediaan-page")
    .on("click", ".product-ref-persediaan-page", async function () {
      const pageNumber = parseInt(this.textContent.trim());
      const req = {
        searchVal,
        limitVal,
        offsetVal: pageNumber,
      };
      await getPage(req);
    });
  // next page
  $("button#product-ref-persediaan-next-page")
    .off("click")
    .on("click", async function () {
      let pageActive = parseInt(
        $(".product-ref-persediaan-page-active").text().trim()
      );
      let increment = pageActive + 1;
      if (increment > totalPage) {
        increment = 1;
      }
      const req = {
        searchVal,
        limitVal,
        offsetVal: increment,
      };
      await getPage(req);
    });
  // last page
  $("button#product-ref-persediaan-last-page")
    .off("click")
    .on("click", async function () {
      const req = {
        searchVal,
        limitVal,
        offsetVal: totalPage,
      };
      await getPage(req);
    });
};
