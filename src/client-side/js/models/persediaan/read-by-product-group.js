import { getGroupProduct, getRowPage1 } from "./services.js";

getInit();
async function getInit() {
  const req = {
    searchVal: "",
    limitVal: 3,
    offsetVal: 1,
  };
  const rowPage = await getRowPage1(req);
  const response = rowPage.response;
  const status = rowPage.status;
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await getPage(req);
      handlePagination(totalPage);
      $("div#product-refpersediaan-pagination").removeClass("d-none");
    }
    if (totalRow < 1) {
      const empty = uiCardEmpty(searchVal);
      $("div#product-refpersediaan-read").html(empty);
      $("div#product-refpersediaan-pagination").addClass("d-none");
    }
    console.log(response);
  }
  if (!status) {
    console.error(response);
  }
}
// const stock = await getGroupProduct(req);
// const response = stock.response;
// const status = stock.status;
// if (status) {
//   console.log(response);
// }
// if (!status) {
//   console.error(response);
// }
