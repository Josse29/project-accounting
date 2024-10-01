import { getListCategory } from "../../../../serverless-side/functions/categories.js";

// function to update when create list product ref categories
export const listCategoryRefProductCreate = async () => {
  try {
    const response = await getListCategory("");
    const existed = response.length >= 1;
    let option = `<option selected value=null>Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    $("select#product-refcategory-create").html(option);
  } catch (error) {
    console.error(error);
  }
};
// function to update when update list product ref categories
export const listCategoryRefProductUpdate = async (selected) => {
  try {
    const response = await getListCategory("");
    const existed = response.length >= 1;
    let option = `<option value=null>Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        const isSelected =
          selected === parseInt(el.CategoryId) ? "selected" : "";
        option += `<option value=${el.CategoryId} ${isSelected}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    $("select#product-refcategory-update").html(option);
  } catch (error) {
    console.error(error);
  }
};
export const listCategoryRefPersediaanRead = async () => {
  try {
    const response = await getListCategory("");
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    $("select#persediaan-refcategory-search").html(option);
  } catch (error) {
    console.error(error);
  }
};
export const listCategoryRefPersediaanReadDate = async () => {
  try {
    const response = await getListCategory("");
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    $("select#persediaan-date-category").html(option);
  } catch (error) {
    console.error(error);
  }
};
