import { getListCategory } from "../../../../serverless-side/functions/categories.js";

// function to update when create list product ref categories
export function listCategoryRefProductCreate() {
  // function get list category
  getListCategory("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Choose One Of Category</option>`;
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
      $("select#product-refcategory-create").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
}
// function to update when update list product ref categories
export function listCategoryRefProductUpdate(selected) {
  // function get list category
  getListCategory("", (status, response) => {
    if (status) {
      let option = `<option selected value=null>Choose One Of Category</option>`;
      response.forEach((el) => {
        const isSelected =
          selected === parseInt(el.CategoryId) ? "selected" : "";
        option += `<option value=${el.CategoryId} ${isSelected}>${el.CategoryName}</option>`;
      });
      $("select#product-refcategory-update").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
}
export const listCategoryRefPersediaanRead = () => {
  getListCategory("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Kategori</option>`;
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
      $("select#persediaan-refcategory-search").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
};
export const listCategoryRefPersediaanReadDate = () => {
  getListCategory("", (status, response) => {
    if (status) {
      let option = `<option selected disabled>Kategori</option>`;
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
      $("select#persediaan-date-category").html(option);
    }
    if (!status) {
      console.error(response);
    }
  });
};
