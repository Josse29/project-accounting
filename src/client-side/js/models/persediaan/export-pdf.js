import { formatRupiah2 } from "../../utils/formatPrice.js";
import {
  getByGroupCategory,
  getByGroupProduct1,
  getByGroupSupplier,
  getPDF,
  getSumPriceCategory,
  getSumPriceSupplier,
} from "./services.js";
import {
  uiAlertFail,
  uiAlertFail1,
  uiAlertSuccess,
  uiTrCategorySum,
  uiTrPDF,
  uiTrSupplierSum,
} from "./ui.js";
import { groupProduct, sumPrice } from "./utils.js";

// supplier
const groupSupplier = async (req) => {
  const { status, response } = await getByGroupSupplier(req);
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
    return tbody;
  }
  if (!status) {
    console.error(response);
  }
};
const sumSupplier = async (req) => {
  const { status, response } = await getSumPriceSupplier(req);
  if (status) {
    const totalRp = formatRupiah2(response);
    return totalRp;
  }
  if (!status) {
    console.error(response);
  }
};
// category
const groupCategory = async (req) => {
  const { status, response } = await getByGroupCategory(req);
  if (status) {
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
  }
  if (!status) {
    console.error(response);
  }
};
const sumCategory = async (req) => {
  const { status, response } = await getSumPriceCategory(req);
  if (status) {
    const totalRp = formatRupiah2(response);
    return totalRp;
  }
  if (!status) {
    console.error(response);
  }
};
// actions
$("#persediaan-modal-convert-pdf #persediaan-convert-pdf")
  .off("click")
  .on("click", async () => {
    const startDateVal = $("input#persediaan-start-date-pdf").val();
    const endDateVal = $("input#persediaan-end-date-pdf").val();
    const req = { startDateVal, endDateVal };
    const { status, response } = await getPDF(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const sumPrice1 = await sumPrice(req);
        const groupProduct1 = await groupProduct(req);
        const htmlContent = uiTrPDF(response, sumPrice1, groupProduct1);
        const filePath = await window.electronAPI.savePDF(htmlContent);
        if (filePath) {
          uiAlertSuccess(`File PDF Savded on ${filePath}`);
          $("#persediaan-modal-convert-pdf #failed").html(``);
          $("input#persediaan-start-date-pdf").val("");
          $("input#persediaan-end-date-pdf").val("");
          $("#persediaan-modal-convert-pdf").modal("hide");
        } else {
          console.error(filePath);
        }
        return;

        const tbodySupplierGroup = await groupSupplier(req);
        const txtSumSupplier = await sumSupplier(req);
        const tbodyCategoryGroup = await groupCategory(req);
        const txtSumCategory = await sumCategory(req);

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
      if (!existed) {
        uiAlertFail("uuppsss , sorry stock is still empty...");
      }
    }
    if (!status) {
      uiAlertFail1(response);
      console.error(response);
    }
  });
