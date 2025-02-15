import { getCashSum } from "../models/cash/controller.js";
import formatPrice from "./formatPrice.js";
import { email, number } from "./regex.js";

const validateEmail = (val) => {
  const isEmail = email.test(val);
  if (!isEmail) {
    const msg = `Please input correct email `;
    throw new Error(msg);
  }
};
const validateUserFullname = (UserFullnameVal) => {
  if (UserFullnameVal === "") {
    const msg = `Fullname required `;
    throw new Error(msg);
  }
};
const validateSamePassword = (UserPasswordVal, UserPassword1Val) => {
  if (UserPasswordVal === "" && UserPassword1Val === "") {
    const msg = `password must be filled`;
    throw new Error(msg);
  }
  if (UserPasswordVal !== UserPassword1Val) {
    const msg = `password must be same with confirm password`;
    throw new Error(msg);
  }
};
const validatePosition = (UserPositionVal) => {
  if (UserPositionVal === null) {
    const msg = `position field required`;
    throw new Error(msg);
  }
};
const validateLoadImg = (file) => {
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
const validateCash = async (balanceVal) => {
  const totalCash = await getCashSum();
  if (balanceVal > totalCash) {
    const totalPayment = formatPrice(balanceVal);
    const totalCash1 = formatPrice(totalCash);
    const msg = `Uppppss, Sorry Total Cash Only : ${totalCash1}, but Total Payment is ${totalPayment}`;
    throw new Error(msg);
  }
};
const validateProductAdd = (productId) => {
  const productSelect = productId >= 1;
  if (!productSelect) {
    const msg = "Please add Product First...";
    throw new Error(msg);
  }
};
const validateQty = (valPersediaanQty) => {
  // 1. must be integer with regex
  const isNumeric = number.test(valPersediaanQty);
  if (isNumeric === false) {
    const msg = "Please input type of number in qty...";
    throw new Error(msg);
  }
  if (valPersediaanQty === 0) {
    const msg = "Please Don't input value : 0";
    throw new Error(msg);
  }
};
const validatePrice = (buy, sell) => {
  // 1. must be integer with regex buy and sell
  const isNumeric = number.test(buy);
  if (isNumeric === false) {
    const msg = "Please input type of number in price buy...";
    throw new Error(msg);
  }
  const isNumeric1 = number.test(sell);
  if (isNumeric1 === false) {
    const msg = "Please input type of number in price sell...";
    throw new Error(msg);
  }
  // 2. must be greater 0
  if (buy === 0) {
    const msg = "Please input Price Buy greater 0 ...";
    throw new Error(msg);
  }
  if (sell === 0) {
    const msg = "Please input Price Sell greater 0 ...";
    throw new Error(msg);
  }
  // 2. must be profit
  const isProfit = buy < sell;
  if (isProfit === false) {
    const msg =
      "Upppsss, Sorry, Price Buy is lower than Price Sell , It's not profit";
    throw new Error(msg);
  }
};
const validateProductName = (productName) => {
  if (productName === "") {
    const msg = "Product Name must be filled...";
    throw new Error(msg);
  }
};
const validateSupplierName = (supplierName) => {
  if (supplierName === "") {
    const msg = "Supplier Name must be filled...";
    throw new Error(msg);
  }
};
const validateCategoryName = (categoryName) => {
  if (categoryName === "") {
    const msg = "Category Name must be filled...";
    throw new Error(msg);
  }
};
const validateDate = (startDateVal, endDateVal) => {
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
const validatePrice1 = (price) => {
  if (price === 0) {
    const msg = "Price must be filled";
    throw new Error(msg);
  }
};
const validateInvestor = (investorId) => {
  if (investorId === null) {
    const msg = `Investor must be filled`;
    throw new Error(msg);
  }
};
const validateDateAndTime = (date, time) => {
  if (date === "") {
    const msg = "Date must be filled";
    throw new Error(msg);
  }
  if (time === "") {
    const msg = "Time must be filled";
    throw new Error(msg);
  }
};
const validateAssetName = (assetNameVal) => {
  if (assetNameVal === "") {
    const msg = `Asset of Name must be filled`;
    throw new Error(msg);
  }
};
const validateExpenseName = (expenseNameVal) => {
  if (expenseNameVal === "") {
    const msg = `Expense of Name must be filled`;
    throw new Error(msg);
  }
};
const validateAssetPrice = (priceVal) => {
  // 1 must be filled
  if (priceVal === "") {
    const msg = "Please input asset price";
    throw new Error(msg);
  }
  // 2. must be integer
  const isNumeric = number.test(priceVal);
  if (isNumeric === false) {
    const msg = "Please input type of number in asset price...";
    throw new Error(msg);
  }
  // 3. must be greater 0
  if (priceVal == 0) {
    const msg = "Please input asset price greater than 0";
    throw new Error(msg);
  }
};
const validateExpensePrice = (priceVal) => {
  // 1 must be filled
  if (priceVal === "") {
    const msg = "Please input Expense price";
    throw new Error(msg);
  }
  // 2. must be integer
  const isNumeric = number.test(priceVal);
  if (isNumeric === false) {
    const msg = "Please input type of number in Expense price...";
    throw new Error(msg);
  }
  // 3. must be greater 0
  if (priceVal == 0) {
    const msg = "Please input Expense price greater than 0";
    throw new Error(msg);
  }
};
export {
  validateAssetName,
  validateAssetPrice,
  validateCash,
  validateCategoryName,
  validateDate,
  validateDateAndTime,
  validateEmail,
  validateExpensePrice,
  validateExpenseName,
  validateInvestor,
  validateLoadImg,
  validatePosition,
  validatePrice,
  validatePrice1,
  validateProductAdd,
  validateProductName,
  validateQty,
  validateSamePassword,
  validateSupplierName,
  validateUserFullname,
};
