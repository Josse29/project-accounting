import { getList } from "./services.js";

// function to update when create list product ref categories
export const listCategoryRefProductCreate = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected value="null">Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    $("select#product-refcategory-create").html(option);
  }
  if (!status) {
    console.error(response);
  }
};
// function to update when update list product ref categories
export const listCategoryRefProductUpdate = async (selected) => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option value="null">Choose One Of Categories</option>`;
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
  }
  if (!status) {
    console.error(response);
  }
};
export const listCategoryRefPersediaanRead = async () => {
  const { status, response } = await getList("");
  if (status) {
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
  }
  if (!status) {
    console.error(response);
  }
};
export const listCategoryRefPersediaanReadDate = async () => {
  const { status, response } = await getList("");
  if (status) {
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
  }
  if (!status) {
    console.error(response);
  }
};
