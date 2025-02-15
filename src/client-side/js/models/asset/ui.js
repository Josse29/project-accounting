import { formatRupiah2 } from "../../utils/formatPrice.js";

const uiTr = () => {
  let tr = ``;
  const response = [
    {
      AssetId: 1,
      AssetDate: "Wednesday 12 February 2025",
      AssetTime: "22:27",
      AssetPrice: 100000,
      AssetQty: 1,
      AssetBalance: 10000,
      AssetInfo: "Asset Information",
      AssetName: "Asset First",
      SupplierName: "Supplier First",
    },
    {
      AssetId: 2,
      AssetDate: "Wednesday 12 February 2025",
      AssetTime: "22:27",
      AssetPrice: 100000,
      AssetQty: 1,
      AssetBalance: 10000,
      AssetInfo: "Asset Information",
      AssetName: "Asset Second",
      SupplierName: "Supplier First",
    },
    {
      AssetId: 3,
      AssetDate: "Wednesday 12 February 2025",
      AssetTime: "22:27",
      AssetPrice: 100000,
      AssetQty: 1,
      AssetBalance: 10000,
      AssetInfo: "Asset Information",
      AssetName: "Asset Third",
      SupplierName: "Supplier First",
    },
  ];
  response.forEach((rows) => {
    const assetId = rows.AssetId;
    const assetDate = rows.AssetDate;
    const assetTime = rows.AssetTime;
    const assetPrice = formatRupiah2(rows.AssetPrice);
    const assetQty = rows.AssetQty;
    const assetBalance = formatRupiah2(rows.AssetBalance);
    // const assetInfo = rows.AssetInfo;
    const assetName = rows.AssetName;
    const supplierName = rows.SupplierName;
    tr += `
    <tr 
    data-assetdate="${assetDate}"
    data-assettime="${assetTime}"
    data-assetname="${assetName}"
    data-assetqty="${assetQty}"
    data-assetbalance="${assetBalance}"
    >
    <td class="text-center align-content-center">${assetId}</td>
    <td class="text-truncate align-content-center">
        ${assetDate}
    </td>
    <td class="text-center align-content-center">${assetTime}</td>
    <td class="text-truncate align-content-center pe-3">
        ${assetName}
    </td>
    <td class="align-content-center pe-3">${assetPrice}</td>
    <td class="align-content-center text-center">${assetQty}</td>
    <td class="align-content-center pe-3">${assetBalance}</td>
    <td class="align-content-center">${supplierName}</td>
    </tr>
    `;
  });
  $("#asset-table tbody").html(tr);
};
const uiBtnPage = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "asset-page-active" : "";
    btn += `
    <button class="btn border border-2 fs-6 ${actived}">${i}</button>
    `;
  }
  $("div#asset-pagination .btn-group .btn-group").html(btn);
  $("div#asset-pagination").removeClass("d-none");
};
const uiBtnPageActive = (number) => {
  const btnPage = $("div#asset-pagination .btn-group .btn-group button");
  btnPage.removeClass("asset-page-active");
  btnPage.eq(number - 1).addClass("asset-page-active");
};
export { uiTr, uiBtnPage, uiBtnPageActive };
