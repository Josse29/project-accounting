import { executeGet1, executeGet2 } from "../database/runQuery.js";
import formatPrice from "./formatPrice.js";
import { capitalizeWord } from "./formatTxt.js";
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
    const msg = `Password must be filled`;
    throw new Error(msg);
  }
  if (UserPasswordVal !== UserPassword1Val) {
    const msg = `Password must be same with Confirm Password`;
    throw new Error(msg);
  }
};
const validatePosition = (UserPositionVal) => {
  if (
    UserPositionVal === null ||
    UserPositionVal === "null" ||
    UserPositionVal === ""
  ) {
    const msg = `User Position is required`;
    throw new Error(msg);
  }
};
const validateLoadImg1 = async (base64) => {
  if (base64.length > 0) {
    if (!base64.startsWith("data:image")) {
      const msg = `Invalid Image File`;
      throw new Error(msg);
    }
    const base64Str = base64.split(",")[1];
    const sizeInBytes =
      4 * Math.ceil(base64Str.length / 3) * 0.5624896334383812;
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB > 1024) {
      const msg = `Invalid Image Size (Maximize 1 MB)`;
      throw new Error(msg);
    }
  }
  return base64;
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
const validateCash = async (db, balanceVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS Total_Cash
  FROM Accounting 
  WHERE AccountingRef = 111 `;
  const { Total_Cash } = await executeGet2(db, query);
  if (Math.abs(balanceVal) > Total_Cash) {
    const totalPayment = formatPrice(balanceVal);
    const totalCash1 = formatPrice(Total_Cash);
    const msg = `Uppppss, Sorry Cash is insufficient , Total Cash Only = ${totalCash1}, But Total Payment is ${totalPayment} `;
    throw new Error(msg);
  }
};
const validateProductAdd = (productId) => {
  const productSelect = productId >= 1;
  if (productSelect === false) {
    const msg = "Please add Product First...";
    throw new Error(msg);
  }
};
const validateQty = async (
  db,
  stockProductQtyVal,
  productIdVal,
  productNameVal
) => {
  // 1. must be integer with regex
  const isNumeric = number.test(stockProductQtyVal);
  if (isNumeric === false) {
    const msg = "Please input correct type of number in qty...";
    throw new Error(msg);
  }
  // 2. validate existed product with db.stock
  if (stockProductQtyVal < 0) {
    const query = `
    SELECT 
    COALESCE(SUM(StockQty), 0) AS TotalQty
    FROM Stock
    WHERE 
    StockProductId = '${productIdVal}' `;
    const { TotalQty } = await executeGet2(db, query);
    if (Math.abs(stockProductQtyVal) > TotalQty) {
      const msg = `Upppsss, Sorry 
                  Total Stock - ${productNameVal} is only ${TotalQty} `;
      throw new Error(msg);
    }
  }
};
const validateQty1 = (qty) => {
  if (qty === 0 || qty === "0" || qty === "") {
    const msg = `Please correct input number in field qty...`;
    throw new Error(msg);
  }
};
const validatePrice = (buy, sell) => {
  // 1. must be integer with regex buy and sell
  const isNumeric = number.test(buy);
  if (isNumeric === false) {
    const msg = "Please input correct type of number in price buy...";
    throw new Error(msg);
  }
  const isNumeric1 = number.test(sell);
  if (isNumeric1 === false) {
    const msg = "Please input correct type of number in price sell...";
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
  const isProfit = parseFloat(buy) < parseFloat(sell);
  if (isProfit === false) {
    const msg =
      "Upppsss, Sorry, Price Buy Must be lower than Price Sell , It's not profit";
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
const validateAccountingBalance = (balance) => {
  const isNumeric = number.test(balance);
  if (isNumeric === false) {
    const msg = "Please Input Number in field Balance ....";
    throw new Error(msg);
  }
  if (balance === 0 || balance === "0") {
    const msg = "Balance Field must be greater than 0";
    throw new Error(msg);
  }
  if (balance === "") {
    const msg = "Balance is required";
    throw new Error(msg);
  }
};
const validateAssetValueUse = (balance, assetName, assetPrice) => {
  // 1. must be integer with regex buy and sell
  const isNumeric = number.test(balance);
  if (isNumeric === false) {
    const msg = "Please input correct type of number Asset Value Use...";
    throw new Error(msg);
  }
  if (balance === 0 || balance === "0") {
    const msg = "Asset Value Us must be greater than 0";
    throw new Error(msg);
  }
  if (balance === "") {
    const msg = "Asset Value Us must be Filled";
    throw new Error(msg);
  }
  if (balance > assetPrice) {
    const msg = `Uppssss, Price ${assetName} is only = ${formatPrice(
      assetPrice
    )} `;
    throw new Error(msg);
  }
};
const validateInvestorBalance = async (db, investorNameVal, balanceVal) => {
  const query = `
  SELECT
  COALESCE(SUM(AccountingBalance), 0) AS TotalBalance
  FROM Accounting
  WHERE 
  AccountingName LIKE '%equity - ${investorNameVal}%' AND AccountingRef = 311 
  `;
  const { TotalBalance } = await executeGet2(db, query);
  if (Math.abs(balanceVal) > TotalBalance) {
    const msg = `Upppsss , 
                Total Investment ${capitalizeWord(
                  investorNameVal
                )} only is = ${formatPrice(TotalBalance)}`;
    throw new Error(msg);
  }
};
const validateInvestorName = (investorName) => {
  if (investorName === "") {
    const msg = `Please Choose One of Investor`;
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
const validateAccountingName = async (db, nameVal) => {
  if (nameVal === "") {
    const msg = `Uppsss, Sorry
                 Title is Required`;
    throw new Error(msg);
  }
  const query = `
  SELECT 
  COUNT(*) AS Total
  FROM Accounting
  WHERE AccountingName LIKE '%${nameVal}%'
  `;
  const { Total } = await executeGet2(db, query);
  if (Total >= 1) {
    const msg = `Upsssss, Sorry
                 Title ${nameVal} is already existed, Please Change The Title `;
    throw new Error(msg);
  }
};
const validateAssetName1 = (assetNameVal) => {
  if (assetNameVal === "") {
    const msg = `Asset of Name is required`;
    throw new Error(msg);
  }
};
const validateAssetName = async (db, assetNameVal) => {
  if (assetNameVal === "") {
    const msg = `Asset of Name is required`;
    throw new Error(msg);
  }
  const query = `
  SELECT 
  COUNT(*) AS TotalAsset
  FROM 
  Accounting 
  WHERE 
  AccountingRef BETWEEN 113 AND 121 AND 
  AccountingName LIKE '%${assetNameVal.trim()}%'
  `;
  const { TotalAsset } = await executeGet2(db, query);
  if (TotalAsset >= 1) {
    const msg = `Upsss, Sorry 
                ${capitalizeWord(assetNameVal)} is already existed
                Please, Use Another Asset Name`;
    throw new Error(msg);
  }
};
const validateExpenseName = async (db, expenseNameVal) => {
  if (expenseNameVal === "") {
    const msg = `Expense of Name must be filled`;
    throw new Error(msg);
  }
  const query = `
  SELECT 
  COUNT(*) AS TotalExpense
  FROM Accounting
  WHERE AccountingName LIKE "%${expenseNameVal.trim()}%"
  `;
  const { TotalExpense } = await executeGet2(db, query);
  if (TotalExpense >= 1) {
    const msg = `Upppsss Sorry, 
                 Expense Name - ${capitalizeWord(
                   expenseNameVal
                 )} is already existed`;
    throw new Error(msg);
  }
};
const validateAssetPrice = (priceVal) => {
  // 1 must be filled
  if (priceVal === "") {
    const msg = "Please Input Asset Price";
    throw new Error(msg);
  }
  // 2. must be integer
  const isNumeric = number.test(priceVal);
  if (isNumeric === false) {
    const msg = "Please input type of number in Asset Price...";
    throw new Error(msg);
  }
  // 3. must be greater 0
  if (priceVal === 0 || priceVal === "0") {
    const msg = "Please Input Asset Price greater than 0";
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
const validateLiabilityBalance = async (
  db,
  liabilityNameVal,
  liabilityBalanceVal
) => {
  const query = ` 
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS Total_Liability
  FROM Accounting
  WHERE
  AccountingName LIKE '%Liability - ${liabilityNameVal}%' AND
  AccountingRef = 211 `;
  const { Total_Liability } = await executeGet2(db, query);
  // if don't have liability at all
  if (Total_Liability === 0) {
    const msg = `Upsss Sorry, Total Liability ${liabilityNameVal} is ${formatPrice(
      0
    )}`;
    throw new Error(msg);
  }
  // if it execeed payment
  if (liabilityBalanceVal > Total_Liability) {
    const msg = `Uppppsss Sorry, Total Liability ${liabilityNameVal} is ${formatPrice(
      Total_Liability
    )}`;
    throw new Error(msg);
  }
};
const validateLiabilityName = (liabilityNameVal) => {
  if (liabilityNameVal === "" || liabilityNameVal === undefined) {
    const msg = `Creditor Name must be required`;
    throw new Error(msg);
  }
};
const validateReceivableBalance = async (
  db,
  receivableNameVal,
  receivableBalanceVal
) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS Total_Receivable
  FROM Accounting
  WHERE 
  AccountingName LIKE '%Receivable - ${capitalizeWord(receivableNameVal)}%' AND 
  AccountingRef = 112 `;
  const { Total_Receivable } = await executeGet2(db, query);
  // if it's no have receviable
  if (Total_Receivable === 0) {
    const msg = `Uppppsss, Sorry Total Receivable - ${capitalizeWord(
      receivableNameVal
    )} is : ${formatPrice(Total_Receivable)} `;
    throw new Error(msg);
  }
  // if it execeed payment
  if (receivableBalanceVal > Total_Receivable) {
    const msg = `Uppsss, Sorry Total Receivable - ${receivableNameVal} is only ${formatPrice(
      Total_Receivable
    )} `;
    throw new Error(msg);
  }
};
const validateReceivableName = (receivableNameVal) => {
  if (receivableNameVal === undefined || receivableNameVal === "") {
    const msg = `Customer is required`;
    throw new Error(msg);
  }
};
const validateExisted = (data, table) => {
  if (data.length === 0) {
    const msg = `${table} is Empty`;
    throw new Error(msg);
  }
};
export {
  validateAccountingName,
  validateAccountingBalance,
  validateAssetName,
  validateAssetName1,
  validateAssetPrice,
  validateAssetValueUse,
  validateCash,
  validateDate,
  validateDateAndTime,
  validateEmail,
  validateExisted,
  validateExpensePrice,
  validateExpenseName,
  validateInvestorName,
  validateInvestorBalance,
  validateLoadImg,
  validateLoadImg1,
  validateLiabilityName,
  validateLiabilityBalance,
  validatePosition,
  validatePrice,
  validateProductAdd,
  validateProductName,
  validateQty,
  validateQty1,
  validateReceivableName,
  validateReceivableBalance,
  validateSamePassword,
  validateSupplierName,
  validateUserFullname,
};
