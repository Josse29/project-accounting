import {
  getByGroupCustomer,
  getByGroupProduct,
  getReport,
} from "./services.js";
import { uiFailed1, uiPDF, uiSuccess } from "./ui.js";
import { getSalesGroup, getTotal } from "./utils.js";

const tableGroupProduct = async (req) => {
  const { status, response } = await getByGroupProduct(req);
  if (status) {
    let no = 1;
    let tbody = ``;
    response.forEach((el) => {
      tbody += `<tr>
                  <td>${no++}</td>
                  <td>${el.ProductName}</td>
                  <td>${formatRupiah2(el.ProductPriceJual)}</td>
                  <td>${el.Sales_Qty}</td>
                  <td>${formatRupiah2(el.Sales_Total)}</td>
                </tr>`;
    });
    const table = `<table class="table table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${tbody}
                    </tbody>
                  </table>`;
    return table;
  }
  if (!status) {
    console.error(response);
  }
};
const tableGroupCustomer = async (req) => {
  const { status, response } = await getByGroupCustomer(req);
  if (status) {
    let tbody = ``;
    let no = 1;
    response.forEach((el) => {
      tbody += `<tr>
                  <td>${no++}</td>
                  <td>${el.UserFullname}</td>
                  <td>${formatRupiah2(el.Sales_Total)}</td>
                </tr>`;
    });
    const ui = `<table class="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Customer</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tbody}
                  </tbody>
                </table>`;
    return ui;
  }
  if (!status) {
    console.error(response);
  }
};

// action
$("#modal-sales-convert-pdf button#sale-convert-pdf")
  .off("click")
  .on("click", async function () {
    // 1. get request
    const startDateVal = $("input#sale-start-date-1").val();
    const endDateVal = $("input#sale-end-date-1").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    const { status, response } = await getReport(req);
    if (status) {
      const existed = response.length >= 1;
      console.log(existed);
      if (existed) {
        const getTotal1 = await getTotal(req);
        const salesGroup = await getSalesGroup(req);
        // const tbody2 = await tableGroupProduct(req);
        // const tbody3 = await tableGroupCustomer(req);
        const htmlContent = uiPDF(response, getTotal1, salesGroup);
        console.log(htmlContent);
        return false;
        const filePath = await window.electronAPI.savePDF(htmlContent);
        if (filePath) {
          uiSuccess(`File PDF saved on ${filePath}`);
          $("input#sale-start-date-1").val("");
          $("input#sale-end-date-1").val("");
          $("#modal-sales-convert-pdf").modal("hide");
        }
      }
      if (!existed) {
        uiFailed1(`upsssss it's stil empty....`);
      }
    }
    if (!status) {
      uiFailed1(response);
      console.error(response);
    }
  });
