import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  getByGroupCustomer,
  getByGroupProduct,
  getByGroupSale,
  getReport,
  getSummary,
} from "./services.js";
import { uiSuccess } from "./ui.js";
const tableGroupSales = async (req) => {
  const { status, response } = await getByGroupSale(req);
  if (status) {
    let no = 1;
    let tbody = ``;
    response.forEach((el) => {
      tbody += `<tr>
                  <td>${no++}</td>
                  <td>${el.UserFullname}</td>
                  <td>${formatRupiah2(el.Sales_Total)}</td>
                </tr>`;
    });
    const table = `<table class="table table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Sales</th>
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
const txtSummary = async (req) => {
  const { status, response } = await getSummary(req);
  if (status) {
    const { totalQty, totalRp } = response;
    return {
      totalQty,
      totalRp: formatRupiah2(totalRp),
    };
  }
  if (!status) {
    console.error(response);
  }
};
// action
$("#modal-sales-convert-pdf button#sale-convert-pdf")
  .off("click")
  .on("click", async function () {
    const startDateVal = $("input#sale-start-date-1").val();
    const endDateVal = $("input#sale-end-date-1").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    if (
      startDateVal > endDateVal ||
      (startDateVal !== "" && endDateVal === "") ||
      (startDateVal === "" && endDateVal !== "")
    ) {
      return false;
    }
    const { status, response } = await getReport(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        let file_path = dialog.showSaveDialogSync({
          title: "Export Data",
          filters: [{ name: "pdf", extensions: ["pdf"] }],
        });
        if (file_path) {
          let tbody = ``;
          let no = 1;
          response.forEach((row) => {
            tbody += `<tr>
                        <td class="text-wrap align-content-center text-capitalize">${no++}</td>
                        <td class="text-wrap align-content-center text-capitalize">${
                          row.SalesPersonName
                        }</td>
                        <td class="text-wrap align-content-center text-capitalize">${
                          row.ProductName
                        }</td>
                        <td class="text-wrap align-content-center">${formatRupiah2(
                          row.PriceSell
                        )}</td>
                        <td class="text-wrap align-content-center">${
                          row.Qty
                        }</td>
                        <td class="text-wrap align-content-center">${formatRupiah2(
                          row.Total
                        )}</td>
                    </tr>`;
          });
          const tbody1 = await tableGroupSales(req);
          const tbody2 = await tableGroupProduct(req);
          const tbody3 = await tableGroupCustomer(req);
          const summary = await txtSummary(req);
          ipcRenderer.send(
            "pdf:sales",
            tbody,
            tbody1,
            tbody2,
            tbody3,
            summary,
            file_path
          );
          ipcRenderer.on("success:pdf-sales", (e, file_path) => {
            uiSuccess(file_path);
            $("input#sale-start-date").val("");
            $("input#sale-end-date").val("");
            $("#modal-sales-convert-pdf").modal("hide");
          });
        }
      }
    }
    if (!status) {
      console.error(response);
    }
  });
