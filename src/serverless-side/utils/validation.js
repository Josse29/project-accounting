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
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS Total_Cash
  FROM Accounting 
  WHERE AccountingRef = 111 `;
  const { Total_Cash } = await window.ElectronAPI.sqlite3.each1(query);
  if (Math.abs(balanceVal) > Total_Cash) {
    const totalPayment = formatPrice(balanceVal);
    const totalCash1 = formatPrice(Total_Cash);
    const msg = `Uppppss, Sorry Cash is insufficient <p class="mb-0"> Total Cash Only : ${totalCash1}, </p> <p class="mb-0">But Total Payment is ${totalPayment} </p>`;
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
    const { TotalQty } = await window.ElectronAPI.sqlite3.each1(query);
    if (Math.abs(stockProductQtyVal) > TotalQty) {
      const msg = `Upppsss, Sorry 
                  <p class="mb-0">Total Stock - ${productNameVal} is only : ${TotalQty}</p> `;
      throw new Error(msg);
    }
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
const validateAccountingBalance = (balance) => {
  // 1. must be integer with regex buy and sell
  const isNumeric = number.test(balance);
  if (isNumeric === false) {
    const msg = "Please Input Number in Balance Field...";
    throw new Error(msg);
  }
  if (balance === 0 || balance === "0") {
    const msg = "Balance Field must be greater than 0";
    throw new Error(msg);
  }
  if (balance === "") {
    const msg = "Balance required";
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
    const msg = `Uppssss, Price ${assetName} is only : ${formatPrice(
      assetPrice
    )} `;
    throw new Error(msg);
  }
};
const validateInvestorBalance = async (investorNameVal, balanceVal) => {
  const query = `
  SELECT
  COALESCE(SUM(AccountingBalance), 0) AS TotalBalance
  FROM Accounting
  WHERE 
  AccountingName LIKE '%${investorNameVal}%'
  `;
  const { TotalBalance } = await window.ElectronAPI.sqlite3.each1(query);
  if (Math.abs(balanceVal) > TotalBalance) {
    const msg = `Upppsss , 
                <p class="mb-0">Total Investment ${capitalizeWord(
                  investorNameVal
                )} only is : ${formatPrice(TotalBalance)}</p>`;
    throw new Error(msg);
  }
};
const validateInvestorName = (investorName) => {
  if (investorName === "" || investorName === undefined) {
    const msg = `Investor Name must be filled`;
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
const validateAccountingName = async (nameVal) => {
  if (nameVal === "") {
    const msg = `Uppsss, Sorry
                <p class="mb-0">Title is Required</p>`;
    throw new Error(msg);
  }
  const query = `
  SELECT 
  COUNT(*) AS Total
  FROM Accounting
  WHERE AccountingName LIKE '%${nameVal}%'
  `;
  const { Total } = await window.ElectronAPI.sqlite3.each1(query);
  if (Total >= 1) {
    const msg = `Upsssss, Sorry
                 <p class="mb-0">Title ${nameVal} is already existed, Please Change The Title</p>`;
    throw new Error(msg);
  }
};
const validateAssetName = async (assetNameVal) => {
  if (assetNameVal === "") {
    const msg = `Asset of Name must be filled`;
    throw new Error(msg);
  }
  const query = `
  SELECT 
  COUNT(*) AS TotalAsset
  FROM 
  Accounting 
  WHERE 
  AccountingRef BETWEEN 113 AND 121 AND 
  AccountingName LIKE '%${assetNameVal}%'
  `;
  const { TotalAsset } = await window.ElectronAPI.sqlite3.each1(query);
  if (TotalAsset >= 1) {
    const msg = `Upsss, Sorry 
                <p class="mb-0">${assetNameVal} is already existed </p>
                <p class="mb-0">Please, Use Another Asset Name </p>`;
    throw new Error(msg);
  }
};
const validateAssetName1 = (assetNameVal) => {
  if (assetNameVal === "") {
    const msg = `Asset of Name must be filled`;
    throw new Error(msg);
  }
};
const validateExpenseName = async (expenseNameVal) => {
  if (expenseNameVal === "") {
    const msg = `Expense of Name must be filled`;
    throw new Error(msg);
  }
  const query = `
  SELECT 
  COUNT(*) AS TotalExpense
  FROM Accounting
  WHERE AccountingName LIKE "%${expenseNameVal}%"
  `;
  const { TotalExpense } = await window.ElectronAPI.sqlite3.each1(query);
  if (TotalExpense >= 1) {
    const msg = `Upppsss Sorry, 
                 <p class="mb-0">Expense Name : ${expenseNameVal} is already existed</p>`;
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
  const { Total_Liability } = await window.ElectronAPI.sqlite3.each1(query);
  // if don't have liability at all
  if (Total_Liability === 0) {
    const msg = `Upsss Sorry, <p class="mb-0">Total Liability ${liabilityNameVal} is ${formatPrice(
      0
    )}</p>`;
    throw new Error(msg);
  }
  // if it execeed payment
  if (liabilityBalanceVal > Total_Liability) {
    const msg = `Uppppsss Sorry, <p class='mb-0'>Total Liability ${liabilityNameVal} is ${formatPrice(
      Total_Liability
    )}</p>`;
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
  const { Total_Receivable } = await window.ElectronAPI.sqlite3.each1(query);
  // if it's no have receviable
  if (Total_Receivable === 0) {
    const msg = `Uppppsss, Sorry 
    <p class="mb-0">Total Receivable - ${capitalizeWord(
      receivableNameVal
    )} is : ${formatPrice(Total_Receivable)}</p>`;
    throw new Error(msg);
  }
  // if it execeed payment
  if (receivableBalanceVal > Total_Receivable) {
    const msg = `Uppsss, Sorry 
    <p class="mb-0">Total Receivable - ${receivableNameVal} is only ${formatPrice(
      Total_Receivable
    )}</p>`;
    throw new Error(msg);
  }
};
const validateReceivableName = (receivableNameVal) => {
  if (receivableNameVal === undefined || receivableNameVal === "") {
    const msg = `Customer must be required`;
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
  validateCategoryName,
  validateDate,
  validateDateAndTime,
  validateEmail,
  validateExpensePrice,
  validateExpenseName,
  validateInvestorName,
  validateInvestorBalance,
  validateLoadImg,
  validateLiabilityName,
  validateLiabilityBalance,
  validatePosition,
  validatePrice,
  validateProductAdd,
  validateProductName,
  validateQty,
  validateReceivableName,
  validateReceivableBalance,
  validateSamePassword,
  validateSupplierName,
  validateUserFullname,
};
