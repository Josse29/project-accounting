import { formatRupiah2 } from "../../utils/formatPrice.js";

const uiTr = () => {
  let tr = ``;
  const response = [
    {
      liabilityId: 1,
      liabilityDate: "Wednesday 12 February 2025",
      liabilityTime: "22:27",
      liabilityName: "liabilityName - 1 ",
      liabilityBalance: 10000,
      liabilityInfo: "liabilityInfo Information",
    },
    {
      liabilityId: 1,
      liabilityDate: "Wednesday 12 February 2025",
      liabilityTime: "22:27",
      liabilityName: "liabilityName - 2 ",
      liabilityBalance: 10000,
      liabilityInfo: "liabilityInfo Information",
    },
  ];
  response.forEach((rows) => {
    const liabilityId = rows.liabilityId;
    const liabilityDate = rows.liabilityDate;
    const liabilityTime = rows.liabilityTime;
    const liabilityName = rows.liabilityName;
    const liabilityBalance = formatRupiah2(rows.liabilityBalance);
    const liabilityInfo = rows.liabilityInfo;
    tr += `
    <tr 
    data-liabilitydate="${liabilityDate}"
    data-liabilityTime="${liabilityTime}"
    data-liabilityname="${liabilityName}"
    data-liabilitybalance="${liabilityBalance}"
    data-liabilityinfo="${liabilityInfo}"
    >
    <td class="text-center align-content-center">${liabilityId}</td>
    <td class="text-truncate align-content-center">
        ${liabilityDate}
    </td>
    <td class="text-center align-content-center">${liabilityTime}</td>
    <td class="text-truncate align-content-center pe-3">
        ${liabilityName}
    </td>
    <td class="align-content-center pe-3">${liabilityBalance}</td>
    </tr>
    `;
  });
  $("#liability-table tbody").html(tr);
};
const uiBtnPage = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "liability-page-active" : "";
    btn += `
    <button class="btn border border-2 fs-6 ${actived}">${i}</button>
    `;
  }
  $("div#liability-pagination .btn-group .btn-group").html(btn);
  $("div#liability-pagination").removeClass("d-none");
};
const uiBtnPageActive = (number) => {
  const btnPage = $("div#liability-pagination .btn-group .btn-group button");
  btnPage.removeClass("liability-page-active");
  btnPage.eq(number - 1).addClass("liability-page-active");
};
export { uiTr, uiBtnPage, uiBtnPageActive };
