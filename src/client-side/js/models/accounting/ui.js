import { getAccountingAssetAPI } from "./services.js";
import formatPercentage from "../../utils/formatPercentage.js";
import { formatPrice, formatRupiah2 } from "../../utils/formatPrice.js";
import { formatWaktuIndo, timeIndonesian } from "../../utils/formatTime.js";
import handleBackspace from "../../utils/handleBackspace.js";
import { numberRgx } from "../../utils/regex.js";

const uiTbody = (response) => {
  let tBody = ``;
  response.forEach((rows) => {
    // data
    // const accountingId = rows.AccountingId;
    const accountingDate = formatWaktuIndo(rows.AccountingDate);
    const accountingRef = rows.AccountingRef;
    const accountingName = rows.AccountingName;
    const accountingTime = rows.AccountingTime;
    const accountingBalance = rows.AccountingBalance;
    // ui
    const accountingBalance1 = () => {
      if (accountingRef === 412) {
        return accountingBalance * -1;
      } else if (accountingRef === 412) {
        return accountingBalance * -1;
      } else if (accountingRef === 413) {
        return accountingBalance * -1;
      } else if (accountingRef === 512) {
        return accountingBalance * -1;
      } else if (accountingRef === 513) {
        return accountingBalance * -1;
      } else {
        return accountingBalance;
      }
    };
    const accountingBalance2 = accountingBalance1();
    const spanColor =
      accountingBalance2 >= 1 ? "text-bg-success" : "text-bg-danger";
    tBody += `
    <tr>
      <td class="text-truncate align-content-center px-3">
        ${accountingDate} 
      </td>
      <td class="text-truncate align-content-center pe-3">
        ${accountingTime}
      </td>
      <td class="text-truncate align-content-center pe-3 text-capitalize">
        ${accountingName}
      </td>
      <td class="align-content-center">
        <span
          class="badge fs-6 text-truncate ${spanColor} d-block"
          style="max-width:max-content">
          ${formatPrice(accountingBalance2)}
        </span>
      </td>
    </tr>
    `;
  });
  $("#general-section tbody").html(tBody);
  $("div#general-section #pagination").removeClass("d-none");
};
// cash
const uiPDF = (AccountingDate, TotalCash) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatPrice(rows.AccountingBalance);
    tBody += `
    <tr>
      <td class="text-center align-content-center">${no++}</td>
      <td class="align-content-center pe-2">${accountingDate}</td>
      <td class="align-content-center pe-2 text-capitalize">${accountingName}</td>
      <td class="align-content-center pe-2">
          ${accountingBalance}
      </td>
    </tr>
    `;
  });
  const div = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(TotalCash)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          <h3>Table Cash</h3>
          <h6>${indonesiaDDMY}</h6>
          <div class="d-flex gap-1">
            <h6>${indonesiaHour} :</h6>
            <h6>${indonesiaMinute} :</h6>
            <h6>${indonesiaSecond}</h6>
          </div>
        </div>
        <div class="mb-3">
          ${div}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
// receivable
const uiPDF1 = (AccountingDate, TotalReceivable, ReceivableList) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatPrice(rows.AccountingBalance);
    tBody += `
    <tr>
      <td class="text-center align-content-center">${no++}</td>
      <td class="align-content-center pe-2">${accountingDate}</td>
      <td class="align-content-center pe-2 text-capitalize">${accountingName}</td>
      <td class="align-content-center pe-2">
          ${accountingBalance}
      </td>
    </tr>
    `;
  });
  const div = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(TotalReceivable)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  // tableSecond
  let tBody1 = ``;
  let no1 = 1;
  ReceivableList.forEach((rows) => {
    const userFullName = rows.UserFullname;
    const accountingBalance = formatPrice(rows.TotalReceivable);
    tBody1 += `
      <tr>
        <td class="text-center align-content-center">${no1++}</td>
        <td class="align-content-center pe-2">${userFullName}</td>
        <td class="align-content-center pe-2">
            ${accountingBalance}
        </td>
      </tr>
      `;
  });
  const div1 = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody1}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="2" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(TotalReceivable)}</th>
      </tr>
    </tfoot>
  </table>
    `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          <h3>Table Receivable</h3>
          <h6>${indonesiaDDMY}</h6>
          <div class="d-flex gap-1">
            <h6>${indonesiaHour} :</h6>
            <h6>${indonesiaMinute} :</h6>
            <h6>${indonesiaSecond}</h6>
          </div>
        </div>
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          <p class="fs-5 mb-2">Summary Receivable</p>
          ${div1}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
// asset
const uiPDF2 = (AccountingDate, TotalAsset) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatPrice(rows.AccountingBalance);
    tBody += `
    <tr>
      <td class="text-center align-content-center">${no++}</td>
      <td class="align-content-center pe-2">${accountingDate}</td>
      <td class="align-content-center pe-2 text-capitalize">${accountingName}</td>
      <td class="align-content-center pe-2">
          ${accountingBalance}
      </td>
    </tr>
    `;
  });
  const div = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(TotalAsset)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          <h3>Table Asset</h3>
          <h6>${indonesiaDDMY}</h6>
          <div class="d-flex gap-1">
            <h6>${indonesiaHour} :</h6>
            <h6>${indonesiaMinute} :</h6>
            <h6>${indonesiaSecond}</h6>
          </div>
        </div>
        <div class="mb-3">
          ${div}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
// liability
const uiPDF3 = (AccountingDate, TotalLiability, LiabilityList) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatPrice(rows.AccountingBalance);
    tBody += `
    <tr>
      <td class="text-center align-content-center">${no++}</td>
      <td class="align-content-center pe-2">${accountingDate}</td>
      <td class="align-content-center pe-2 text-capitalize">${accountingName}</td>
      <td class="align-content-center pe-2">
          ${accountingBalance}
      </td>
    </tr>
    `;
  });
  const div = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(TotalLiability)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  // tableSecond
  let tBody1 = ``;
  let no1 = 1;
  LiabilityList.forEach((rows) => {
    const userFullName = rows.UserFullname;
    const accountingBalance = formatPrice(rows.TotalLiability);
    tBody1 += `
      <tr>
        <td class="text-center align-content-center">${no1++}</td>
        <td class="align-content-center pe-2 text-capitalize">${userFullName}</td>
        <td class="align-content-center pe-2">
            ${accountingBalance}
        </td>
      </tr>
      `;
  });
  const div1 = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody1}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="2" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(TotalLiability)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          <h3>Table Liability</h3>
          <h6>${indonesiaDDMY}</h6>
          <div class="d-flex gap-1">
            <h6>${indonesiaHour} :</h6>
            <h6>${indonesiaMinute} :</h6>
            <h6>${indonesiaSecond}</h6>
          </div>
        </div>
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          <p class="fs-5 mb-2">Summary Liability</p>
          ${div1}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
// equity
const uiPDF4 = (AccountingDate, TotalEquity, EquityList) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatPrice(rows.AccountingBalance);
    tBody += `
    <tr>
      <td class="text-center align-content-center">${no++}</td>
      <td class="align-content-center pe-2">${accountingDate}</td>
      <td class="align-content-center pe-2 text-capitalize">${accountingName}</td>
      <td class="align-content-center pe-2">
          ${accountingBalance}
      </td>
    </tr>
    `;
  });
  const div = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(TotalEquity)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  // tableSecond
  let tBody1 = ``;
  let no1 = 1;
  EquityList.forEach((rows) => {
    const userFullname = rows.UserFullname;
    const totalEquity = rows.TotalEquity;
    const totalPercent = rows.TotalPercent;
    tBody1 += `
    <tr>
      <td class="text-center align-content-center">${no1++}</td>
      <td class="align-content-center pe-2 text-capitalize">${userFullname}</td>
      <td class="align-content-center pe-2">${formatRupiah2(totalEquity)}</td>
      <td class="align-content-center pe-2">${totalPercent}</td>
    </tr>
    `;
  });
  const div1 = `
  <h4>Summary Of Equity</h4>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Name</th>
        <th>Balance</th>
        <th>Percent</th>
      </tr>
    </thead>
    <tbody>
      ${tBody1}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="2" class="text-center">Total</th>
        <th colspan="2">${formatRupiah2(TotalEquity)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          <h3>Table Equity</h3>
          <h6>${indonesiaDDMY}</h6>
          <div class="d-flex gap-1">
            <h6>${indonesiaHour} :</h6>
            <h6>${indonesiaMinute} :</h6>
            <h6>${indonesiaSecond}</h6>
          </div>
        </div>
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          ${EquityList.length >= 1 ? `${div1}` : ""}  
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
// sales
const uiPDF5 = (
  AccountingDate,
  TotalSales,
  TotalSalesReturn,
  TotalSalesDiscount
) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingRef = rows.AccountingRef;
    const accountingName = rows.AccountingName;
    const accountingBalance = rows.AccountingBalance;
    // ui
    const accountingBalance1 = () => {
      if (accountingRef === 411) {
        return accountingBalance;
      }
      if (accountingRef === 412 || accountingRef === 413) {
        return accountingBalance * -1;
      }
    };
    const accountingBalance2 = accountingBalance1();
    tBody += `
    <tr>
      <td class="text-center align-content-center">${no++}</td>
      <td class="align-content-center pe-2">${accountingDate}</td>
      <td class="align-content-center pe-2">${accountingName}</td>
      <td class="align-content-center pe-2">
          ${formatPrice(accountingBalance2)}
      </td>
    </tr>
    `;
  });
  const div = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(
          TotalSales - TotalSalesReturn - TotalSalesDiscount
        )}</th>
      </tr>
    </tfoot>
  </table>
  `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          <h3>Table Sales</h3>
          <h6>${indonesiaDDMY}</h6>
          <div class="d-flex gap-1">
            <h6>${indonesiaHour} :</h6>
            <h6>${indonesiaMinute} :</h6>
            <h6>${indonesiaSecond}</h6>
          </div>
        </div>
        <div class="mb-3">
          ${div}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
// purchase
const uiPDF6 = (
  AccountingDate,
  TotalPurchase,
  TotalPurchaseReturn,
  TotalPurchaseDiscount
) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingRef = rows.AccountingRef;
    const accountingName = rows.AccountingName;
    const accountingBalance = rows.AccountingBalance;
    // ui
    const accountingBalance1 = () => {
      if (accountingRef === 511) {
        return accountingBalance;
      }
      if (accountingRef === 512 || accountingRef === 513) {
        return accountingBalance * -1;
      }
    };
    const accountingBalance2 = accountingBalance1();
    tBody += `
    <tr>
      <td class="text-center align-content-center">${no++}</td>
      <td class="align-content-center pe-2">${accountingDate}</td>
      <td class="align-content-center pe-2">${accountingName}</td>
      <td class="align-content-center pe-2">
          ${formatPrice(accountingBalance2)}
      </td>
    </tr>
    `;
  });
  const div = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(
          TotalPurchase - TotalPurchaseReturn - TotalPurchaseDiscount
        )}</th>
      </tr>
    </tfoot>
  </table>
  `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          <h3>Table Purchase</h3>
          <h6>${indonesiaDDMY}</h6>
          <div class="d-flex gap-1">
            <h6>${indonesiaHour} :</h6>
            <h6>${indonesiaMinute} :</h6>
            <h6>${indonesiaSecond}</h6>
          </div>
        </div>
        <div class="mb-3">
          ${div}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
