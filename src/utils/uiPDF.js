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
const uiStockPDF = (response, Company) => {
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
        ${Company || "Your company"}
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
const uiSalePDF = (response, Company) => {
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
        ${Company || "Your Company"}
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
const uiAccountingPDF = (response, Company) => {
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
        ${Company || "Your Company"}
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
const uiAccountingPDF1 = (response, Company) => {
  const { AccountingDate, TotalReceivable, ReceivableList } = response;
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
        ${Company || "Company"}
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
const uiAccountingPDF2 = (response, Company) => {
  const { AccountingDate, TotalAsset } = response;
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
const uiAccountingPDF3 = (response, Company) => {
  const { AccountingDate, TotalLiability, LiabilityList } = response;
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
const uiAccountingPDF4 = (response, Company) => {
  const { AccountingDate, TotalEquity, EquityList } = response;
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
const uiAccountingPDF5 = (response, Company) => {
  const { AccountingDate, TotalSales, TotalSalesReturn, TotalSalesDiscount } =
    response;
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
const uiAccountingPDF6 = (response, Company) => {
  const {
    AccountingDate,
    TotalPurchase,
    TotalPurchaseReturn,
    TotalPurchaseDiscount,
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
const uiAccountingPDF7 = (response, Company) => {
  const { AccountingDate, TotalExpense } = response;
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
const uiAccountingPDF8 = (response, Company) => {
  const { AccountingDate, TotalRevenue } = response;
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
const uiFinancialStatement = (response, Company, Period) => {
  const { FinancialPosition, ChangesInEquity, ProfitOrLoss } = response;
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
  const { Liabilities, TotalLiabilityEquityChanges } = LiabilityEquity;
  const { Liability, TotalLiability } = Liabilities;
  // equity
  const {
    Equity,
    TotalEquity1,
    EquityWithDrawl,
    TotalEquityWithDrawl,
    TotalEquityChanges,
  } = ChangesInEquity;
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
  const financialPosition = `
    <!-- financial Position -->
    <div class="mb-3">
      <!-- head -->
      <div class="mb-3">
        <h4 class="fw-bold text-center">Statement Of Financial Position</h4>
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
              <h5>${formatCurrency1(TotalCash)}</h5>
            </div>
            <!-- Receivable -->
            <div class="ms-3 d-flex justify-content-between">
              <h5 class="ms-2">Receivable</h5>
              <h5>${formatCurrency1(TotalReceivable)}</h5>
            </div>
            <!-- Merchandise inventory -->
            <div class="ms-3 d-flex justify-content-between">
              <h5 class="ms-2">Merchandise inventory</h5>
              <h5>${formatCurrency1(MerchandiseInventory)}</h5>
            </div>
            <!-- Others Current Asset -->
            ${
              CurrentAsset.length > 0
                ? CurrentAsset.map(
                    (el) => `
            <div class="d-flex justify-content-between">
              <h5 class="ms-2">${el.AccountingName}</h5>
              <h5>${formatCurrency1(el.AccountingBalance)}</h5>
            </div>
            `
                  ).join("")
                : ""
            }
            <!-- total current assets-->
            ${`
            <div class="d-flex justify-content-between">
              <h5 class="ms-2 fw-bold">Total Current Asset</h5>
              <h5>${formatCurrency1(TotalCurrentAssetChanges)}</h5>
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
              <h5>${formatCurrency1(el.Total)}</h5>
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
              <h5>${formatCurrency1(el.Total)}</h5>
            </div>
            `
                  ).join("")
                : ""
            }
            <!-- Total Fixed Asset -->
            <div class="ms-2 mb-2 d-flex justify-content-between">
              <h5 class="fw-bold">Total Fixed Assets</h5>
              <h5 class="fw-bold">${formatCurrency1(TotalFixedAsset)}</h5>
            </div>
          </div>
          <!-- footer -->
          <div class="ms-2 mb-2 d-flex justify-content-between">
            <h5 class="fw-bold">Total Assets</h5>
            <h5 class="fw-bold">${formatCurrency1(TotalAssetsChanges)}</h5>
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
              <h5 class="ms-4">${el.AccountingName.split(" - ")
                .slice(1)
                .join(" - ")}</h5>
              <h5>${formatCurrency1(el.TotalLiability)}</h5>
            </div>
            `
                  ).join("")
                : ""
            }
            <!-- total liability -->
            <div class="d-flex justify-content-between">
              <h5 class="ms-2 fw-bold">Total Liability</h5>
              <h5>${formatCurrency1(TotalLiability)}</h5>
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
              <h5 class="ms-4">${el.AccountingName.split(" - ")
                .slice(1)
                .join(" - ")}</h5>
              <h5>${formatCurrency1(el.TotalEquity)}</h5>
            </div>
            `
                  ).join("")
                : ""
            }
            <!-- total equity -->
            <div class="d-flex justify-content-between">
              <h5 class="ms-2 fw-bold">Total Equity</h5>
              <h5>${formatCurrency1(TotalEquity1)}</h5>
            </div>
          </div>
          <!-- total liability & changes  -->
          <div class="ms-2 mb-2 d-flex justify-content-between">
            <h5 class="fw-bold">Total Liability & Equity</h5>
            <h5 class="fw-bold">
              ${formatCurrency1(TotalLiabilityEquityChanges)}
            </h5>
          </div>
        </div>
      </div>
    </div> 
  `;
  const equityChange = `
  <!-- equity changes -->
  <div class="mb-3">
    <!-- head -->
    <div class="mb-3">
      <h4 class="text-center fw-bold">Statement of Equity in Changes</h4>
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
            <h5 class="ms-2">${el.AccountingName.split(" - ")
              .slice(1)
              .join(" - ")}</h5>
            <h5>${formatCurrency1(el.TotalEquity)}</h5>
          </div>
          `
              ).join("")
            : ""
        }
        <!-- Total Equity -->
        <div class="d-flex justify-content-between">
          <h5 class="fw-bold">Total Equity</h5>
          <h5 class="fw-bold">${formatCurrency1(TotalEquity1)}</h5>
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
            <h5 class="ms-2">${el.AccountingName.split(" - ")
              .slice(1)
              .join(" - ")}</h5>
            <h5>${formatCurrency1(el.TotalEquityWithDrawl)}</h5>
          </div>
          `
              ).join("")
            : ""
        }
        <div class="d-flex justify-content-between">
          <h5 class="fw-bold">Total Withdrawl</h5>
          <h5 class="fw-bold">${formatCurrency1(TotalEquityWithDrawl)}</h5>
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
          ${formatCurrency1(NetProfitOrLoss)}
        </span>
      </div>
      <!-- total changes -->
      <div class="mb-2 d-flex justify-content-between">
        <h5 class="fw-bold">Total Changes In Equity</h5>
        <h5 class="fw-bold">${formatCurrency1(TotalEquityChanges)}</h5>
      </div>
    </div>
  </div>  
  `;
  const profitOrLoss = `
  <!-- profit or loss -->
  <div class="mb-3">
    <!-- head -->
    <div class="mb-3 text-center">
      <h4 class="fw-bold">Statement Of Profit or Loss</h4>
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
        <h5>${formatCurrency1(TotalSales)}</h5>
      </div>
      <!-- sales return -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Sales Return</h5>
        <h5>${formatCurrency1(TotalSalesReturn)}</h5>
      </div>
      <!-- sales discount -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Sales Discount</h5>
        <h5>${formatCurrency1(TotalSalesDiscount)}</h5>
      </div>
      <!-- total net of sale -->
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Net Of Sales</h5>
        <h5>+ ${formatCurrency1(TotalSalesNet)}</h5>
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
        <h5>${formatCurrency1(TotalPurchase)}</h5>
      </div>
      <!-- purchase return -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Purhcase Return</h5>
        <h5>${formatCurrency1(TotalPurchaseReturn * -1)}</h5>
      </div>
      <!-- purchase discount -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Purhcase Discount</h5>
        <h5>${formatCurrency1(TotalPurchaseDiscount * -1)}</h5>
      </div>
      <!-- purchase net -->
      <div class="mb-2 d-flex justify-content-between">
        <h5 class="fw-bold">Net of Purchase</h5>
        <h5 class="fw-bold">${formatCurrency1(TotalPurchaseNet)}</h5>
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
        <h5 class="fw-bold">${formatCurrency1(TotalPurchaseNet)}</h5>
      </div>
      <!-- remain of stock -->
      <div class="ms-2 d-flex justify-content-between">
        <h5>Remain of Stock</h5>
        <h5>${formatCurrency1(MerchandiseInventory)}</h5>
      </div>
      <!-- footer -->
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Total Cost of Goods Sold</h5>
        <h5 class="fw-bold">- ${formatCurrency1(COGS)}</h5>
      </div>
    </div>
    <!-- gross of profit  -->
    <div class="ms-2 mb-2">
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Gross Of Profit</h5>
        <h5 class="fw-bold">${formatCurrency1(GrossProfitOrLoss)}</h5>
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
          <h5>${formatCurrency1(el.Total)}</h5>
        </div>
        `
            ).join("")
          : ""
      }
      <!-- footer -->
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Total of Expense</h5>
        <h5 class="fw-bold">- ${formatCurrency1(TotalExpense)}</h5>
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
          <h5>${formatCurrency1(el.Total)}</h5>
        </div>
        `
            ).join("")
          : ""
      }
      <!-- footer -->
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Total of Other Revenue</h5>
        <h5 class="fw-bold">+ ${formatCurrency1(TotalRevenue)}</h5>
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
          ${formatCurrency1(NetProfitOrLoss)}
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
          <h5>${formatCurrency1(el.ProfitAttributed)}</h5>
        </div>
        `
            ).join("")
          : ""
      }
    </div>
  </div>  
  `;
  const div = `
  <div>
    <div class="mb-0">
      <h3 class="fw-bold text-center">${Company || "Company"}</h3>
      <h5 class="fw-bold text-center mb-0">${Period}</h5>
    </div>;
    ${financialPosition}
    ${equityChange}
    ${profitOrLoss}
  </div>
  `;
  return div;
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
  uiFinancialStatement,
  uiProductPdf,
  uiStockPDF,
  uiSalePDF,
};
