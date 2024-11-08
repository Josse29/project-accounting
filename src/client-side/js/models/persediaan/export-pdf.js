import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  getByGroupCategory,
  getByGroupProduct1,
  getByGroupSupplier,
  getPDF,
  getSumPriceCategory,
  getSumPriceDate,
  getSumPriceSupplier,
  getSumQtyDate,
} from "./services.js";
import {
  uiAlertFail,
  uiAlertSuccess,
  uiTrCategorySum,
  uiTrPDF,
  uiTrProductSum,
  uiTrSupplierSum,
} from "./ui.js";

// product
const groupProduct = async (req) => {
  const { status, response } = await getByGroupProduct1(req);
  if (status) {
    let no = 1;
    let tbodyProductSum = ``;
    response.forEach((element) => {
      tbodyProductSum += uiTrProductSum(element, no);
      no++;
    });
    return tbodyProductSum;
  }
  if (!status) {
    console.error(response);
  }
};
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
// sum-qty
const sumQty = async (req) => {
  const { status, response } = await getSumQtyDate(req);
  if (status) {
    return response;
  }
  if (!status) {
    console.error(response);
  }
};
// sum-rp
const sumPrice = async (req) => {
  const { status, response } = await getSumPriceDate(req);
  if (status) {
    const rupiah = formatRupiah2(response);
    return rupiah;
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
    if (
      startDateVal > endDateVal ||
      (startDateVal !== "" && endDateVal === "") ||
      (startDateVal === "" && endDateVal !== "")
    ) {
      return false;
    }
    const { status, response } = await getPDF(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        let no = 1;
        let tbodyProduct = ``;
        response.forEach((rows) => {
          tbodyProduct += uiTrPDF(rows, no);
          no++;
        });
        const tbodyProductGroup = await groupProduct(req);
        const tbodySupplierGroup = await groupSupplier(req);
        const txtSumSupplier = await sumSupplier(req);
        const tbodyCategoryGroup = await groupCategory(req);
        const txtSumCategory = await sumCategory(req);
        const txtPersediaanQtySum = await sumQty(req);
        const txtPersediaanRpSum = await sumPrice(req);
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
            $("#persediaan-modal-convert-pdf").modal("hide");
          });
        }
      }
      if (!existed) {
        uiAlertFail("uuppsss , sorry stock is still empty...");
        $("#persediaan-modal-convert-pdf").modal("hide");
      }
    }
    if (!status) {
      console.error(response);
    }
  });
