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
  const getPersediaanProductReportAsync = async () => {
    try {
      const response = await getPersediaanProductReport();
      let no = 1;
      let tbodyProduct = ``;
      response.forEach((rows) => {
        tbodyProduct += uiTrPDF(rows, no);
        no++;
      });
      return tbodyProduct;
    } catch (error) {
      console.error(error);
    }
  };
  const getPersediaanProductGroupAsync = async () => {
    try {
      const response = await getPersediaanProductGroup();
      let no = 1;
      let tbodyProductSum = ``;
      response.forEach((element) => {
        tbodyProductSum += uiTrProductSum(element, no);
        no++;
      });
      return tbodyProductSum;
    } catch (error) {
      console.error(error);
    }
  };
  const getPersediaanSupplierGroupAsync = async () => {
    try {
      const response = await getPersediaanSupplierGroup();
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
      return tbody;
    } catch (error) {
      console.error(error);
    }
  };
  const getPersediaanSupplierSumAsync = async () => {
    try {
      const response = await getPersediaanSupplierSum();
      const totalRp = formatRupiah2(response);
      return totalRp;
    } catch (error) {
      console.error(error);
    }
  };
  const getPersediaanCategoryIdGroupAsync = async () => {
    try {
      const response = await getPersediaanCategoryIdGroup();
      const existedCategory = response.length >= 1;
      if (existedCategory) {
        let no = 1;
        let tbody = ``;
        if (existedCategory) {
          response.forEach((el) => {
            tbody += uiTrCategorySum(el, no);
            no++;
          });
        }
      }
      if (!existedCategory) {
        tbody += `<tr>
                    <td class="text-center text-nowrap align-content-center" colspan="3">category empty....</td>
                  </tr>`;
      }
      return tbody;
    } catch (error) {
      console.error(error);
    }
  };
  const getPersediaanCategorySumAsync = async () => {
    try {
      const response = await getPersediaanCategorySum();
      const totalRp = formatRupiah2(response);
      return totalRp;
    } catch (error) {
      console.error(error);
    }
  };
  const getPersediaanQtySumAsync = async () => {
    try {
      const response = await getPersediaanQty("");
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const getPersediaanRpSumAsync = async () => {
    try {
      const response = await getPersediaanRpSum();
      const rupiah = formatRupiah2(response);
      return rupiah;
    } catch (error) {
      console.error(error);
    }
  };

  $("#persediaan-export-pdf")
    .off("click")
    .on("click", async () => {
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
