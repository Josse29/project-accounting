import {
  getPersediaanProductGroup,
  getPersediaanProductReport,
  getPersediaanQty,
  getPersediaanRpSum,
  getPersediaanSupplierGroup,
  getPersediaanSupplierReport,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  uiTrPDF,
  uiTrProductSum,
  uiTrSupplier,
  uiTrSupplierSum,
} from "./ui.js";
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
const getPersediaanSupplierReportAsync = () => {
  return new Promise((resolve, reject) => {
    getPersediaanSupplierReport((status, response) => {
      if (status) {
        let tbody = ``;
        let no = 1;
        response.forEach((el) => {
          tbody += uiTrSupplier(el, no);
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
// export pdf product
$("#persediaan-export-pdf").on("click", async () => {
  let file_path = dialog.showSaveDialogSync({
    title: "Export Data",
    filters: [{ name: "pdf", extensions: ["pdf"] }],
  });
  if (file_path) {
    file_path = file_path.replace(/\\/g, "/");
    try {
      const tbodyProduct = await getPersediaanProductReportAsync();
      const tbodyProductGroup = await getPersediaanProductGroupAsync();
      const tbodySupplier = await getPersediaanSupplierReportAsync();
      const tbodySupplierGroup = await getPersediaanSupplierGroupAsync();
      const txtPersediaanQtySum = await getPersediaanQtySumAsync();
      const txtPersediaanRpSum = await getPersediaanRpSumAsync();
      ipcRenderer.send(
        "pdf:persediaan",
        tbodyProduct,
        tbodyProductGroup,
        tbodySupplier,
        tbodySupplierGroup,
        txtPersediaanQtySum,
        txtPersediaanRpSum,
        file_path
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
});
