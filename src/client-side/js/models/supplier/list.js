import { getList } from "./services.js";
// function to update list supplier ref product create action
export const listSupplierRefProductCreate = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected value="null">Choose One Of Suppliers</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value=${el.SupplierId}>${el.SupplierName}</option>`;
      });
    } else {
      option += `<option disabled class="fst-italic text-center">Supplier Empty.....</option>`;
    }
    $("select#product-refsupplier-create").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
// function to update when create list product ref categories
export const listSupplierRefProductUpdate = async (selected) => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option value="null">Choose One Of Suppliers</option>`;
    if (existed) {
      response.forEach((el) => {
        const isSelected =
          selected === parseInt(el.SupplierId) ? "selected" : "";
        option += `<option value=${el.SupplierId} ${isSelected}>${el.SupplierName}</option>`;
      });
    } else {
      option += `<option disabled class="fst-italic text-center">Supplier Empty.....</option>`;
    }
    $("select#product-refsupplier-update").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
// function to update html list when read persediaan
export const listSupplierRefPersediaanRead = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Suppliers</option>`;
    if (existed) {
      response.forEach((row) => {
        option += `<option value=${row.SupplierId}>${row.SupplierName}</option>`;
      });
    } else {
      option += `<option disabled class="fst-italic text-center">Supplier Empty.....</option>`;
    }
    $("select#persediaan-refsupplier-search").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
// function to update html list when read persediaanDate
export const listSupplierRefPersediaanReadDate = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Suppliers</option>`;
    if (existed) {
      response.forEach((row) => {
        option += `<option value=${row.SupplierId}>${row.SupplierName}</option>`;
      });
    } else {
      option += `<option disabled class="fst-italic text-center">Supplier Empty.....</option>`;
    }
    $("select#persediaan-date-supplier").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
