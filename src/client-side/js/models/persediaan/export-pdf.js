import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  getByGroupCategory,
  getByGroupProduct1,
  getByGroupSupplier,
  getPDF,
  getSumPrice,
  getSumPriceCategory,
  getSumPriceSupplier,
  getSumQty,
} from "./services.js";
import {
  uiAlertSuccess,
  uiTrCategorySum,
  uiTrPDF,
  uiTrProductSum,
  uiTrSupplierSum,
} from "./ui.js";

// export pdf persediaan
// product
const groupProduct = async () => {
  const { status, response } = await getByGroupProduct1();
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
const groupSupplier = async () => {
  const { status, response } = await getByGroupSupplier();
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
const sumSupplier = async () => {
  const { status, response } = await getSumPriceSupplier();
  if (status) {
    const totalRp = formatRupiah2(response);
    return totalRp;
  }
  if (!status) {
    console.error(response);
  }
};
// category
const groupCategory = async () => {
  const { status, response } = await getByGroupCategory();
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
const sumCategory = async () => {
  const { status, response } = await getSumPriceCategory();
  if (status) {
    const totalRp = formatRupiah2(response);
    return totalRp;
  }
  if (!status) {
    console.error(response);
  }
};
// sum-qty
const sumQty = async () => {
  const { status, response } = await getSumQty("");
  if (status) {
    return response;
  }
  if (!status) {
    console.error(response);
  }
};
// sum-rp
const sumPrice = async () => {
  const { status, response } = await getSumPrice();
  if (status) {
    const rupiah = formatRupiah2(response);
    return rupiah;
  }
  if (!status) {
    console.error(response);
  }
};
// actions
$("#persediaan-export-pdf")
  .off("click")
  .on("click", async () => {
    const { status, response } = await getPDF();
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        let no = 1;
        let tbodyProduct = ``;
        response.forEach((rows) => {
          tbodyProduct += uiTrPDF(rows, no);
          no++;
        });
        const tbodyProductGroup = await groupProduct();
        const tbodySupplierGroup = await groupSupplier();
        const txtSumSupplier = await sumSupplier();
        const tbodyCategoryGroup = await groupCategory();
        const txtSumCategory = await sumCategory();
        const txtPersediaanQtySum = await sumQty();
        const txtPersediaanRpSum = await sumPrice();
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
    }
    if (!status) {
      console.error(response);
    }
  });
