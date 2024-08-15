import { getListSupplier } from "../../../../serverless-side/functions/supplier.js";
// function to update list supplier ref product create action
export function listSupplierRefProductCreate() {
  getListSupplier("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Supplier</option>`;
      response.forEach((el) => {
        option += `<option value=${el.SupplierId}>${el.SupplierName}</option>`;
      });
      $("select#product-refsupplier-create").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
}
// function to update when create list product ref categories
export function listSupplierRefProductUpdate(selected) {
  getListSupplier("", (status, response) => {
    if (status) {
      let option = `<option selected value=null>Choose One Of Supplier</option>`;
      response.forEach((el) => {
        const isSelected =
          selected === parseInt(el.SupplierId) ? "selected" : "";
        option += `<option value=${el.SupplierId} ${isSelected}>${el.SupplierName}</option>`;
      });
      $("select#product-refsupplier-update").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
}
// function to update html list when read persediaan
export const listSupplierRefPersediaanRead = () => {
  getListSupplier("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Supplier</option>`;
      response.forEach((row) => {
        option += `<option value=${row.SupplierId}>${row.SupplierName}</option>`;
      });
      return $("select#persediaan-refsupplier-search").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
};
// function to update html list when read persediaanDate
export const listSupplierRefPersediaanReadDate = () => {
  getListSupplier("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Supplier</option>`;
      response.forEach((row) => {
        option += `<option value=${row.SupplierId}>${row.SupplierName}</option>`;
      });
      return $("select#persediaan-date-supplier").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
};