// expense
const uiPDF7 = (AccountingDate, TotalExpense) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = rows.AccountingBalance;
    tBody += `
    <tr>
      <td class="text-center align-content-center">${no++}</td>
      <td class="align-content-center pe-2">${accountingDate}</td>
      <td class="align-content-center pe-2">${accountingName}</td>
      <td class="align-content-center pe-2">
          ${formatPrice(accountingBalance)}
      </td>
    </tr>
    `;
  });
  const div = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(TotalExpense)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          <h3>Table Expense</h3>
          <h6>${indonesiaDDMY}</h6>
          <div class="d-flex gap-1">
            <h6>${indonesiaHour} :</h6>
            <h6>${indonesiaMinute} :</h6>
            <h6>${indonesiaSecond}</h6>
          </div>
        </div>
        <div class="mb-3">
          ${div}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
// revenue
const uiPDF8 = (AccountingDate, TotalRevenue) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = rows.AccountingBalance;
    tBody += `
    <tr>
      <td class="text-center align-content-center">${no++}</td>
      <td class="align-content-center pe-2">${accountingDate}</td>
      <td class="align-content-center pe-2">${accountingName}</td>
      <td class="align-content-center pe-2">
          ${formatPrice(accountingBalance)}
      </td>
    </tr>
    `;
  });
  const div = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(TotalRevenue)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          <h3>Table Revenue Others</h3>
          <h6>${indonesiaDDMY}</h6>
          <div class="d-flex gap-1">
            <h6>${indonesiaHour} :</h6>
            <h6>${indonesiaMinute} :</h6>
            <h6>${indonesiaSecond}</h6>
          </div>
        </div>
        <div class="mb-3">
          ${div}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
const uiTbody1 = (txt) => {
  const tr = `
  <tr>
    <td
      colspan="6"
      class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
      style="background-color: #f2f2f2"
    >
      ${txt}
    </td>
  </tr>
  `;
  $("#general-section tbody").html(tr);
  $("#general-section div#pagination").addClass("d-none");
};

