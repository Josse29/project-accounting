import {
  getPersediaanCategoryIdGroup,
  getPersediaanCategorySum,
  getPersediaanProductGroup,
  getPersediaanProductReport,
  getPersediaanQty,
  getPersediaanRpSum,
  getPersediaanSupplierGroup,
  getPersediaanSupplierSum,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  uiTrCategorySum,
  uiTrPDF,
  uiTrProductSum,
  uiTrSupplierSum,
} from "./ui.js";

// export pdf persediaan
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
          const existedSupplier = response.length >= 1;
          let tbody = ``;
          let no = 1;
          if (existedSupplier) {
            response.forEach((el) => {
              tbody += uiTrSupplierSum(el, no);
              no++;
            });
          }
          if (!existedSupplier) {
            tbody += `<tr>
                        <td class="text-center text-nowrap align-content-center" colspan="3">supplier empty....</td>
                     </tr>`;
          }
          resolve(tbody);
        }
        if (!status) {
          reject(response);
        }
      });
    });
  };
  const getPersediaanSupplierSumAsync = () => {
    return new Promise((resolve, reject) => {
      getPersediaanSupplierSum((status, response) => {
        if (status) {
          const totalRp = formatRupiah2(response);
          resolve(totalRp);
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
          const existedCategory = response.length >= 1;
          let no = 1;
          let tbody = ``;
          if (existedCategory) {
            response.forEach((el) => {
              tbody += uiTrCategorySum(el, no);
              no++;
            });
          }
          if (!existedCategory) {
            tbody += `<tr>
                        <td class="text-center text-nowrap align-content-center" colspan="3">category empty....</td>
                      </tr>`;
          }
          resolve(tbody);
        }
        if (!status) {
          reject(response);
        }
      });
    });
  };
  const getPersediaanCategorySumAsync = () => {
    return new Promise((resolve, reject) => {
      getPersediaanCategorySum((status, response) => {
        if (status) {
          const totalRp = formatRupiah2(response);
          resolve(totalRp);
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
        const tbodySupplierGroup = await getPersediaanSupplierGroupAsync();
        const txtSumSupplier = await getPersediaanSupplierSumAsync();
        const tbodyCategoryGroup = await getPersediaanCategoryIdGroupAsync();
        const txtSumCategory = await getPersediaanCategorySumAsync();
        const txtPersediaanQtySum = await getPersediaanQtySumAsync();
        const txtPersediaanRpSum = await getPersediaanRpSumAsync();
        ipcRenderer.send(
          "pdf:persediaan",
          tbodyProduct,
          tbodyCategoryGroup,
          txtSumCategory,
          tbodyProductGroup,
          tbodySupplierGroup,
          txtSumSupplier,
          txtPersediaanQtySum,
          txtPersediaanRpSum,
          file_path
        );
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  });
});
