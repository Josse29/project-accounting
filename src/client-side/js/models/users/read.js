import { fetchLimitOffset, fetchPagination } from "./services.js";
import { uiBtnPage, uiTr } from "./ui.js";
let limitVal = parseInt($("select#user-limit").val());
let offsetVal = 1;
let searchVal = $("input#user-search").val();
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
getUser();
async function getUser() {
  try {
    const res = await fetchLimitOffset();
    let tr = ``;
    res.forEach((i) => {
      tr += uiTr(i);
    });
    $("tbody#user").html(tr);
  } catch (error) {
    console.error(error);
  }
}
// 2.pagination
fetchPagination(req, (status, response) => {
  if (status) {
    const totalPage = response.totalPage;
    const totalRow = response.totalRow;
    let btn = ``;
    for (let i = 1; i <= totalPage; i++) {
      btn += uiBtnPage(i);
      console.log(i);
    }
    $("#user-page-number").html(btn);
  }
  if (!status) {
    console.error(response);
  }
});
