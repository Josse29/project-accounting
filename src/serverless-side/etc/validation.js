import { isNumeric } from "./regex.js";

export const validateProductAdd = (productId) => {
  const isNaN = Number.isNaN(productId);
  if (isNaN) {
    const msg = "Please add Product First...";
    throw new Error(msg);
  }
};
export const validateQty = (valPersediaanQty) => {
  const valdateNum = isNumeric(valPersediaanQty);
  if (!valdateNum) {
    const msg = "Please input type of number in qty...";
    throw new Error(msg);
  }
};
export const validateProductName = (productName) => {
  if (productName === "") {
    const msg = "Product Name must be filled...";
    throw new Error(msg);
  }
};
export const validatePrice = (buy, sell) => {
  const priceBuyLesser = buy < sell;
  if (!priceBuyLesser) {
    const msg = "Price Buy must be lesser than Price Sell";
    throw new Error(msg);
  }
};
export const validateSupplierName = (supplierName) => {
  if (supplierName === "") {
    const msg = "Supplier Name must be filled...";
    throw new Error(msg);
  }
};
export const validateImg = (file) => {
  if (file.length >= 1) {
    // Validate type file (image/jpeg, image/png, dll.)
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file[0].type)) {
      const msg =
        "File type is not valid. Please upload an image (JPEG, PNG, GIF).";
      throw new Error(msg);
    }
    // Validate size file (max 2 MB)
    const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes
    if (file[0].size > maxFileSize) {
      const msg = "File size exceeds 2 MB.";
      throw new Error(msg);
    }
  }
};
export const validateCategoryName = (categoryName) => {
  if (categoryName === "") {
    const msg = "Category Name must be filled...";
    throw new Error(msg);
  }
};
