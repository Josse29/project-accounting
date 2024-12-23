import { getList } from "./services.js";

const supplierList = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option value="null">Choose One Of Suppliers</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value="${el.SupplierId}">${el.SupplierName}</option>`;
      });
    } else {
      option += `<option disabled class="fst-italic text-center">Supplier Empty.....</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const supplierList1 = async (selected) => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    const selected1 = selected === "null" ? "selected" : "";
    let option = `<option value="null" ${selected1}>Choose One Of Suppliers</option>`;
    if (existed) {
      response.forEach((el) => {
        const isSelected =
          parseInt(selected) === parseInt(el.SupplierId) ? "selected" : "";
        option += `<option value="${el.SupplierId}" ${isSelected}>${el.SupplierName}</option>`;
      });
    } else {
      option += `<option disabled class="fst-italic text-center">Supplier Empty.....</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const supplierList2 = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Suppliers</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value="${el.SupplierId}">${el.SupplierName}</option>`;
      });
    } else {
      option += `<option disabled class="fst-italic text-center">Supplier Empty.....</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
export const listSupplierRefProductCreate = async () => {
  const option = await supplierList();
  $("select#product-refsupplier-create").html(option);
};
export const listSupplierRefProductUpdate = async (selected) => {
  const option = await supplierList1(selected);
  $("select#product-refsupplier-update").html(option);
};
export const listSupplierRefPersediaanRead = async () => {
  const option = await supplierList2();
  $("select#persediaan-refsupplier-search").html(option);
};
export const listSupplierRefPersediaanReadDate = async () => {
  const list = await supplierList2();
  const option = `
  <select class="form-control w-auto mb-3" id="persediaan-date-supplier">
    ${list}
  </select>
  `;
  return option;
};
