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
  uiAlertSuccess,
  uiTrCategorySum,
  uiTrPDF,
  uiTrProductSum,
  uiTrSupplierSum,
} from "./ui.js";

// export pdf persediaan
// product
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
// supplier
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
// category
const getPersediaanCategoryIdGroupAsync = async () => {
  try {
    const response = await getPersediaanCategoryIdGroup();
    const existedCategory = response.length >= 1;
    let tbody = ``;
    if (existedCategory) {
      let no = 1;
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
// sum-qty
const getPersediaanQtySumAsync = async () => {
  try {
    const response = await getPersediaanQty("");
    return response;
  } catch (error) {
    console.error(error);
  }
};
// sum-rp
const getPersediaanRpSumAsync = async () => {
  try {
    const response = await getPersediaanRpSum();
    const rupiah = formatRupiah2(response);
    return rupiah;
  } catch (error) {
    console.error(error);
  }
};
// actions
$("#persediaan-export-pdf")
  .off("click")
  .on("click", async () => {
    try {
      const response = await getPersediaanProductReport();
      const existed = response.length >= 1;
      if (existed) {
        let no = 1;
        let tbodyProduct = ``;
        response.forEach((rows) => {
          tbodyProduct += uiTrPDF(rows, no);
          no++;
        });
        const tbodyProductGroup = await getPersediaanProductGroupAsync();
        const tbodySupplierGroup = await getPersediaanSupplierGroupAsync();
        const txtSumSupplier = await getPersediaanSupplierSumAsync();
        const tbodyCategoryGroup = await getPersediaanCategoryIdGroupAsync();
        const txtSumCategory = await getPersediaanCategorySumAsync();
        const txtPersediaanQtySum = await getPersediaanQtySumAsync();
        const txtPersediaanRpSum = await getPersediaanRpSumAsync();
        let file_path = dialog.showSaveDialogSync({
          title: "Export Data",
          filters: [{ name: "pdf", extensions: ["pdf"] }],
        });
        if (file_path) {
          file_path = file_path.replace(/\\/g, "/");
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
          ipcRenderer.on("success:pdf-persediaan", (e, file_path) => {
            uiAlertSuccess(`File Save On ${file_path}`);
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
