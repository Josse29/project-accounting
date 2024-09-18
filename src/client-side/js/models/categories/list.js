import { getListCategory } from "../../../../serverless-side/functions/categories.js";

// function to update when create list product ref categories
export const listCategoryRefProductCreate = async () => {
  try {
    const response = await getListCategory("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected value=null>Choose One Of Categories</option>`;
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option = `<option selected disabled class="fst-italic">Category Empty</option>`;
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
    if (existed) {
      let option = `<option selected value=null>Choose One Of Categories</option>`;
      response.forEach((el) => {
        const isSelected =
          selected === parseInt(el.CategoryId) ? "selected" : "";
        option += `<option value=${el.CategoryId} ${isSelected}>${el.CategoryName}</option>`;
      });
    }
    $("select#product-refcategory-update").html(option);
    if (!existed) {
      option = `<option selected disabled class="fst-italic">Category Empty</option>`;
    }
  } catch (error) {
    console.error(error);
  }
};
export const listCategoryRefPersediaanRead = async () => {
  try {
    const response = await getListCategory("");
    const existed = response.length >= 1;
    let option = ``;
    if (existed) {
      option = `<option selected disabled>Choose One Of Categories</option>`;
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option = `<option selected disabled class="fst-italic">Category Empty</option>`;
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
    let option = ``;
    if (existed) {
      option = `<option selected disabled>Choose One Of Categories</option>`;
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option = `<option selected disabled class="fst-italic">Category Empty</option>`;
    }
    $("select#persediaan-date-category").html(option);
  } catch (error) {
    console.error(error);
  }
};
