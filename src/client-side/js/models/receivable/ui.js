import { formatRupiah2 } from "../../utils/formatPrice.js";

const uiTr = () => {
  let tr = ``;
  const response = [
    {
      ReceivableId: 1,
      ReceivableDate: "Wednesday 12 February 2025",
      ReceivableTime: "22:27",
      ReceivableName: "ReceivableName - 1 ",
      ReceivableBalance: 10000,
      ReceivableInfo: "ReceivableInfo Information",
    },
    {
      ReceivableId: 1,
      ReceivableDate: "Wednesday 12 February 2025",
      ReceivableTime: "22:27",
      ReceivableName: "ReceivableName - 2 ",
      ReceivableBalance: 10000,
      ReceivableInfo: "ReceivableInfo Information",
    },
  ];
  response.forEach((rows) => {
    const receivableId = rows.ReceivableId;
    const receivableDate = rows.ReceivableDate;
    const receivableTime = rows.ReceivableTime;
    const receivableName = rows.ReceivableName;
    const receivableBalance = formatRupiah2(rows.ReceivableBalance);
    const receivableInfo = rows.ReceivableInfo;
    tr += `
    <tr 
    data-receivabledate="${receivableDate}"
    data-receivableTime="${receivableTime}"
    data-receivablename="${receivableName}"
    data-receivablebalance="${receivableBalance}"
    data-receivableinfo="${receivableInfo}"
    >
    <td class="text-center align-content-center">${receivableId}</td>
    <td class="text-truncate align-content-center">
        ${receivableDate}
    </td>
    <td class="text-center align-content-center">${receivableTime}</td>
    <td class="text-truncate align-content-center pe-3">
        ${receivableName}
    </td>
    <td class="align-content-center pe-3">${receivableBalance}</td>
    </tr>
    `;
  });
  $("#receivable-table tbody").html(tr);
};
const uiBtnPage = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "receivable-page-active" : "";
    btn += `
    <button class="btn border border-2 fs-6 ${actived}">${i}</button>
    `;
  }
  $("div#receivable-pagination .btn-group .btn-group").html(btn);
  $("div#receivable-pagination").removeClass("d-none");
};
const uiBtnPageActive = (number) => {
  const btnPage = $("div#receivable-pagination .btn-group .btn-group button");
  btnPage.removeClass("receivable-page-active");
  btnPage.eq(number - 1).addClass("receivable-page-active");
};
export { uiTr, uiBtnPage, uiBtnPageActive };
