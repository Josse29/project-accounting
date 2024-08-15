import {
  getPersediaanCategoryIdGroup,
  getPersediaanProductGroup,
  getPersediaanProductReport,
  getPersediaanQty,
  getPersediaanRpSum,
  getPersediaanSupplierGroup,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  uiTrCategorySum,
  uiTrPDF,
  uiTrProductSum,
  uiTrSupplierSum,
} from "./ui.js";
$(document).ready(function () {
  const getPersediaanProductReportAsync = () => {
    return new Promise((resolve, reject) => {
      getPersediaanProductReport((status, response) => {
        if (status) {
          let no = 1;
          let tbodyProduct = ``;
          response.forEach((rows) => {
            tbodyProduct += uiTrPDF(rows, no);
            no++;
          });
          resolve(tbodyProduct);
        } else {
          reject(response);
        }
      });
    });
  };
  const getPersediaanProductGroupAsync = () => {
    return new Promise((resolve, reject) => {
      getPersediaanProductGroup((status, response) => {
        if (status) {
          let no = 1;
          let tbodyProductSum = ``;
          response.forEach((element) => {
            tbodyProductSum += uiTrProductSum(element, no);
            no++;
          });
          resolve(tbodyProductSum);
        }
        if (!status) {
          reject(response);
        }
      });
    });
  };
  const getPersediaanSupplierGroupAsync = () => {
    return new Promise((resolve, reject) => {
      getPersediaanSupplierGroup((status, response) => {
        if (status) {
          let tbody = ``;
          let no = 1;
          response.forEach((el) => {
            tbody += uiTrSupplierSum(el, no);
            no++;
          });

          resolve(tbody);
        }
        if (!status) {
          reject(response);
        }
      });
    });
  };
  const getPersediaanCategoryIdGroupAsync = () => {
    return new Promise((resolve, reject) => {
      getPersediaanCategoryIdGroup((status, response) => {
        if (status) {
          let no = 1;
          let tbody = ``;
          response.forEach((el) => {
            tbody += uiTrCategorySum(el, no);
            no++;
          });
          resolve(tbody);
        }
        if (!status) {
          reject(response);
        }
      });
    });
  };
  const getPersediaanQtySumAsync = () => {
    return new Promise((resolve, reject) => {
      getPersediaanQty("", (status, response) => {
        if (status) {
          const totalQty = response;
          resolve(totalQty);
        }
        if (!status) {
          reject(response);
        }
      });
    });
  };
  const getPersediaanRpSumAsync = () => {
    return new Promise((resolve, reject) => {
      getPersediaanRpSum((status, response) => {
        if (status) {
          const rupiah = formatRupiah2(response);
          resolve(rupiah);
        }
        if (!status) {
          reject(response);
        }
      });
    });
  };
  $("#persediaan-export-print").on("click", async () => {
    try {
      const tbodyProduct = await getPersediaanProductReportAsync();
      const tbodyProductGroup = await getPersediaanProductGroupAsync();
      const tbodySupplierGroup = await getPersediaanSupplierGroupAsync();
      const tbodyCategoryGroup = await getPersediaanCategoryIdGroupAsync();
      const txtPersediaanQtySum = await getPersediaanQtySumAsync();
      const txtPersediaanRpSum = await getPersediaanRpSumAsync();
      ipcRenderer.send(
        "print:persediaan",
        tbodyProduct,
        tbodyCategoryGroup,
        tbodyProductGroup,
        tbodySupplierGroup,
        txtPersediaanQtySum,
        txtPersediaanRpSum
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  });
});
