import { getListSupplier } from "../../../../serverless-side/functions/supplier.js";
// function to update list supplier ref product create action
export const listSupplierRefProductCreate = async () => {
  try {
    const response = await getListSupplier("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected value=null>Choose One Of Suppliers</option>`;
      response.forEach((el) => {
        option += `<option value=${el.SupplierId}>${el.SupplierName}</option>`;
      });
    } else {
      option = `<option selected disabled class="fst-italic">Supplier Empty</option>`;
    }
    $("select#product-refsupplier-create").html(option);
  } catch (error) {
    console.error(error);
  }
};
// function to update when create list product ref categories
export const listSupplierRefProductUpdate = async (selected) => {
  try {
    const response = await getListSupplier("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected value=null>Choose One Of Suppliers</option>`;
      response.forEach((el) => {
        const isSelected =
          selected === parseInt(el.SupplierId) ? "selected" : "";
        option += `<option value=${el.SupplierId} ${isSelected}>${el.SupplierName}</option>`;
      });
    } else {
      option = `<option selected disabled class="fst-italic">Supplier Empty</option>`;
    }
    $("select#product-refsupplier-update").html(option);
  } catch (error) {
    console.error(error);
  }
};
// function to update html list when read persediaan
export const listSupplierRefPersediaanRead = async () => {
  try {
    const response = await getListSupplier("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected disabled>Choose One Of Suppliers</option>`;
      response.forEach((row) => {
        option += `<option value=${row.SupplierId}>${row.SupplierName}</option>`;
      });
    } else {
      option = `<option selected disabled class="fst-italic">Supplier Empty</option>`;
    }
    $("select#persediaan-refsupplier-search").html(option);
  } catch (error) {
    console.error(error);
  }
};
// function to update html list when read persediaanDate
export const listSupplierRefPersediaanReadDate = async () => {
  try {
    const response = await getListSupplier("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected disabled>Choose One Of Suppliers</option>`;
      response.forEach((row) => {
        option += `<option value=${row.SupplierId}>${row.SupplierName}</option>`;
      });
    } else {
      option = `<option selected disabled class="fst-italic">Supplier Empty</option>`;
    }
    $("select#persediaan-date-supplier").html(option);
  } catch (error) {
    console.error(error);
  }
};
