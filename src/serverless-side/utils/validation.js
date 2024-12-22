import { email, number } from "./regex.js";

export const validateEmail = (val) => {
  const isEmail = email.test(val);
  if (!isEmail) {
    const msg = `Please input correct email `;
    throw new Error(msg);
  }
};
export const validateUserFullname = (UserFullnameVal) => {
  if (UserFullnameVal === "") {
    const msg = `Fullname required `;
    throw new Error(msg);
  }
};
export const validateSamePassword = (UserPasswordVal, UserPassword1Val) => {
  if (UserPasswordVal === "" && UserPassword1Val === "") {
    const msg = `password must be filled`;
    throw new Error(msg);
  }
  if (UserPasswordVal !== UserPassword1Val) {
    const msg = `password must be same with confirm password`;
    throw new Error(msg);
  }
};
export const validatePosition = (UserPositionVal) => {
  if (UserPositionVal === null) {
    const msg = `position field required`;
    throw new Error(msg);
  }
};
export const validateLoadImg = (file) => {
  if (file.length >= 1) {
    // 1. Validate type file (image/jpeg, image/png, dll.)
    const ImgTypes = ["image/jpeg", "image/png", "image/gif"];
    const validateImg = ImgTypes.includes(file[0].type);
    if (!validateImg) {
      const msg =
        "File type is not valid. Please upload an image (JPEG, PNG, GIF).";
      throw new Error(msg);
    }
    // 2. Validate size file (max 2 MB)
    const fileSize = 2 * 1024 * 1024; // 2 MB in bytes
    const maxFileSize = file[0].size < fileSize;
    if (!maxFileSize) {
      const msg = "File size exceeds 2 MB.";
      throw new Error(msg);
    }
    // 3 after validate type & size, loadImg to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file[0]);
    });
  }
  if (file.length < 1) {
    return "null";
  }
};
export const validateProductAdd = (productId) => {
  const isNaN = Number.isNaN(productId);
  if (isNaN) {
    const msg = "Please add Product First...";
    throw new Error(msg);
  }
};
export const validateQty = (valPersediaanQty) => {
  const isNumeric = (val) => {
    const numeric = number.test(val);
    return numeric && val !== 0;
  };
  const valdateNum = isNumeric(valPersediaanQty);
  if (!valdateNum) {
    const msg = "Please input type of number in qty...";
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
export const validatePrice = (buy, sell) => {
  const priceBuyLesser = buy < sell;
  if (!priceBuyLesser) {
    const msg = "Price Buy must be lesser than Price Sell";
    throw new Error(msg);
  }
};
export const validateProductName = (productName) => {
  if (productName === "") {
    const msg = "Product Name must be filled...";
    throw new Error(msg);
  }
};
export const validateSupplierName = (supplierName) => {
  if (supplierName === "") {
    const msg = "Supplier Name must be filled...";
    throw new Error(msg);
  }
};
export const validateCategoryName = (categoryName) => {
  if (categoryName === "") {
    const msg = "Category Name must be filled...";
    throw new Error(msg);
  }
};
export const validateDate = (startDateVal, endDateVal) => {
  if (
    (startDateVal !== "" && endDateVal === "") ||
    (startDateVal === "" && endDateVal !== "") ||
    (startDateVal === "" && endDateVal === "")
  ) {
    const msg = "Start Date And End Date must be filled...";
    throw new Error(msg);
  }
  if (startDateVal > endDateVal) {
    const msg = "Start Date value must be lesser than End Date";
    throw new Error(msg);
  }
};
