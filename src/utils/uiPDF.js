import { formatCurrency1, formatCurrency2 } from "./formatCurrency";
import formatQty from "./formatQty";
import { formatTime } from "./formatTime";

const uiProductPdf = (products) => {
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const html = `
    <div class="mb-3">
      <h3>Table Product</h3>
      <h6>${indonesianDate}</h6>
      <div class="d-flex gap-1">
        <h6>${indonesiaHour} :</h6>
        <h6>${indonesiaMinute} :</h6>
        <h6>${indonesiaSecond}</h6>
      </div>
    </div>
    `;
  let tr = ``;
  let no = 1;
  products.forEach((row) => {
    const productName = row.ProductName;
    const productImg = row.ProductImage;
    const productPriceBuy = formatCurrency1(row.ProductPriceBuy);
    const productPriceSell = formatCurrency1(row.ProductPriceSell);
    // const productInfo = row.ProductInfo !== "" ? row.ProductInfo : "-"; || if needed
    tr += `
    <tr>
        <td class="text-center text-nowrap align-content-center">${no++}</td>
        <td class="text-nowrap align-content-center">${productName}</td>
        <td class="text-nowrap align-content-center">${productPriceBuy}</td>
        <td class="text-nowrap align-content-center">${productPriceSell}</td>
        <td class="d-flex justify-content-center">
            ${
              productImg !== "null"
                ? `<img
            src="${productImg}"
            style="width: 200px"
            />`
                : `
            <p class="text-nowrap text-muted fst-italic mb-0">no img displayed....</p>
            `
            }
        </td>
    </tr>  
      `;
  });
  const html1 = `
    <div class="mb-3">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price Buy</th>
            <th>Price Sell</th>
            <th class="text-center">Image</th>
          </tr>
        </thead>
        <tbody>
          ${tr}
        </tbody>
      </table>
    </div>
    `;
  const html2 = `
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
            <div class="card-body">${html} ${html1}</div>
        </div>
    </div>
    `;
  return html2;
};
const uiStockPDF = (response) => {
  const { Stock, GroupProduct, StockQty, StockBalance } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
  <div class="mb-3">
    <h2>Table Stock</h2>
    <h6>${indonesianDate}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute} :</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
  // 1.table persediaan
  let tbody = "";
  let no = 1;
  for (const rows of Stock) {
    const stockDate = rows.StockDate;
    const productName = rows.ProductName;
    const productPriceBuy = rows.ProductPriceBuy;
    const stockQty = rows.StockQty;
    const stockBalance = rows.StockBalance;
    tbody += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no++}</td>
      <td class="text-nowrap align-content-center">
        ${stockDate}
      </td>
      <td class="text-nowrap align-content-center">${productName}</td>
      <td class="text-nowrap align-content-center">
        ${formatCurrency1(productPriceBuy)}
      </td>
      <td class="text-nowrap align-content-center">
        ${formatQty(stockQty)}
      </td>
      <td class="text-nowrap align-content-center">
        ${formatCurrency2(stockBalance)}
      </td>
    </tr>
    `;
  }
  const div1 = `
  <div class="mb-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th>Date</th>
          <th>Product</th>
          <th>Price</th>
          <th class="text-center">Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="4" class="text-end me-2">Total</th>
          <th class="text-center">${formatQty(StockQty)}</th>
          <th>${formatCurrency1(StockBalance)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
  `;
  // 2. group product
  let tbody1 = "";
  let no1 = 1;
  for (const rows of GroupProduct) {
    const productName = rows.ProductName;
    const productPriceBuy = rows.ProductPriceBuy;
    const stockQty = rows.StockQty;
    const stockBalance = rows.StockBalance;
    tbody1 += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no1++}</td>
      <td class="text-nowrap align-content-center">${productName}</td>
      <td class="text-nowrap align-content-center">
        ${formatCurrency1(productPriceBuy)}
      </td>
      <td class="text-center text-nowrap align-content-center">
        ${formatQty(stockQty)}
      </td>
      <td class="text-nowrap align-content-center">
        ${formatCurrency2(stockBalance)}
      </td>
    </tr>
    `;
  }
  const div2 = `
  <div class="mb-3">
    <h4>Table Summary of Stock</h4>
    <table class="table table-striped w-auto">
      <thead>
        <tr>
          <th class="text-center">No</th>
          <th>Product</th>
          <th>Price</th>
          <th class="text-center">Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody1}
      </tbody>      
      <tfoot>
        <tr>
          <th colspan="3" class="text-end me-2">Total</th>
          <th class="text-center">${formatQty(StockQty)}</th>
          <th>${formatCurrency1(StockBalance)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
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
        ${div} 
        ${div1} 
        ${div2} 
      </div>
    </div>
  </div>          
  `;
  return html;
};
const uiSalePDF = (response) => {
  const { Sale, SalesGroup1, SaleQty, SaleBalance, ProductGroup } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
  <div class="mb-3">
    <h3>Table Sales</h3>
    <h6>${indonesianDate}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute}</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
  // 1. table sales
  let tbody = ``;
  let no = 1;
  for (const row of Sale) {
    const saleDate = row.SaleDate;
    const saleName = row.SaleName;
    const productName = row.ProductName;
    const productPriceSell = row.ProductPriceSell;
    const saleQty = row.SaleQty;
    const saleBalance = row.SaleBalance;
    tbody += `
    <tr>
      <td class="text-wrap align-content-center text-center">${no++}</td>
      <td class="text-wrap align-content-center text-capitalize">
        ${saleDate}
      </td>
      <td class="text-wrap align-content-center text-capitalize">
        ${saleName}
      </td>
      <td class="text-wrap align-content-center text-capitalize">
        ${productName}
      </td>
      <td class="text-wrap align-content-center text-capitalize">
        ${formatCurrency1(productPriceSell)}
      </td>
      <td class="text-wrap align-content-center text-center">
        ${formatQty(saleQty)}
      </td>
      <td class="text-wrap align-content-center">
        ${formatCurrency2(saleBalance)}
      </td>
    </tr>    
    `;
  }
  const div1 = `
  <div class="mb-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Date</th>
          <th>Sales</th>
          <th>Product</th>
          <th>Price</th>
          <th class="text-center">Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="5" class="text-end me-2">Total</th>
          <th class="text-center">${formatQty(SaleQty)}</th>
          <th>${formatCurrency1(SaleBalance)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
  `;
  // 2. table Salesname
  let div2 = ``;
  for (const el of SalesGroup1) {
    const salesName = el.SaleName;
    const saleQty = el.SaleQty;
    const saleBalance = el.SaleBalance;
    const saleRecap = el.SaleRecap;
    let no = 1;
    let tbody = ``;
    const existed = saleRecap.length >= 1;
    if (existed) {
      for (const el of saleRecap) {
        const saleDate = el.SaleDate;
        const productName = el.ProductName;
        const productPriceSell = el.ProductPriceSell;
        const saleQty = el.SaleQty;
        const saleBalance = el.SaleBalance;
        tbody += `
        <tr>
          <td class="text-wrap align-content-center text-center">${no++}</td>
          <td class="text-wrap align-content-center text-capitalize">
            ${saleDate}
          </td>
          <td class="text-wrap align-content-center text-capitalize">
            ${productName}
          </td>
          <td class="text-wrap align-content-center">
            ${formatCurrency1(productPriceSell)}
          </td>
          <td class="text-wrap align-content-center text-center">
            ${formatQty(saleQty)}
          </td>
          <td class="text-wrap align-content-center">
            ${formatCurrency2(saleBalance)}
          </td>
        </tr>    
      `;
      }
    } else {
      tbody += `
      <tr>
        <td class="text-wrap align-content-center text-center fst-italic" colspan="6">No Sales.....</td>
      </tr> 
      `;
    }
    div2 += `
    <div class="mb-3">
      <h4>Sales of ${salesName}</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Product</th>
            <th>Price</th>
            <th class="text-center">Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${tbody}
        </tbody>
        <tfoot>
          <tr>
            <th class="text-end me-2" colspan="4">Total</th>
            <th class="text-center">${formatQty(saleQty)}</th>
            <th>${formatCurrency1(saleBalance)}</th>
          </tr>
        </tfoot>
      </table>
    </div> 
    `;
  }
  // 3. productGroup
  let tbody2 = "";
  let no2 = 1;
  for (const rows of ProductGroup) {
    const productName = rows.ProductName;
    const productPriceSell = rows.ProductPriceSell;
    const saleQty = rows.SaleQty;
    const saleBalance = rows.SaleBalance;
    tbody2 += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no2++}</td>
      <td class="text-nowrap align-content-center">${productName}</td>
      <td class="text-nowrap align-content-center">
        ${formatCurrency1(productPriceSell)}
      </td>
      <td class="text-center text-nowrap align-content-center">
        ${formatQty(saleQty)}
      </td>
      <td class="text-nowrap align-content-center">
        ${formatCurrency2(saleBalance)}
      </td>
    </tr>
    `;
  }
  const div3 = `
  <div class="mb-3">
    <h4>Summary Of Product</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th>Product</th>
          <th>Price</th>
          <th class="text-center">Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody2}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3" class="text-end me-2">Total</th>
          <th class="text-center">${formatQty(SaleQty)}</th>
          <th>${formatCurrency1(SaleBalance)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
  `;
  const html = `          
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec">
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        ${div}
        ${div1}
        ${div2}
        ${div3}
      </div>
    </div>
  </div>`;
  console.log("2");
  return html;
};
const uiAccountingPDF = (response) => {
  const { AccountingDate, TotalCash } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
  <div>
    <h3>Table Cash</h3>
    <h6>${indonesianDate}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute}</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatCurrency2(rows.AccountingBalance);
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
  const table = `
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
        <th colspan="1">${formatCurrency2(TotalCash)}</th>
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
          ${div}
        </div>
        <div class="mb-3">
          ${table}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
const uiAccountingPDF1 = (response) => {
  const { AccountingDate, TotalReceivable, ReceivableList, Company } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
  <div>
    <h3>Table Receivable</h3>
    <h6>${indonesianDate}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute}</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatCurrency2(rows.AccountingBalance);
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
  const table = `
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
        <th colspan="1">${formatCurrency2(TotalReceivable)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  // tableSecond
  let tBody1 = ``;
  let no1 = 1;
  ReceivableList.forEach((rows) => {
    const userFullName = rows.UserFullname;
    const accountingBalance = formatCurrency1(rows.TotalReceivable);
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
  const table1 = `
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
        <th colspan="1">${formatCurrency1(TotalReceivable)}</th>
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
        ${Company || "Josstack Company"}
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          ${table}
        </div>
        <div class="mb-3">
          <p class="fs-5 mb-2">Summary Receivable</p>
          ${table1}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
const uiAccountingPDF2 = (response) => {
  const { AccountingDate, TotalAsset, Company } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
    <div class="mb-3">
      <h3>Table Assets</h3>
      <h6>${indonesianDate}</h6>
      <div class="d-flex gap-1">
        <h6>${indonesiaHour} :</h6>
        <h6>${indonesiaMinute}</h6>
        <h6>${indonesiaSecond}</h6>
      </div>
    </div>
    `;
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatCurrency2(rows.AccountingBalance);
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
  const table = `
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
        <th colspan="1">${formatCurrency2(TotalAsset)}</th>
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
        ${Company || "JossStack"}
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          ${table}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
const uiAccountingPDF3 = (response) => {
  const { AccountingDate, TotalLiability, LiabilityList, Company } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
    <div class="mb-3">
      <h3>Table Liability</h3>
      <h6>${indonesianDate}</h6>
      <div class="d-flex gap-1">
        <h6>${indonesiaHour} :</h6>
        <h6>${indonesiaMinute}</h6>
        <h6>${indonesiaSecond}</h6>
      </div>
    </div>
    `;
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatCurrency2(rows.AccountingBalance);
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
  const table = `
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
        <th colspan="1">${formatCurrency2(TotalLiability)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  // tableSecond
  let tBody1 = ``;
  let no1 = 1;
  LiabilityList.forEach((rows) => {
    const userFullName = rows.UserFullname;
    const accountingBalance = formatCurrency1(rows.TotalLiability);
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
  const table1 = `
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
        <th colspan="1">${formatCurrency1(TotalLiability)}</th>
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
        ${Company || "JossStack Company"}
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          ${table}
        </div>
        <div class="mb-3">
          <p class="fs-5 mb-2">Summary Liability</p>
          ${table1}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
const uiAccountingPDF4 = (response) => {
  const { AccountingDate, TotalEquity, EquityList, Company } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
    <div class="mb-3">
      <h3>Table Equity</h3>
      <h6>${indonesianDate}</h6>
      <div class="d-flex gap-1">
        <h6>${indonesiaHour} :</h6>
        <h6>${indonesiaMinute}</h6>
        <h6>${indonesiaSecond}</h6>
      </div>
    </div>
    `;
  // tableFirst
  let tBody = ``;
  let no = 1;
  AccountingDate.forEach((rows) => {
    const accountingDate = rows.AccountingDate;
    const accountingName = rows.AccountingName;
    const accountingBalance = formatCurrency2(rows.AccountingBalance);
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
  const table = `
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
        <th colspan="1">${formatCurrency2(TotalEquity)}</th>
      </tr>
    </tfoot>
  </table>
  `;
  // tableSecond
  let tBody1 = ``;
  let no1 = 1;
  EquityList.forEach((rows) => {
    const userFullname = rows.UserFullname;
    const totalEquity = formatCurrency1(rows.TotalEquity);
    const totalPercent = rows.TotalPercent;
    tBody1 += `
    <tr>
      <td class="text-center align-content-center">${no1++}</td>
      <td class="align-content-center pe-2 text-capitalize">${userFullname}</td>
      <td class="align-content-center pe-2">${totalEquity}</td>
      <td class="align-content-center pe-2">${totalPercent}</td>
    </tr>
    `;
  });
  const table1 = `
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
        <th colspan="2">${formatCurrency1(TotalEquity)}</th>
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
        ${Company || "JossStack"}
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          ${table}
        </div>
        <div class="mb-3">
          ${table1}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
const uiAccountingPDF5 = (response) => {
  const {
    AccountingDate,
    TotalSales,
    TotalSalesReturn,
    TotalSalesDiscount,
    Company,
  } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
    <div class="mb-3">
      <h3>Table Sales</h3>
      <h6>${indonesianDate}</h6>
      <div class="d-flex gap-1">
        <h6>${indonesiaHour} :</h6>
        <h6>${indonesiaMinute}</h6>
        <h6>${indonesiaSecond}</h6>
      </div>
    </div>
    `;
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
          ${formatCurrency2(accountingBalance2)}
      </td>
    </tr>
    `;
  });
  const table = `
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
        <th colspan="1">${formatCurrency1(
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
        ${Company || "JossStack Company"}
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          ${table}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
const uiAccountingPDF6 = (response) => {
  const {
    AccountingDate,
    TotalPurchase,
    TotalPurchaseReturn,
    TotalPurchaseDiscount,
    Company,
  } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
  <div class="mb-3">
    <h3>Table Purchase</h3>
    <h6>${indonesianDate}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute}</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
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
          ${formatCurrency2(accountingBalance2)}
      </td>
    </tr>
    `;
  });
  const table = `
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
        <th colspan="1">${formatCurrency1(
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
        ${Company || "JossStack"}
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          ${table}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
const uiAccountingPDF7 = (response) => {
  const { AccountingDate, TotalExpense, Company } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
  <div class="mb-3">
    <h3>Table Expense</h3>
    <h6>${indonesianDate}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute}</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
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
          ${formatCurrency1(accountingBalance)}
      </td>
    </tr>
    `;
  });
  const table = `
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
        <th colspan="1">${formatCurrency1(TotalExpense)}</th>
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
        ${Company || "JossStack Company"}
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          ${table}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
const uiAccountingPDF8 = (response) => {
  const { AccountingDate, TotalRevenue, Company } = response;
  const { indonesianDate, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    formatTime();
  const div = `
  <div class="mb-3">
    <h3>Table Revenue</h3>
    <h6>${indonesianDate}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute}</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
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
          ${formatCurrency1(accountingBalance)}
      </td>
    </tr>
    `;
  });
  const table = `
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
        <th colspan="1">${formatCurrency1(TotalRevenue)}</th>
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
        ${Company || "JossStack Company"}
      </div>
      <!--  cardBody -->
      <div class="card-body">
        <div class="mb-3">
          ${div}
        </div>
        <div class="mb-3">
          ${table}
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
};
export {
  uiAccountingPDF,
  uiAccountingPDF1,
  uiAccountingPDF2,
  uiAccountingPDF3,
  uiAccountingPDF4,
  uiAccountingPDF5,
  uiAccountingPDF6,
  uiAccountingPDF7,
  uiAccountingPDF8,
  uiProductPdf,
  uiStockPDF,
  uiSalePDF,
};