const uiBtnPage = (totalPage) => {
  let btnPage = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 && "general-page-active";
    btnPage += `
    <button
      type="button"
      class="btn border border-2 fs-6 ${actived}"
    >
      ${i}
    </button>
    `;
  }
  $("div#general-section div#pagination div.btn-group div.btn-group").html(
    btnPage
  );
  $("div#general-section div#pagination").removeClass("d-none");
};
const uiBtnPageActived = (number) => {
  const btnPage = $(
    "div#general-section div#pagination div.btn-group div.btn-group button"
  );
  btnPage.removeClass("general-page-active");
  btnPage.eq(number - 1).addClass("general-page-active");
};
const uiAlertSuccess = (res) => {
  const alert = `
    <div
    class="alert alert-success alert-dismissible fade show text-start"
    role="alert"
  >
    <strong class="text-capitalize">${res}</strong>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>`;
  $("#general-section #section-alert").html(alert);
};
const uiAlertFail = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#accountingCashOutModal div#failed").html(alert);
  $("div#accountingCashOutModal div.modal-body").get(0).scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const uiAlertFail1 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#accountingCashInModal div#failed").html(alert);
  $("#accountingCashInModal div.modal-body").get(0).scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const uiAlertFail2 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#accounting-create-etc div.failed").html(alert);
  $("div#accounting-create-etc div.modal-body").get(0).scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const uiAlertFail3 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#accounting-modal-convert-csv div.failed").html(alert);
  $("div#accounting-modal-convert-csv div.modal-body").get(0).scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const uiAlertFail4 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#accounting-modal-convert-pdf div.failed").html(alert);
  $("div#accounting-modal-convert-pdf div.modal-body").get(0).scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const uiReset = () => {
  $("input#cashin_date").val("");
  $("input#cashin_time").val("");
  $("select#cashin_method").val("");
  $("#accountingCashInModal #failed").html(``);
  $("#cashin_other_value div.activity").html("");
  $("#accountingCashInModal").modal("hide");
};
const uiReset1 = () => {
  $("input#cashout_date").val("");
  $("input#cashout_time").val("");
  $("select#cashout_method").val("");
  $("#accountingCashOutModal #failed").html(``);
  $("#cashout_other_value div.activity").html("");
  $("#accountingCashOutModal").modal("hide");
};
const uiReset2 = () => {
  $("input#accounting-date").val("");
  $("input#accounting-time").val("");
  $("select#accounting-method").val("");
  $("#accounting-create-etc .failed").html(``);
  $("div#accounting-create-etc div#activity").html("");
  $("#accounting-create-etc").modal("hide");
};
const uiReset3 = () => {
  $("div#accounting-modal-convert-pdf div.failed").html("");
  $("div#accounting-modal-convert-pdf input#accounting-start-date-1").val("");
  $("div#accounting-modal-convert-pdf input#accounting-end-date-1").val("");
  $("div#accounting-modal-convert-pdf").modal("hide");
};
const uiTotalPayment = (qty, method) => {
  const productSelected = $("div#cashout_other_value select#product");
  const productId = $(productSelected).val();
  const interest = parseFloat($("input#interest").val().replace("%", ""));
  let price = 0;
  if (method === "price-buy") {
    price = $(productSelected).find("option:selected").data("pricebuy");
  } else {
    price = $(productSelected).find("option:selected").data("pricesell");
  }
  if (productId !== null) {
    const total = price * qty;
    // after discount price
    let total1 = total;
    if (interest > 0) {
      const discountPrice = total * (interest / 100);
      total1 = total - discountPrice;
    }
    // subTotal
    const div = `
    <p class="mb-0 fs-5">Sub Total :</p>
    <p class="mb-0 fs-5">${formatRupiah2(total)}</p> `;
    $("div#sub-total").html(div);
    // grand total
    const div1 = `
    <p class="mb-0 fs-5">Grand Total :</p>
    <p class="mb-0 fs-5">${formatRupiah2(total1)}</p> `;
    $("div#grand-total").html(div1);
  }
  if (productId === null) {
    // subTotal
    const div = `
    <p class="mb-0 fs-5">Sub Total :</p>
    <p class="mb-0 fs-5">0</p> `;
    $("div#sub-total").html(div);
    const div1 = `
    <p class="mb-0 fs-5">Grand Total :</p>
    <p class="mb-0 fs-5">0</p> `;
    $("div#grand-total").html(div1);
  }
};
const uiTotal = (method) => {
  const qty = parseFloat($("div#accounting-create-etc input#qty-2").val());
  const percent = $("input#etc-interest").val().replace("%", "");
  const productSelected = $("div#accounting-create-etc select#product-1");
  const productId = $(productSelected).val();
  let price = 0;
  if (method === "price-buy") {
    price = $(productSelected).find("option:selected").data("pricebuy");
  } else {
    price = $(productSelected).find("option:selected").data("pricesell");
  }
  if (productId !== null) {
    const total = price * qty;
    let total1 = total;
    if (percent > 0) {
      const productInterest = price * (percent / 100);
      total1 = total + productInterest;
    }
    // sub total
    const div = `
    <p class="mb-0 fs-5">Sub Total :</p>
    <p class="mb-0 fs-5">${formatRupiah2(total)}</p> `;
    $("div#sub-total").html(div);
    // grand total
    const div1 = `
    <p class="mb-0 fs-5">Grand Total :</p>
    <p class="mb-0 fs-5">${formatRupiah2(total1)}</p> `;
    $("div#grand-total").html(div1);
  }
  if (productId === null) {
    // subTotal
    const div = `
    <p class="mb-0 fs-5">Sub Total :</p>
    <p class="mb-0 fs-5">0</p> `;
    $("div#sub-total").html(div);
    const div1 = `
    <p class="mb-0 fs-5">Grand Total :</p>
    <p class="mb-0 fs-5">0</p> `;
    $("div#grand-total").html(div1);
  }
};
const uiTotalIncome = (qty, method) => {
  const productSelected = $("div#cashin_other_value select#product");
  const productId = $(productSelected).val();
  const interest = parseFloat($("input#interest").val().replace("%", ""));
  let price = 0;
  if (method === "price-buy") {
    price = $(productSelected).find("option:selected").data("pricebuy");
  } else {
    price = $(productSelected).find("option:selected").data("pricesell");
  }
  if (productId !== null) {
    const total = price * qty;
    let total1 = total;
    if (interest > 0) {
      const discountPrice = total * (interest / 100);
      total1 = total - discountPrice;
    }
    // subTotal
    const div = `
    <p class="mb-0 fs-5">Sub Total :</p>
    <p class="mb-0 fs-5">${formatRupiah2(total)}</p> `;
    $("div#sub-total").html(div);
    // grand total
    const div1 = `
    <p class="mb-0 fs-5">Grand Total :</p>
    <p class="mb-0 fs-5">${formatRupiah2(total1)}</p>
    `;
    $("div#grand-total").html(div1);
  }
  if (productId === null) {
    // subTotal
    const div = `
    <p class="mb-0 fs-5">Sub Total :</p>
    <p class="mb-0 fs-5">0</p> `;
    $("div#sub-total").html(div);
    const div1 = `
    <p class="mb-0 fs-5">Grand Total :</p>
    <p class="mb-0 fs-5">0</p> `;
    $("div#grand-total").html(div1);
  }
};
// cash-in-product-sale
const uiProductMode = (productList, listCustomer1, listSales1) => {
  const div = `
  <!-- product -->
  <div class="mb-4">
    <label for="product" class="form-label fs-4">Product</label>
    <select id="product" class="form-control">
      ${productList}
    </select>
  </div>
  <!-- section mode product -->
  <div class="section-qty-total"></div>
  <!-- customer user id -->
  <div class="mb-3">
    <label for="customeruserid" class="form-label fs-4">Customers</label>
    <select id="customeruserid" class="form-control text-capitalize">
      ${listCustomer1}
    </select>
  </div>
  <!-- sales user id -->
  <div class="mb-3">
    <label for="saleuserid" class="form-label fs-4">Sales</label>
    <select id="saleuserid" class="form-control text-capitalize">
      ${listSales1}
    </select>
  </div>
  <!-- further information -->
  <div class="mb-3">
    <label for="cashin_info" class="form-label fs-4">Information</label>
    <textarea
      class="form-control"
      placeholder="furhter information"
      style="height: 100px"
      id="cashin_info"
    ></textarea>
  </div> `;
  $("#cashin_other_value div.activity").html(div);
  $("div.activity select#product")
    .off("change")
    .on("change", function () {
      const div = `
      <!-- qty -->
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <label for="qty" class="form-label fs-4">Qty</label>
          <div class="d-flex align-items-center">
            <!-- decrease -->
            <button id="decrease" class="btn btn-danger fs-4">-</button>
            <input
              id="qty"
              type="text"
              class="form-control fs-3 mx-2 p-1 text-center"
              placeholder="0"
              style="width: 80px"
            />
            <!-- increase -->
            <button id="increase" class="btn btn-success fs-4">+</button>
          </div>
        </div>
      </div>
      <!-- Sub Total -->
      <div class="d-flex mb-1 justify-content-between" id="sub-total">
          <p class="mb-0 fs-5">Sub Total :</p>
          <p class="mb-0 fs-5">0</p> 
      </div> 
      <!-- interest -->
      <div class="mb-1 d-flex justify-content-between align-items-center">
        <label for="interest" class="form-label fs-5 mb-0">Discount : </label>
        <input
          type="text"
          class="form-control fs-5 text-end shadow-none border-0 p-0"
          id="interest"
          placeholder="0%"
          style="width: 80px"
        />
      </div>
      <!-- Grand Total -->
      <div class="mb-3 d-flex justify-content-between align-items-center" id="grand-total">
        <p class="mb-0 fs-5">Grand Total :</p>
        <p class="mb-0 fs-5">0</p>
      </div>
      `;
      $("div.section-qty-total").html(div);
      // function-increase-decrease-qty
      let qty = $("div#cashin_other_value input#qty").val();
      // decrase
      $("div#cashin_other_value button#decrease")
        .off("click")
        .on("click", function () {
          qty--;
          if (qty < 0) {
            qty = 0;
            $(this).attr("disabled", true);
          }
          uiTotalIncome(qty, "price-sale");
          $("div#cashin_other_value input#qty").val(qty);
        });
      // input
      $("div#cashin_other_value input#qty")
        .off("input")
        .on("input", function () {
          qty = $(this).val().replace(numberRgx, "");
          $(this).val(qty);
          uiTotalIncome(qty, "price-sale");
        });
      // increase
      $("div#cashin_other_value button#increase")
        .off("click")
        .on("click", function () {
          qty++;
          uiTotalIncome(qty, "price-sale");
          $("div#cashin_other_value button#decrease").attr("disabled", false);
          $("div#cashin_other_value input#qty").val(qty);
        });
      // function interest
      $("input#interest")
        .off("input")
        .on("input", function () {
          const formatted = formatPercentage($(this).val());
          $(this).val(formatted);
          uiTotalIncome(qty, "price-sale");
        })
        .off("keydown")
        .on("keydown", function (event) {
          handleBackspace(event, $(this));
          uiTotalIncome(qty, "price-sale");
        });
    });
};
// cash-in-return-product-buy
const uiProductMode1 = (productList) => {
  const div = `
  <!-- product -->
  <div class="mb-4">
    <label for="product" class="form-label fs-4">Product</label>
    <select id="product" class="form-control">
      ${productList}
    </select>
  </div>
  <!-- section mode product -->
  <div class="section-qty-total"></div>
  <!-- further information -->
  <div class="mb-3">
    <label for="cashin_info" class="form-label fs-4">Information</label>
    <textarea
      class="form-control"
      placeholder="furhter information"
      style="height: 100px"
      id="cashin_info"
    ></textarea>
  </div> `;
  $("#cashin_other_value div.activity").html(div);
  $("#cashin_other_value div.activity select#product")
    .off("change")
    .on("change", function () {
      const div = `
      <!-- qty -->
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <label for="qty" class="form-label fs-4">Qty</label>
          <div class="d-flex align-items-center">
            <!-- decrease -->
            <button id="decrease" class="btn btn-danger fs-4">-</button>
            <input
              id="qty"
              type="text"
              class="form-control fs-3 mx-2 p-1 text-center"
              placeholder="0"
              style="width: 80px"
            />
            <!-- increase -->
            <button id="increase" class="btn btn-success fs-4">+</button>
          </div>
        </div>
      </div>
      <!-- Sub Total-->
      <div class="d-flex mb-1 justify-content-between" id="sub-total">
          <p class="mb-0 fs-5">Sub Total :</p>
          <p class="mb-0 fs-5">0</p>       
      </div> 
      <!-- Discount -->
      <div class="mb-1 d-flex justify-content-between align-items-center">
        <label for="interest" class="form-label fs-5 mb-0">Discount : </label>
        <input
          type="text"
          class="form-control fs-5 text-end shadow-none border-0 p-0"
          id="interest"
          placeholder="0%"
          style="width: 80px"
        />
      </div>
      <!-- Grand Total -->
      <div class="mb-3 d-flex justify-content-between align-items-center" id="grand-total">
        <p class="mb-0 fs-5">Grand Total :</p>
        <p class="mb-0 fs-5">0</p>
      </div>         
      `;
      $("div.section-qty-total").html(div);
      // function-increase-decrease-qty
      let qty = $("div#cashin_other_value input#qty").val();
      // decrase
      $("div#cashin_other_value button#decrease")
        .off("click")
        .on("click", function () {
          qty--;
          if (qty < 0) {
            qty = 0;
            $(this).attr("disabled", true);
          }
          uiTotalIncome(qty, "price-buy");
          $("div#cashin_other_value input#qty").val(qty);
        });
      // input
      $("div#cashin_other_value input#qty")
        .off("input")
        .on("input", function () {
          qty = $(this).val().replace(numberRgx, "");
          $(this).val(qty);
          uiTotalIncome(qty, "price-buy");
        });
      // increase
      $("div#cashin_other_value button#increase")
        .off("click")
        .on("click", function () {
          qty++;
          uiTotalIncome(qty, "price-buy");
          $("div#cashin_other_value button#decrease").attr("disabled", false);
          $("div#cashin_other_value input#qty").val(qty);
        });
      // function interest
      $("input#interest")
        .off("input")
        .on("input", function () {
          const formatted = formatPercentage($(this).val());
          $(this).val(formatted);
          uiTotalIncome(qty, "price-buy");
        })
        .off("keydown")
        .on("keydown", function (event) {
          handleBackspace(event, $(this));
          uiTotalIncome(qty, "price-buy");
        });
    });
};
// cash-out-product-buy
const uiProductMode2 = (productList) => {
  const div = `
  <!-- cashBalance  -->
  <div class="mb-3">
    <label for="cash-balance" class="form-label fs-4">Cash Available</label>
    <input type="text" class="form-control" id="cash-balance" readonly />
  </div>
  <!-- product -->
  <div class="mb-4">
    <label for="product" class="form-label fs-4">Product</label>
    <select id="product" class="form-control">
      ${productList}
    </select>
  </div>
  <!-- section mode product -->
  <div class="section-qty-total"></div>
  <!-- further information -->
  <div class="mb-3">
    <label for="cashout_info" class="form-label fs-4">Information</label>
    <textarea
      class="form-control"
      placeholder="furhter information"
      style="height: 100px"
      id="cashout_info"
    ></textarea>
  </div> `;
  $("#accountingCashOutModal div.activity").html(div);
  $("#accountingCashOutModal div.activity select#product")
    .off("change")
    .on("change", function () {
      const div = `
      <!-- qty -->
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <label for="qty-1" class="form-label fs-4">Qty</label>
          <div class="d-flex align-items-center">
            <!-- decrease -->
            <button id="decrease" class="btn btn-danger fs-4">-</button>
            <input
              id="qty-1"
              type="text"
              class="form-control fs-3 mx-2 p-1 text-center"
              placeholder="0"
              style="width: 80px"
            />
            <!-- increase -->
            <button id="increase" class="btn btn-success fs-4">+</button>
          </div>
        </div>
      </div>
      <!-- Sub Total-->
      <div class="d-flex mb-1 justify-content-between" id="sub-total">
          <p class="mb-0 fs-5">Sub Total :</p>
          <p class="mb-0 fs-5">0</p>       
      </div> 
      <!-- Discount -->
      <div class="mb-1 d-flex justify-content-between align-items-center">
        <label for="interest" class="form-label fs-5 mb-0">Discount : </label>
        <input
          type="text"
          class="form-control fs-5 text-end shadow-none border-0 p-0"
          id="interest"
          placeholder="0%"
          style="width: 80px"
        />
      </div>
      <!-- Grand Total -->
      <div class="mb-3 d-flex justify-content-between align-items-center" id="grand-total">
        <p class="mb-0 fs-5">Grand Total :</p>
        <p class="mb-0 fs-5">0</p>
      </div>      
      `;
      $("div.section-qty-total").html(div);
      // function-increase-decrease-qty
      let qty = $("div#cashout_other_value input#qty-1").val();
      // decrase
      $("div#cashout_other_value button#decrease")
        .off("click")
        .on("click", function () {
          qty--;
          if (qty < 0) {
            qty = 0;
            $(this).attr("disabled", true);
          }
          uiTotalPayment(qty, "price-buy");
          $("div#cashout_other_value input#qty-1").val(qty);
        });
      // input
      $("div#cashout_other_value input#qty-1")
        .off("input")
        .on("input", function () {
          qty = $(this).val().replace(numberRgx, "");
          $(this).val(qty);
          uiTotalPayment(qty, "price-buy");
        });
      // increase
      $("div#cashout_other_value button#increase")
        .off("click")
        .on("click", function () {
          qty++;
          $("div#cashout_other_value button#decrease").attr("disabled", false);
          uiTotalPayment(qty, "price-buy");
          $("div#cashout_other_value input#qty-1").val(qty);
        });
      // function interest
      $("input#interest")
        .off("input")
        .on("input", function () {
          const formatted = formatPercentage($(this).val());
          $(this).val(formatted);
          uiTotalPayment(qty, "price-buy");
        })
        .off("keydown")
        .on("keydown", function (event) {
          handleBackspace(event, $(this));
          uiTotalPayment(qty, "price-buy");
        });
    });
};
// cash-out-return-product-sale
const uiProductMode3 = (productList, listCustomer1, listSales1) => {
  const div = `
  <!-- cashBalance  -->
  <div class="mb-3">
    <label for="cash-balance" class="form-label fs-4">Cash Available</label>
    <input type="text" class="form-control" id="cash-balance" readonly />
  </div>
  <!-- product -->
  <div class="mb-4">
    <label for="product" class="form-label fs-4">Product</label>
    <select id="product" class="form-control">
      ${productList}
    </select>
  </div>
  <!-- section mode product -->
  <div class="section-qty-total"></div>
  <!-- customer user id -->
  <div class="mb-3">
    <label for="customeruserid" class="form-label fs-4">Customers</label>
    <select id="customeruserid" class="form-control text-capitalize">
      ${listCustomer1}
    </select>
  </div>
  <!-- sales user id -->
  <div class="mb-3">
    <label for="saleuserid" class="form-label fs-4">Sales</label>
    <select id="saleuserid" class="form-control text-capitalize">
      ${listSales1}
    </select>
  </div>
  <!-- further information -->
  <div class="mb-3">
    <label for="cashout_info" class="form-label fs-4">Information</label>
    <textarea
      class="form-control"
      placeholder="furhter information"
      style="height: 100px"
      id="cashout_info"
    ></textarea>
  </div> `;
  $("#cashout_other_value div.activity").html(div);
  $("#cashout_other_value div.activity select#product")
    .off("change")
    .on("change", function () {
      const div = `
      <!-- qty -->
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center w-100">
          <label for="qty-1" class="form-label fs-4">Qty</label>
          <div class="d-flex align-items-center">
            <!-- decrease -->
            <button id="decrease" class="btn btn-danger fs-4">-</button>
            <input
              id="qty-1"
              type="text"
              class="form-control fs-3 mx-2 p-1 text-center"
              placeholder="0"
              style="width: 80px"
            />
            <!-- increase -->
            <button id="increase" class="btn btn-success fs-4">+</button>
          </div>
        </div>
      </div>
      <!-- Sub Total -->
      <div class="d-flex mb-1 justify-content-between" id="sub-total">
        <p class="mb-0 fs-5">Sub Total :</p>
        <p class="mb-0 fs-5">0</p>      
      </div>
      <!-- interest -->
      <div class="mb-1 d-flex justify-content-between align-items-center">
        <label for="interest" class="form-label fs-5 mb-0">Discount : </label>
        <input
          type="text"
          class="form-control fs-5 text-end shadow-none border-0 p-0"
          id="interest"
          placeholder="0%"
          style="width: 80px"
        />
      </div>
      <!-- Grand Total -->
      <div class="d-flex mb-3 justify-content-between" id="grand-total">
        <p class="mb-0 fs-5">Grand Total :</p>
        <p class="mb-0 fs-5">0</p>      
      </div>
      `;
      $("div.section-qty-total").html(div);
      // function-increase-decrease-qty
      let qty = $("div#cashout_other_value input#qty-1").val();
      // decrase
      $("div#cashout_other_value button#decrease")
        .off("click")
        .on("click", function () {
          qty--;
          if (qty < 0) {
            qty = 0;
            $(this).attr("disabled", true);
          }
          uiTotalPayment(qty, "price-sale");
          $("div#cashout_other_value input#qty-1").val(qty);
        });
      // input
      $("div#cashout_other_value input#qty-1")
        .off("input")
        .on("input", function () {
          qty = $(this).val().replace(numberRgx, "");
          $(this).val(qty);
          uiTotalPayment(qty, "price-sale");
        });
      // increase
      $("div#cashout_other_value button#increase")
        .off("click")
        .on("click", function () {
          qty++;
          uiTotalPayment(qty, "price-sale");
          $("div#cashout_other_value button#decrease").attr("disabled", false);
          $("div#cashout_other_value input#qty-1").val(qty);
        });
      // function interest
      $("input#interest")
        .off("input")
        .on("input", function () {
          const formatted = formatPercentage($(this).val());
          $(this).val(formatted);
          uiTotalPayment(qty, "price-sale");
        })
        .off("keydown")
        .on("keydown", function (event) {
          handleBackspace(event, $(this));
          uiTotalPayment(qty, "price-sale");
        });
    });
};
// etc-product-buy-credit | etc-return-product-buy-credit
const uiProductMode4 = (listProduct) => {
  const div = `
  <!-- product -->
  <div class="mb-4">
    <label for="product-1" class="form-label fs-4">Product </label>
    <select id="product-1" class="form-control text-capitalize">
      ${listProduct}
    </select>
  </div>
  <!-- section mode product -->
  <div class="section-qty-total"></div>
  <!-- information -->
  <div class="mb-3">
    <label for="accounting-info" class="form-label fs-4">Information : </label>
    <textarea id="accounting-info" class="form-control"></textarea>
  </div>  
  `;
  $("div#accounting-create-etc div#activity").html(div);
  $("div#accounting-create-etc select#product-1")
    .off("change")
    .on("change", function () {
      const ui = `
      <!-- qty -->
      <div class="d-flex justify-content-between align-items-center w-100 mb-3">
        <label for="qty-2" class="form-label fs-4">Qty</label>
        <div class="d-flex align-items-center">
          <!-- decrease -->
          <button id="decrease" class="btn btn-danger fs-4">-</button>
          <!-- value -->
          <input
            id="qty-2"
            type="text"
            class="form-control fs-3 mx-2 p-1 text-center"
            placeholder="0"
            style="width: 80px"
          />
          <!-- increase -->
          <button id="increase" class="btn btn-success fs-4">+</button>
        </div>
      </div>
      <!-- Sub Total  -->
      <div class="d-flex mb-1 justify-content-between" id="sub-total">
          <p class="mb-0 fs-5">Sub Total :</p>
          <p class="mb-0 fs-5">${formatRupiah2(0)}</p> 
      </div>
      <!-- Interest -->
      <div class="mb-1 d-flex justify-content-between align-items-center">
        <label for="etc-interest" class="form-label fs-5 mb-0"
          >Interest :
        </label>
        <input
          class="fs-5 border-0 shadow-none form-control text-end"
          id="etc-interest"
          placeholder="0%"
          style="width: 100px"
        />
      </div>
      <!-- Grand Total  -->
      <div class="d-flex mb-3 justify-content-between" id="grand-total">
          <p class="mb-0 fs-5">Grand Total :</p>
          <p class="mb-0 fs-5">${formatRupiah2(0)}</p> 
      </div>
      `;
      $("div.section-qty-total").html(ui);
      // function-increase-decrease-qty
      let qty = $("div#accounting-create-etc input#qty-2").val();
      // decrase
      $("div#accounting-create-etc button#decrease")
        .off("click")
        .on("click", function () {
          qty--;
          if (qty <= 0) {
            $(this).attr("disabled", true);
            qty = 0;
          }
          $("div#accounting-create-etc input#qty-2").val(qty);
          uiTotal("pricebuy");
        });
      // input
      $("div#accounting-create-etc input#qty-2")
        .off("keyup")
        .on("keyup", function () {
          qty = $(this).val().replace(numberRgx, "");
          $(this).val(qty);
          uiTotal("pricebuy");
        });
      // increase
      $("div#accounting-create-etc button#increase")
        .off("click")
        .on("click", function () {
          qty++;
          $("div#accounting-create-etc button#decrease").attr(
            "disabled",
            false
          );
          $("div#accounting-create-etc input#qty-2").val(qty);
          uiTotal("pricebuy");
        });
      // function interest
      $("input#etc-interest")
        .off("input")
        .on("input", function () {
          const formatted = formatPercentage($(this).val());
          $(this).val(formatted);
          uiTotal("pricebuy");
        })
        .off("keydown")
        .on("keydown", function (event) {
          handleBackspace(event, $(this));
          uiTotal("pricebuy");
        });
    });
};
// etc-product-sale-credit | etc-return-product-sale-credit
const uiProductMode5 = (listProduct, listCustomer1, listSale) => {
  const div = `
  <!-- product -->
  <div class="mb-4">
    <label for="product-1" class="form-label fs-4">Product </label>
    <select id="product-1" class="form-control text-capitalize">
      ${listProduct}
    </select>
  </div>
  <!-- section mode product -->
  <div class="section-qty-total"></div>             
  <!-- customer -->
  <div class="mb-3">
    <label for="user-customer-id" class="form-label fs-4">Customer</label>
    <select id="user-customer-id" class="form-control text-capitalize">
      ${listCustomer1}
    </select>
  </div>
  <!-- sales -->
  <div class="mb-3">
    <label for="user-sale-id" class="form-label fs-4">Sale</label>
    <select id="user-sale-id" class="form-control text-capitalize">
      ${listSale}
    </select>
  </div>
  <!-- information -->
  <div>
    <label for="accounting-info" class="form-label fs-4">Information : </label>
    <textarea id="accounting-info" class="form-control"></textarea>
  </div> 
  `;
  $("div#accounting-create-etc div#activity").html(div);
  $("div#accounting-create-etc select#product-1")
    .off("change")
    .on("change", function () {
      const ui = `
      <!-- qty -->
      <div class="d-flex justify-content-between align-items-center w-100 mb-3">
        <label for="qty-2" class="form-label fs-4">Qty</label>
        <div class="d-flex align-items-center">
          <!-- decrease -->
          <button id="decrease" class="btn btn-danger fs-4">-</button>
          <!-- value -->
          <input
            id="qty-2"
            type="text"
            class="form-control fs-3 mx-2 p-1 text-center"
            placeholder="0"
            style="width: 80px"
          />
          <!-- increase -->
          <button id="increase" class="btn btn-success fs-4">+</button>
        </div>
      </div>
      <!-- Grand Total  -->
      <div class="d-flex mb-1 justify-content-between" id="sub-total">
        <p class="mb-0 fs-5">Sub Total :</p>
        <p class="mb-0 fs-5">${formatRupiah2(0)}</p>
      </div>
      <!-- Interest -->
      <div class="mb-1 d-flex justify-content-between align-items-center">
        <label for="etc-interest" class="form-label fs-5 mb-0"
          >Interest :
        </label>
        <input
          class="fs-5 border-0 shadow-none form-control text-end"
          id="etc-interest"
          placeholder="0%"
          style="width: 100px"
        />
      </div>
      <!-- Total  -->
      <div class="d-flex mb-3 justify-content-between" id="grand-total">
          <p class="mb-0 fs-5">Grand Total :</p>
          <p class="mb-0 fs-5">${formatRupiah2(0)}</p> 
      </div>
      `;
      $("div.section-qty-total").html(ui);
      // function-increase-decrease-qty
      let qty = $("div#accounting-create-etc input#qty-2").val();
      // decrase
      $("div#accounting-create-etc button#decrease")
        .off("click")
        .on("click", function () {
          qty--;
          if (qty <= 0) {
            $(this).attr("disabled", true);
            qty = 0;
          }
          $("div#accounting-create-etc input#qty-2").val(qty);
          uiTotal("pricesell");
        });
      // input
      $("div#accounting-create-etc input#qty-2")
        .off("keyup")
        .on("keyup", function () {
          qty = $(this).val().replace(numberRgx, "");
          $(this).val(qty);
          uiTotal("pricesell");
        });
      // increase
      $("div#accounting-create-etc button#increase")
        .off("click")
        .on("click", function () {
          qty++;
          $("div#accounting-create-etc button#decrease").attr(
            "disabled",
            false
          );
          $("div#accounting-create-etc input#qty-2").val(qty);
          uiTotal("pricesell");
        });
      // function interest
      $("input#etc-interest")
        .off("input")
        .on("input", function () {
          const formatted = formatPercentage($(this).val());
          $(this).val(formatted);
          uiTotal("pricesell");
        })
        .off("keydown")
        .on("keydown", function (event) {
          handleBackspace(event, $(this));
          uiTotal("pricesell");
        });
    });
};
const uiListAsset = async () => {
  const { status, response } = await getAccountingAssetAPI();
  if (status) {
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      response.forEach((el) => {
        const assetId = el.AccountingId;
        const assetName = el.AccountingName;
        const assetBalance = el.AssetBalance;
        const assetType = el.AccountingRef;
        option += `
      <option 
        value="${assetId}"
        data-assetname="${assetName}" 
        data-assetbalance="${assetBalance}"
        data-assettype="${assetType}">
        ${assetName}  - ${formatRupiah2(assetBalance)}
      </option>`;
      });
    }
    if (!existed) {
      option += `
    <option selected disabled class="fst-italic text-center">
      Asset is Empty....
    </option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const uiFinancialStatement = (response) => {
  const { FinancialPosition, ProfitOrLoss } = response;
  // 1.Financial Position
  const { Assets, LiabilityEquity } = FinancialPosition;
  const { CurrentAssets, FixedAssets, TotalAssetsChanges } = Assets;
  // current-assets
  const {
    TotalCash,
    TotalReceivable,
    CurrentAsset,
    MerchandiseInventory,
    TotalCurrentAssetChanges,
  } = CurrentAssets;
  // fixed-assets
  const { FixedAsset, FixedAccumulated, TotalFixedAsset } = FixedAssets;
  // liability
  const { Liabilities, EquityChanges, TotalLiabilityEquityChanges } =
    LiabilityEquity;
  const { Liability, TotalLiability } = Liabilities;
  // equity
  const {
    Equity,
    TotalEquity1,
    EquityWithDrawl,
    TotalEquityWithDrawl,
    TotalEquityChanges,
  } = EquityChanges;
  const financialPosition = `
    <!-- financial Position -->
    <div class="mb-5">
      <!-- head -->
      <div class="mb-3">
        <h4 class="fw-bold text-center">Statement Of Financial Position</h4>
        <h4 class="fw-bold text-center">Innostack</h4>
      </div>
      <!-- body -->
      <div>
        <!-- Assets -->
        <div>
          <!-- head -->
          <div class="ms-2 mb-2">
            <h5 class="fw-bold">Assets</h5>
          </div>
          <!-- Body -->
          <div class="mb-2 ms-2">
            <!-- current asset -->
            <h5 class="fw-bold ms-2">Current Assets</h5>
            <!-- Cash -->
            <div class="ms-3 d-flex justify-content-between">
              <h5 class="ms-2">Cash</h5>
              <h5>${formatRupiah2(TotalCash)}</h5>
            </div>
            <!-- Receivable -->
            <div class="ms-3 d-flex justify-content-between">
              <h5 class="ms-2">Receivable</h5>
              <h5>${formatRupiah2(TotalReceivable)}</h5>
            </div>
            <!-- Merchandise inventory -->
            <div class="ms-3 d-flex justify-content-between">
              <h5 class="ms-2">Merchandise inventory</h5>
              <h5>${formatRupiah2(MerchandiseInventory)}</h5>
            </div>
            <!-- Others Current Asset -->
            ${
              CurrentAsset.length > 0
                ? CurrentAsset.map(
                    (el) => `
            <div class="d-flex justify-content-between">
              <h5 class="ms-2">${el.AccountingName}</h5>
              <h5>${formatRupiah2(el.AccountingBalance)}</h5>
            </div>
            `
                  ).join("")
                : ""
            }
            <!-- total current assets-->
            ${`
            <div class="d-flex justify-content-between">
              <h5 class="ms-2 fw-bold">Total Current Asset</h5>
              <h5>${formatRupiah2(TotalCurrentAssetChanges)}</h5>
            </div>
            `}
            <!-- fixed asset -->
            <h5 class="fw-bold ms-2">Fixed Asset</h5>
            <!-- Fixed Asset -->
            ${
              FixedAsset.length > 0
                ? FixedAsset.map(
                    (el) => `
            <div class="d-flex justify-content-between">
              <h5 class="ms-4">${el.AccountingName}</h5>
              <h5>${formatRupiah2(el.Total)}</h5>
            </div>
            `
                  ).join("")
                : ""
            }
            <!-- Fixed Asset Accumulated -->
            ${
              FixedAccumulated.length > 0
                ? FixedAccumulated.map(
                    (el) => `
            <div class="d-flex justify-content-between">
              <h5 class="ms-4">${el.AccountingName}</h5>
              <h5>${formatRupiah2(el.AccountingBalance)}</h5>
            </div>
            `
                  ).join("")
                : ""
            }
            <!-- Total Fixed Asset -->
            <div class="ms-2 mb-2 d-flex justify-content-between">
              <h5 class="fw-bold">Total Fixed Assets</h5>
              <h5 class="fw-bold">${formatRupiah2(TotalFixedAsset)}</h5>
            </div>
          </div>
          <!-- footer -->
          <div class="ms-2 mb-2 d-flex justify-content-between">
            <h5 class="fw-bold">Total Assets</h5>
            <h5 class="fw-bold">${formatRupiah2(TotalAssetsChanges)}</h5>
          </div>
        </div>
        <!-- liability & equity -->
        <div>
          <!-- head  -->
          <div class="ms-2 mb-2">
            <h5 class="fw-bold">Liability & Equity</h5>
          </div>
          <!-- liability -->
          <div class="mb-2 ms-2">
            <h5 class="fw-bold ms-2">Liability</h5>
            <!-- Liability -->
            ${
              Liability.length > 0
                ? Liability.map(
                    (el) => `
            <div class="d-flex justify-content-between">
              <h5 class="ms-4">${el.AccountingName}</h5>
              <h5>${formatRupiah2(el.TotalLiability)}</h5>
            </div>
            `
                  ).join("")
                : ""
            }
            <!-- total liability -->
            <div class="d-flex justify-content-between">
              <h5 class="ms-2 fw-bold">Total Liability</h5>
              <h5>${formatRupiah2(TotalLiability)}</h5>
            </div>
          </div>
          <!-- equity -->
          <div class="mb-2 ms-2">
            <h5 class="fw-bold ms-2">Equity</h5>
            <!-- equity -->
            ${
              Equity.length > 0
                ? Equity.map(
                    (el) => `
            <div class="d-flex justify-content-between">
              <h5 class="ms-4">${el.AccountingName.split("-")[1]}</h5>
              <h5>${formatRupiah2(el.TotalEquity)}</h5>
            </div>
            `
                  ).join("")
                : ""
            }
            <!-- total equity -->
            <div class="d-flex justify-content-between">
              <h5 class="ms-2 fw-bold">Total Equity</h5>
              <h5>${formatRupiah2(TotalEquity1)}</h5>
            </div>
          </div>
          <!-- total liability & changes  -->
          <div class="ms-2 mb-2 d-flex justify-content-between">
            <h5 class="fw-bold">Total Liability & Equity</h5>
            <h5 class="fw-bold">
              ${formatRupiah2(TotalLiabilityEquityChanges)}
            </h5>
          </div>
        </div>
      </div>
    </div> 
  `;
  // profit or loss
  const {
    Sales,
    Purchase,
    COGS,
    GrossProfitOrLoss,
    Expenses,
    RevenueOthers,
    NetProfitOrLoss,
    ProfitAttribute,
  } = ProfitOrLoss;
  const { TotalSales, TotalSalesReturn, TotalSalesDiscount, TotalSalesNet } =
    Sales;
  const {
    TotalPurchase,
    TotalPurchaseReturn,
    TotalPurchaseDiscount,
    TotalPurchaseNet,
  } = Purchase;
  const { Expense, TotalExpense } = Expenses;
  const { RevenueOther, TotalRevenue } = RevenueOthers;
  const profitOrLoss = `
  <!-- profit or loss -->
  <div class="mb-3">
    <!-- head -->
    <div class="mb-3 text-center">
      <h4 class="fw-bold">Statement Of Profit or Loss</h4>
      <h4 class="fw-bold">Innostack Company</h4>
    </div>
    <!-- sales -->
    <div class="ms-2 mb-2">
      <!-- head -->
      <div class="mb-2">
        <h5 class="fw-bold">Sales</h5>
      </div>
      <!-- sales discount -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Sales</h5>
        <h5>${formatRupiah2(TotalSales)}</h5>
      </div>
      <!-- sales return -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Sales Return</h5>
        <h5>${formatPrice(TotalSalesReturn * -1)}</h5>
      </div>
      <!-- sales discount -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Sales Discount</h5>
        <h5>${formatPrice(TotalSalesDiscount * -1)}</h5>
      </div>
      <!-- total net of sale -->
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Net Of Sales</h5>
        <h5>${formatRupiah2(TotalSalesNet)}</h5>
      </div>
    </div>
    <!-- purchase -->
    <div class="ms-2 mb-2">
      <!-- head -->
      <div class="mb-2">
        <h5 class="fw-bold">Purchase</h5>
      </div>
      <!-- purchase -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Purhcase</h5>
        <h5>${formatRupiah2(TotalPurchase)}</h5>
      </div>
      <!-- purchase return -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Purhcase Return</h5>
        <h5>${formatPrice(TotalPurchaseReturn * -1)}</h5>
      </div>
      <!-- purchase discount -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Purhcase Discount</h5>
        <h5>${formatPrice(TotalPurchaseDiscount * -1)}</h5>
      </div>
      <!-- purchase net -->
      <div class="mb-2 d-flex justify-content-between">
        <h5 class="fw-bold">Net of Purchase</h5>
        <h5 class="fw-bold">${formatRupiah2(TotalPurchaseNet)}</h5>
      </div>
    </div>
    <!-- cost of good sold -->
    <div class="ms-2 mb-2">
      <!-- head -->
      <div class="mb-2">
        <h5 class="fw-bold">Cost of Goods Sold</h5>
      </div>
      <!-- net of purchase -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Net of Purchase</h5>
        <h5 class="fw-bold">${formatRupiah2(TotalPurchaseNet)}</h5>
      </div>
      <!-- remain of stock -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Remain of Stock</h5>
        <h5>${formatPrice(MerchandiseInventory * -1)}</h5>
      </div>
      <!-- footer -->
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Total Cost of Goods Sold</h5>
        <h5 class="fw-bold">${formatRupiah2(COGS)}</h5>
      </div>
    </div>
    <!-- gross of profit  -->
    <div class="ms-2 mb-2">
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Gross Of Profit</h5>
        <h5 class="fw-bold">${formatRupiah2(GrossProfitOrLoss)}</h5>
      </div>
    </div>
    <!-- expense -->
    <div class="ms-2 mb-2">
      <!-- head -->
      <div class="mb-2">
        <h5 class="fw-bold">Expense</h5>
      </div>
      <!-- expense -->
      ${
        Expense.length > 0
          ? Expense.map(
              (el) => `
        <div class="d-flex justify-content-between">
          <h5 class="ms-2">${el.AccountingName}</h5>
          <h5>${formatRupiah2(el.Total)}</h5>
        </div>
        `
            ).join("")
          : ""
      }
      <!-- footer -->
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Total of Expense</h5>
        <h5 class="fw-bold">${formatRupiah2(TotalExpense)}</h5>
      </div>
    </div>
    <!-- revenue -->
    <div class="ms-2 mb-2">
      <!-- head -->
      <div class="mb-2">
        <h5 class="fw-bold">Other Revenue</h5>
      </div>
      <!-- Revenue -->
      ${
        RevenueOther.length > 0
          ? RevenueOther.map(
              (el) => `
        <div class="d-flex justify-content-between ms-2">
          <h5>${el.AccountingName}</h5>
          <h5>${formatRupiah2(el.Total)}</h5>
        </div>
        `
            ).join("")
          : ""
      }
      <!-- footer -->
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Total of Other Revenue</h5>
        <h5 class="fw-bold">${formatRupiah2(TotalRevenue)}</h5>
      </div>
    </div>
    <!-- net of profit  -->
    <div class="ms-2 mb-2">
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold my-auto">Net Of Profit</h5>
        <span class="badge fs-5 
        ${NetProfitOrLoss >= 1 && "text-bg-success"} 
        ${NetProfitOrLoss < 0 && "text-bg-danger"} 
        ${NetProfitOrLoss === 0 && "text-bg-secondary"}
        ">
          ${formatPrice(NetProfitOrLoss)}
        </span>
      </div>
    </div>
    <!-- Profit attributable to -->
    <div class="ms-2 mb-2">
      <div>
        <h5 class="fw-bold">Profit Attributable To</h5>
      </div>
      ${
        ProfitAttribute.length > 0
          ? ProfitAttribute.map(
              (el) => `
        <div class="d-flex justify-content-between">
          <h5 class="ms-2 text-capitalize">${el.UserFullname}</h5>
          <h5>${formatRupiah2(el.ProfitAttributed)}</h5>
        </div>
        `
            ).join("")
          : ""
      }
    </div>
  </div>  
  `;
  const equityChange = `
  <!-- equity changes -->
  <div>
    <!-- head -->
    <div class="mb-3">
      <h4 class="text-center fw-bold">Statement of Equity in Changes</h4>
      <h5 class="text-center fw-bold">Innostack Company</h5>
    </div>
    <!-- body -->
    <div class="mb-2 ms-2">
      <!-- equity -->
      <div class="mb-2">
        <div>
          <h5 class="fw-bold">Equity</h5>
        </div>
        <!-- equity -->
        ${
          Equity.length > 0
            ? Equity.map(
                (el) => `
          <div class="d-flex justify-content-between">
            <h5 class="ms-2">${el.AccountingName.split("-")[1]}</h5>
            <h5>${formatPrice(el.TotalEquity)}</h5>
          </div>
          `
              ).join("")
            : ""
        }
        <!-- Total Equity -->
        <div class="d-flex justify-content-between">
          <h5 class="fw-bold">Total Equity</h5>
          <h5 class="fw-bold">${formatRupiah2(TotalEquity1)}</h5>
        </div>
      </div>
      <!-- withdrawl -->
      <div class="mb-2">
        <div>
          <h5 class="fw-bold">Withdrawl</h5>
        </div>
        <!-- withdrawl -->
        ${
          EquityWithDrawl.length > 0
            ? EquityWithDrawl.map(
                (el) => `
          <div class="d-flex justify-content-between">
            <h5 class="ms-2">${el.AccountingName.split("-")[1]}</h5>
            <h5>${formatPrice(el.TotalEquityWithDrawl)}</h5>
          </div>
          `
              ).join("")
            : ""
        }
        <div class="d-flex justify-content-between">
          <h5 class="fw-bold">Total Withdrawl</h5>
          <h5 class="fw-bold">${formatPrice(TotalEquityWithDrawl)}</h5>
        </div>
      </div>
      <!-- income summary -->
      <div class="mb-3 d-flex justify-content-between">
        <h5 class="fw-bold my-auto">Income Summary</h5>
        <span class="badge fs-5 
        ${NetProfitOrLoss >= 1 && "text-bg-success"} 
        ${NetProfitOrLoss < 0 && "text-bg-danger"} 
        ${NetProfitOrLoss === 0 && "text-bg-secondary"}
        ">
          ${formatPrice(NetProfitOrLoss)}
        </span>
      </div>
      <!-- total changes -->
      <div class="mb-2 d-flex justify-content-between">
        <h5 class="fw-bold">Total Changes In Equity</h5>
        <h5 class="fw-bold">${formatPrice(TotalEquityChanges)}</h5>
      </div>
    </div>
  </div>  
  `;
  const div = `
  <div class="d-flex gap-4">
    <div class="w-50">
      ${financialPosition}
      ${equityChange}
    </div>
    <div class="w-50">
      ${profitOrLoss}
    </div>
  </div>
  `;
  $("div#finacial-statement-section div.card-body").html(div);
};
export {
  uiAlertSuccess,
  uiAlertFail,
  uiAlertFail1,
  uiAlertFail2,
  uiAlertFail3,
  uiAlertFail4,
  uiBtnPage,
  uiBtnPageActived,
  uiFinancialStatement,
  uiListAsset,
  uiTbody,
  uiTbody1,
  uiTotalPayment,
  uiTotalIncome,
  uiProductMode,
  uiProductMode1,
  uiProductMode2,
  uiProductMode3,
  uiProductMode4,
  uiProductMode5,
  uiPDF,
  uiPDF1,
  uiPDF2,
  uiPDF3,
  uiPDF4,
  uiPDF5,
  uiPDF6,
  uiPDF7,
  uiPDF8,
  uiReset,
  uiReset1,
  uiReset2,
  uiReset3,
};
