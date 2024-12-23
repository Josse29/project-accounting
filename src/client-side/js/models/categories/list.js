import { getList } from "./services.js";

const categoryList = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option value="null" selected>Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value="${el.CategoryId}">${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const categoryList1 = async (selected) => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    const selected1 = selected === "null" ? "selected" : "";
    let option = `<option value="null" ${selected1}>Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        const isSelected =
          parseInt(selected) === parseInt(el.CategoryId) ? "selected" : "";
        option += `<option value="${el.CategoryId}" ${isSelected}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const categoryList2 = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value="${el.CategoryId}">${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
export const listCategoryRefProductCreate = async () => {
  const list = await categoryList();
  $("select#product-refcategory-create").html(list);
};
export const listCategoryRefProductUpdate = async (selected) => {
  const list = await categoryList1(selected);
  $("select#product-refcategory-update").html(list);
};
export const listCategoryRefPersediaanRead = async () => {
  const list = await categoryList2();
  $("select#persediaan-refcategory-search").html(list);
};
export const listCategoryRefPersediaanReadDate = async () => {
  const list = await categoryList2();
  const option = `
  <select class="form-control w-auto mb-3" id="persediaan-date-category">
    ${list}
  </select>`;
  return option;
};
