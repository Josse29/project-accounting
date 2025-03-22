import {
  queryCreate,
  queryRead,
  queryReadAsset,
  queryReadAsset1,
  queryReadCash,
  queryReadCash1,
  queryReadDate,
  queryReadEquity,
  queryReadExpense,
  queryReadLiability,
  queryReadPurchase,
  queryReadPurchaseDiscount,
  queryReadPurchaseReturn,
  queryReadReceivable,
  queryReadReceivable1,
  queryReadRevenueOthers,
  queryReadSales,
  queryReadSalesDiscount,
  queryReadSalesReturn,
  queryReadTotal,
} from "./querysql.js";
import formatPrice from "../../utils/formatPrice.js";
import { capitalizeWord } from "../../utils/formatTxt.js";
import {
  validateAccountingBalance,
  validateCash,
  validateDateAndTime,
  validateInvestorName,
  validateInvestorBalance,
  validateLiabilityBalance,
  validateLiabilityName,
  validateReceivableBalance,
  validateReceivableName,
  validateAssetName,
  validateAssetPrice,
  validateAssetName1,
  validateAssetValueUse,
  validateExpenseName,
  validateAccountingName,
  validateDate,
} from "../../utils/validation.js";
import { createStock } from "../stock/controller.js";

// cash-in-investment
const createAccounting = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingInvestorNameVal,
    accountingInvestorEmailVal,
    accountingBalanceVal,
    accountingInfoVal,
  } = req;
  // convert
  const accountingInvestorNameVal1 = capitalizeWord(accountingInvestorNameVal);
  const accountingBalanceVal1 = parseFloat(accountingBalanceVal);
  const accountingInfoVal1 = `Invest with Cash | ${accountingInfoVal}`;
  // 1.validate date and time,investorName,balancemustINT
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateInvestorName(accountingInvestorNameVal);
  validateAccountingBalance(accountingBalanceVal);
  // 4.sendPDFGMAIL(accountingInvestorEmailVal)
  // 5. create to table accounting
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Equity ${accountingInvestorNameVal1}`,
    accountingBalanceVal1,
    accountingInfoVal1
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    311,
    `Equity - ${accountingInvestorNameVal1}`,
    accountingBalanceVal1,
    accountingInfoVal1
  );
  const msg = `Accounting - Investment ${accountingInvestorNameVal1} with Total Cash ${formatPrice(
    accountingBalanceVal1
  )} has been added`;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  return msg;
};
// cash-out-asset-buy
const createAccounting1 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingAssetNameVal,
    accountingAssetTypeVal,
    accountingAssetPriceVal,
    accountingAssetEmailVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time, cash
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  await validateCash(accountingAssetPriceVal);
  await validateAssetName(capitalizeWord(accountingAssetNameVal));
  // 3. sendToGmail(accountingAssetEmailVal)
  // 4.send to db.accounting
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    parseInt(accountingAssetTypeVal),
    capitalizeWord(accountingAssetNameVal),
    accountingAssetPriceVal,
    accountingInfoVal
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Payment ${capitalizeWord(accountingAssetNameVal)}`,
    accountingAssetPriceVal * -1,
    accountingInfoVal
  );
  const msg = `Accounting - Payment ${capitalizeWord(
    accountingAssetNameVal
  )} with price ${formatPrice(accountingAssetPriceVal)} has been added`;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  return msg;
};
// cash-out-product-buy
const createAccounting2 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingProductIdVal,
    accountingProductNameVal,
    accountingProductQtyVal,
    accountingProductDiscountVal,
    accountingBalanceTotalVal,
    accountingSupplierEmailVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time , cash
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  await validateCash(accountingBalanceTotalVal);
  // 3.sendGmail(accountingSupplierEmailVal)
  // convert
  const accountingProductIdVal1 = parseInt(accountingProductIdVal);
  const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
  const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
  const accountingProductDiscountVal1 = parseFloat(
    accountingProductDiscountVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  const accountingInfoVal1 = `Purchase - ${accountingProductNameVal1} Total Qty : ${accountingProductQtyVal1} ${
    accountingProductDiscountVal1 > 0
      ? `with discount ${accountingProductDiscountVal1}%`
      : ""
  } Has Been Done ${accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""}`;
  // 4.db.stock
  const data = {
    stockDateVal: accountingDateVal,
    stockTimeVal: accountingTimeVal,
    stockActivityVal: `Purchase - ${accountingProductNameVal1}`,
    stockProductIdVal: accountingProductIdVal1,
    stockProductQtyVal: accountingProductQtyVal1,
    stockInfoVal: accountingInfoVal,
    productNameVal: accountingProductNameVal1,
  };
  await createStock(data);
  // 5. db.accounting
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    511,
    `Purchase - ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Purchase ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1 * -1,
    accountingInfoVal1
  );
  await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
  await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  if (accountingProductDiscountVal1 > 0) {
    const discountPrice =
      accountingBalanceTotalVal1 * (accountingProductDiscountVal1 / 100);
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      111,
      `Cash - Purchase Discount ${accountingProductNameVal1}`,
      discountPrice,
      accountingInfoVal1
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      513,
      `Purchase Discount - ${accountingProductNameVal1}`,
      discountPrice,
      accountingInfoVal1
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
    await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  }
  return accountingInfoVal1;
};
// cash-out-expense-buy
const createAccounting3 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingExpenseNameVal,
    accountingExpensePriceVal,
    accountingExpenseEmailVal,
    accountingInfoVal,
  } = req;
  // convert
  const accountingExpenseNameVal1 = capitalizeWord(accountingExpenseNameVal);
  const accountingExpensePriceVal1 = parseFloat(accountingExpensePriceVal);
  // 1.validate date and time, cash
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  await validateCash(accountingExpensePriceVal);
  await validateExpenseName(accountingExpenseNameVal);
  // 3. sendToGmail(accountingExpenseEmailVal)
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    514,
    accountingExpenseNameVal1,
    accountingExpensePriceVal1,
    accountingInfoVal
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Payment ${accountingExpenseNameVal1}`,
    accountingExpensePriceVal1 * -1,
    accountingInfoVal
  );
  const msg = `Accounting - Payment ${accountingExpenseNameVal1} with price ${formatPrice(
    accountingExpensePriceVal1
  )} has been added`;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  return msg;
};
// cash-in-product-sale
const createAccounting4 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingProductIdVal,
    accountingProductNameVal,
    accountingProductQtyVal,
    accountingProductDiscountVal,
    accountingBalanceTotalVal,
    accountingCustomerNameVal,
    accountingCustomerEmailVal,
    accountingSaleNameVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  // convert
  const accountingProductIdVal1 = parseInt(accountingProductIdVal);
  const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
  const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
  const accountingProductDiscountVal1 = parseFloat(
    accountingProductDiscountVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  const accountingCustomerNameVal1 = capitalizeWord(accountingCustomerNameVal);
  const accountingSaleNameVal1 = capitalizeWord(accountingSaleNameVal);
  const accountingInfoVal1 = `${accountingProductNameVal1} Has Been Sold with Total Qty : ${accountingProductQtyVal1} ${
    accountingProductDiscountVal1 > 0
      ? `And Sales Discount : ${accountingProductDiscountVal1}%`
      : ""
  } ${accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""}`;
  // 2.db.stock
  const data = {
    stockDateVal: accountingDateVal,
    stockTimeVal: accountingTimeVal,
    stockActivityVal: `Sales - ${accountingProductNameVal1}`,
    stockProductIdVal: accountingProductIdVal1,
    stockProductQtyVal: accountingProductQtyVal1 * -1,
    stockInfoVal: `Customer : ${accountingCustomerNameVal1} - Sale : ${accountingSaleNameVal1} | ${accountingInfoVal}`,
    productNameVal: accountingProductNameVal1,
  };
  await createStock(data);
  // 3. sendPDFGMAIL(accountingCustomerEmailVal)
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Sales ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    411,
    `Sales - ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
  await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  // with discount
  if (accountingProductDiscountVal1 > 0) {
    const discountPrice =
      accountingBalanceTotalVal1 * (accountingProductDiscountVal1 / 100);
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      413,
      `Sales Discount`,
      discountPrice,
      accountingInfoVal1
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      111,
      `Cash - Sales Discount`,
      discountPrice * -1,
      accountingInfoVal1
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
    await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  }
  return accountingInfoVal1;
};
// etc-product-sale-credit
const createAccounting5 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingProductIdVal,
    accountingProductNameVal,
    accountingProductQtyVal,
    accountingProductInterestVal,
    accountingBalanceTotalVal,
    accountingCustomerNameVal,
    accountingCustomerEmailVal,
    accountingSaleNameVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time , balance
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateAccountingBalance(accountingBalanceTotalVal);
  // convert
  const accountingProductIdVal1 = parseInt(accountingProductIdVal);
  const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
  const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
  const accountingProductInterestVal1 = parseFloat(
    accountingProductInterestVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  const accountingCustomerNameVal1 = capitalizeWord(accountingCustomerNameVal);
  const accountingSaleNameVal1 = capitalizeWord(accountingSaleNameVal);
  const accountingInfoVal1 = `${accountingProductNameVal1} Has Been Sold with Total Qty : ${accountingProductQtyVal1} ${
    accountingProductInterestVal1 > 0
      ? `with interest ${accountingProductInterestVal1}%`
      : ""
  } ${accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""}`;
  // 2.db.stock
  const data = {
    stockDateVal: accountingDateVal,
    stockTimeVal: accountingTimeVal,
    stockActivityVal: `Sales - ${accountingProductNameVal1}`,
    stockProductIdVal: accountingProductIdVal1,
    stockProductQtyVal: accountingProductQtyVal1 * -1,
    stockInfoVal: `Customer : ${accountingCustomerNameVal1} - Sale : ${accountingSaleNameVal1} | ${accountingInfoVal}`,
    productNameVal: accountingProductNameVal1,
  };
  await createStock(data);
  // 3. sendTOPDF(accountingCustomerEmailVal)
  // 4. create to table accounting
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    112,
    `Receivable - ${accountingCustomerNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    411,
    `Sales - ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
  await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  // with interest
  if (accountingProductInterestVal1 > 0) {
    const interestPrice =
      accountingBalanceTotalVal1 * (accountingProductInterestVal1 / 100);
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      112,
      `Receivable - ${accountingCustomerNameVal1}`,
      interestPrice,
      accountingInfoVal1
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      611,
      `Interest Revenue Receivable - ${accountingCustomerNameVal1}`,
      interestPrice,
      accountingInfoVal1
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
    await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  }
  return accountingInfoVal1;
};
// cash-in-liability
const createAccounting6 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingLiabilityNameVal,
    accountingLiabilityEmailVal,
    accountingBalanceTotalVal,
    accountingLiabilityInterestVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time,balance
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateLiabilityName(accountingLiabilityNameVal);
  validateAccountingBalance(accountingBalanceTotalVal);
  // convert
  const accountingLiabilityNameVal1 = capitalizeWord(
    accountingLiabilityNameVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  const accountingLiabilityInterestVal1 = parseFloat(
    accountingLiabilityInterestVal
  );
  // 3.sendPDFGMAIL(accountingLiabilityEmailVal)
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Liability ${accountingLiabilityNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    211,
    `Liability - ${accountingLiabilityNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal
  );
  const msg = `Accounting Liabilty - ${accountingLiabilityNameVal1} : ${formatPrice(
    accountingBalanceTotalVal1
  )} ${
    accountingLiabilityInterestVal1 > 0
      ? `with Interest ${accountingLiabilityInterestVal1}%`
      : ""
  } has been added`;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  // with interest
  if (accountingLiabilityInterestVal1 > 0) {
    const interestBalance =
      accountingBalanceTotalVal1 * (accountingLiabilityInterestVal1 / 100);
    const queryDebt1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      512,
      `Interest Liability - ${accountingLiabilityNameVal1} Expense`,
      interestBalance,
      accountingInfoVal
    );
    const queryCredit1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      211,
      `Liability - ${accountingLiabilityNameVal1}`,
      interestBalance,
      accountingInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt1, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit1, msg);
  }
  return msg;
};
// cash-out-liability
const createAccounting7 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingLiabilityNameVal,
    accountingLiabilityEmailVal,
    accountingBalanceTotalVal,
    accountingInfoVal,
  } = req;
  // convert
  const accountingLiabilityNameVal1 = capitalizeWord(
    accountingLiabilityNameVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  // 1.validate date and time, cash
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateLiabilityName(accountingLiabilityNameVal1);
  validateAccountingBalance(accountingBalanceTotalVal1);
  await validateCash(accountingBalanceTotalVal);
  await validateLiabilityBalance(
    accountingLiabilityNameVal1,
    accountingBalanceTotalVal1
  );
  // 4. sendPDF(accountingLiabilityEmailVal)
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    211,
    `Liability - ${accountingLiabilityNameVal1}`,
    accountingBalanceTotalVal1 * -1,
    accountingInfoVal
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Payment Liability ${accountingLiabilityNameVal1}`,
    accountingBalanceTotalVal * -1,
    accountingInfoVal
  );
  const msg = `Accounting Payment Liability - ${accountingLiabilityNameVal1} : ${formatPrice(
    accountingBalanceTotalVal1
  )} has been added `;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  return msg;
};
// cash-in-receivable
const createAccounting8 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingReceivableNameVal,
    accountingReceivableEmailVal,
    accountingBalanceTotalVal,
    accountingInfoVal,
  } = req;
  // 1. validate date and time, must be int, receivable
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateAccountingBalance(accountingBalanceTotalVal);
  validateReceivableName(accountingReceivableNameVal);
  await validateReceivableBalance(
    accountingReceivableNameVal,
    accountingBalanceTotalVal
  );
  // convert
  const accountingReceivableNameVal1 = capitalizeWord(
    accountingReceivableNameVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  // 3. sendPDF(accountingReceivableEmailVal)
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Receivable ${accountingReceivableNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    112,
    `Receivable - ${accountingReceivableNameVal1}`,
    accountingBalanceTotalVal1 * -1,
    accountingInfoVal
  );
  const msg = `Accounting Receivable ${capitalizeWord(
    accountingReceivableNameVal
  )} with cash ${formatPrice(accountingBalanceTotalVal1)}`;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  return msg;
};
// cash-out-return-product-sale
const createAccounting9 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingProductIdVal,
    accountingProductNameVal,
    accountingProductQtyVal,
    accountingProductDiscountVal,
    accountingBalanceTotalVal,
    accountingCustomerNameVal,
    accountingCustomerEmailVal,
    accountingSaleNameVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  // convert
  const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
  const accountingProductIdVal1 = parseInt(accountingProductIdVal);
  const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
  const accountingCustomerNameVal1 = capitalizeWord(accountingCustomerNameVal);
  const accountingSaleNameVal1 = capitalizeWord(accountingSaleNameVal);
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  const accountingProductDiscountVal1 = parseFloat(
    accountingProductDiscountVal
  );
  const accountingInfoVal1 = `Sales Return ${accountingProductNameVal1} Has Been Done with Total Qty : ${accountingProductQtyVal1} ${
    accountingProductDiscountVal1 > 0
      ? `with discount ${accountingProductDiscountVal1} %`
      : ""
  } ${accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""}`;
  // 2.db.stock product in
  const data = {
    stockDateVal: accountingDateVal,
    stockTimeVal: accountingTimeVal,
    stockActivityVal: `Sales Return - ${accountingProductNameVal1}`,
    stockProductIdVal: accountingProductIdVal1,
    stockProductQtyVal: accountingProductQtyVal1,
    stockInfoVal: `Customer : ${accountingCustomerNameVal1} - Sale : ${accountingSaleNameVal1} | ${accountingInfoVal}`,
    productNameVal: accountingProductNameVal1,
  };
  await createStock(data);
  // 3. sendPDFGMAIL(accountingCustomerEmailVal)
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    412,
    `Sales Return - ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Sales Return ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1 * -1,
    accountingInfoVal1
  );
  await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
  await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  // with discount
  if (accountingProductDiscountVal1 > 0) {
    const discountPrice =
      accountingBalanceTotalVal1 * (accountingProductDiscountVal1 / 100);
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      111,
      `Cash - Sales Discount ${accountingProductNameVal1}`,
      discountPrice,
      accountingInfoVal1
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      413,
      `Sales Discount - ${accountingProductNameVal1}`,
      discountPrice * -1,
      accountingInfoVal1
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
    await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  }
  return accountingInfoVal1;
};
//  etc-investment-asset
const createAccounting10 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingInvestorNameVal,
    accountingInvestorEmail,
    accountingAssetTypeVal,
    accountingAssetNameVal,
    accountingAssetPriceVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time, assetName, investorName, balance
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateAssetName1(accountingAssetNameVal);
  validateInvestorName(accountingInvestorNameVal);
  validateAccountingBalance(accountingAssetPriceVal);
  // 2.sendToInvestor(accountingInvestorEmail)
  // 3. convert
  const accountingAssetNameVal1 = capitalizeWord(accountingAssetNameVal);
  const accountingInvestorNameVal1 = capitalizeWord(accountingInvestorNameVal);
  const accountingAssetPriceVal1 = parseFloat(accountingAssetPriceVal);
  const accountingAssetTypeVal1 = parseFloat(accountingAssetTypeVal);
  // 4. create to table accounting
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    accountingAssetTypeVal1,
    accountingAssetNameVal1,
    accountingAssetPriceVal1,
    accountingInfoVal
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    311,
    `Equity - ${accountingInvestorNameVal1}`,
    accountingAssetPriceVal1,
    `Invest with ${accountingAssetNameVal1} | ${accountingInfoVal}`
  );
  const msg = `Accounting Investment - ${accountingInvestorNameVal1} with ${accountingAssetNameVal1} has been added`;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  return msg;
};
// etc-product-buy-credit
const createAccounting11 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingProductIdVal,
    accountingProductNameVal,
    accountingProductQtyVal,
    accountingProductInterestVal,
    accountingBalanceTotalVal,
    accountingSupplierEmailVal,
    accountingSupplierNameVal,
    accountingInfoVal,
  } = req;
  // convert
  const accountingProductIdVal1 = parseInt(accountingProductIdVal);
  const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
  const accountingSupplierNameVal1 = capitalizeWord(accountingSupplierNameVal);
  const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
  const accountingProductInterestVal1 = parseFloat(
    accountingProductInterestVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  const accountingInfoVal1 = `Purchase - ${accountingProductNameVal1} Total Qty : ${accountingProductQtyVal1} ${
    accountingProductInterestVal1 > 0
      ? `with interest ${accountingProductInterestVal1}%`
      : ""
  } | ${accountingInfoVal}`;
  // 1.db.stock
  const data = {
    stockDateVal: accountingDateVal,
    stockTimeVal: accountingTimeVal,
    stockActivityVal: `Purchase - ${accountingProductNameVal1}`,
    stockProductIdVal: accountingProductIdVal1,
    stockProductQtyVal: accountingProductQtyVal1,
    stockBalanceTotalVal: accountingBalanceTotalVal1,
    stockInfoVal: accountingInfoVal,
    productNameVal: accountingProductNameVal1,
  };
  await createStock(data);
  // 2,sendToGMAIL(accountingSupplierEmailVal)
  // 3 db.accounting
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    511,
    `Purchase - ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    211,
    `Liability - ${accountingSupplierNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
  await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  // with interest
  if (accountingProductInterestVal1 > 0) {
    const interestPrice =
      accountingBalanceTotalVal1 * (accountingProductInterestVal1 / 100);
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      514,
      `Interest Expense Liability - ${accountingSupplierNameVal1}`,
      interestPrice,
      accountingInfoVal1
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      211,
      `Liability - ${accountingSupplierNameVal1}`,
      interestPrice,
      accountingInfoVal1
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
    await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  }
  return accountingInfoVal1;
};
// 12. etc-return-product-buy-credit
const createAccounting12 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingProductIdVal,
    accountingProductNameVal,
    accountingProductInterestVal,
    accountingProductQtyVal,
    accountingBalanceTotalVal,
    accountingSupplierEmailVal,
    accountingSupplierNameVal,
    accountingInfoVal,
  } = req;
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  // convert
  const accountingProductIdVal1 = parseInt(accountingProductIdVal);
  const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
  const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
  const accountingProductInterestVal1 = parseFloat(
    accountingProductInterestVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  const accountingSupplierNameVal1 = capitalizeWord(accountingSupplierNameVal);
  const accountingInfoVal1 = `Purchase Return - ${accountingProductNameVal1} Total Qty : ${accountingProductQtyVal1} ${
    accountingProductInterestVal > 0
      ? `with interest ${accountingProductInterestVal1} %`
      : ""
  } | ${accountingInfoVal}`;
  // 1.db.stock
  const data = {
    stockDateVal: accountingDateVal,
    stockTimeVal: accountingTimeVal,
    stockActivityVal: `Purchase Return - ${accountingProductNameVal1}`,
    stockProductIdVal: accountingProductIdVal1,
    stockProductQtyVal: accountingProductQtyVal1 * -1,
    stockBalanceTotalVal: accountingBalanceTotalVal1 * -1,
    stockInfoVal: accountingInfoVal,
    productNameVal: accountingProductNameVal1,
  };
  await createStock(data);
  // 2,sendToGMAIL(accountingSupplierEmailVal)
  // 3.executed
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    211,
    `Liability - ${accountingSupplierNameVal1}`,
    accountingBalanceTotalVal1 * -1,
    accountingInfoVal1
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    512,
    `Purchase Return - ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
  await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  // with interest
  if (accountingProductInterestVal1 > 0) {
    const interestPrice =
      accountingBalanceTotalVal1 * (accountingProductInterestVal1 / 100);
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      211,
      `Liability - ${accountingSupplierNameVal1}`,
      interestPrice * -1,
      accountingInfoVal1
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      514,
      `Interest Expense Liability - ${accountingSupplierNameVal1}`,
      interestPrice * -1,
      accountingInfoVal1
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
    await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  }
  return accountingInfoVal1;
};
// cash-in-return-product-buy
const createAccounting13 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingProductIdVal,
    accountingProductNameVal,
    accountingProductQtyVal,
    accountingProductDiscountVal,
    accountingBalanceTotalVal,
    accountingSupplierEmailVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  // 3.sendGmail(accountingSupplierEmailVal)
  // convert
  const accountingProductIdVal1 = parseInt(accountingProductIdVal);
  const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
  const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
  const accountingProductDiscountVal1 = parseFloat(
    accountingProductDiscountVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  const accountingInfoVal1 = `Purchase Return - ${accountingProductNameVal1} Total Qty : ${accountingProductQtyVal1} ${
    accountingProductDiscountVal > 0
      ? `with discount ${accountingProductDiscountVal1} %`
      : ""
  } ${accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""}`;
  // 4.db.stock
  const data = {
    stockDateVal: accountingDateVal,
    stockTimeVal: accountingTimeVal,
    stockActivityVal: `Purchase Return  - ${accountingProductNameVal1}`,
    stockProductIdVal: accountingProductIdVal1,
    stockProductQtyVal: accountingProductQtyVal * -1,
    stockInfoVal: accountingInfoVal,
    productNameVal: accountingProductNameVal1,
  };
  await createStock(data);
  // 5. db.accounting
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Purchase Return ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    512,
    `Purchase Return - ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
  await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  if (accountingProductDiscountVal1 > 0) {
    const discountPrice =
      accountingBalanceTotalVal1 * (accountingProductDiscountVal1 / 100);
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      513,
      `Purchase Discount - ${accountingProductNameVal1}`,
      discountPrice * -1,
      accountingInfoVal1
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      111,
      `Cash - Purchase Discount ${accountingProductNameVal1}`,
      discountPrice * -1,
      accountingInfoVal1
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
    await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  }
  return accountingInfoVal1;
};
// etc-accumulation-asset
const createAccounting14 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingAssetNameVal,
    accountingAssetTypeVal,
    accountingAssetPriceVal,
    accountingAssetValueUse,
    accountingInfoVal,
  } = req;
  // 1.validate date and time
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateAssetValueUse(
    accountingAssetValueUse,
    accountingAssetNameVal,
    accountingAssetPriceVal
  );
  // convert
  const accountingAssetNameVal1 = capitalizeWord(accountingAssetNameVal);
  const accountingAssetValueUse1 = parseFloat(accountingAssetValueUse);
  const msg = `Accounting Accumulation Deprecated - ${accountingAssetNameVal1} : ${formatPrice(
    accountingAssetValueUse1
  )}`;
  // wiht fixed asset and current asset
  if (accountingAssetTypeVal >= 121) {
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      514,
      `Depreciation Expense - ${accountingAssetNameVal1}`,
      accountingAssetValueUse,
      accountingInfoVal
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      131,
      `Accumulated of Depreciation - ${accountingAssetNameVal1}`,
      accountingAssetValueUse * -1,
      accountingInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  } else {
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      513,
      `${accountingAssetNameVal1} - Expense`,
      accountingAssetValueUse,
      accountingInfoVal
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      accountingAssetNameVal1,
      accountingAssetValueUse * -1,
      accountingInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  }
  return msg;
};
// cash-in-asset-sell || cash-in-return-asset ||
const createAccounting15 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingAssetNameVal,
    accountingAssetPriceBuyVal,
    accountingAssetPriceSellVal,
    accountingAssetTypeVal,
    accountingAssetEmailVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time,asset name, price
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateAssetName1(accountingAssetNameVal);
  validateAssetPrice(accountingAssetPriceSellVal);
  // 2.sendGmail(accountingAssetEmail)
  // 3.convert
  const accountingAssetNameVal1 = capitalizeWord(accountingAssetNameVal);
  const accountingAssetPriceBuyVal1 = parseFloat(accountingAssetPriceBuyVal);
  const accountingAssetPriceSellVal1 = parseFloat(accountingAssetPriceSellVal);
  // 5. db.accounting
  const msg = `Accounting Payment ${accountingAssetNameVal1} with Total Cash : ${formatPrice(
    accountingAssetPriceSellVal1
  )} `;
  // it's profit
  if (accountingAssetPriceBuyVal1 < accountingAssetPriceSellVal1) {
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      111,
      `Cash - Sales Asset ${accountingAssetNameVal1}`,
      accountingAssetPriceBuyVal1,
      accountingInfoVal
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      accountingAssetNameVal1,
      accountingAssetPriceBuyVal1 * -1,
      accountingInfoVal
    );
    const priceGap = accountingAssetPriceSellVal1 - accountingAssetPriceBuyVal;
    const queryDebt1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      111,
      `Cash - Revenue Sales Asset ${accountingAssetNameVal1}`,
      priceGap,
      accountingInfoVal
    );
    const queryCredit1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      411,
      `Revenue Sales Asset ${accountingAssetNameVal1}`,
      priceGap * -1,
      accountingInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit, msg);
    await window.ElectronAPI.sqlite3.run(queryDebt1, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit1, msg);
  }
  // it's break even point
  if (accountingAssetPriceBuyVal1 === accountingAssetPriceSellVal1) {
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      111,
      `Cash - Sales Asset ${accountingAssetNameVal1}`,
      accountingAssetPriceSellVal1,
      accountingInfoVal
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      accountingAssetNameVal1,
      accountingAssetPriceBuyVal1 * -1,
      accountingInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  }
  // it's sale with loss
  if (accountingAssetPriceBuyVal1 > accountingAssetPriceSellVal1) {
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      111,
      `Cash - Sales Asset ${accountingAssetNameVal1}`,
      accountingAssetPriceSellVal1,
      accountingInfoVal
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      accountingAssetNameVal1,
      accountingAssetPriceSellVal1 * -1,
      accountingInfoVal
    );
    const priceGap = accountingAssetPriceBuyVal1 - accountingAssetPriceSellVal1;
    const queryDebt1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      514,
      `Sales Loss Expense - Asset ${accountingAssetNameVal1}`,
      priceGap,
      accountingInfoVal
    );
    const queryCredit1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      accountingAssetNameVal1,
      priceGap * -1,
      accountingInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit, msg);
    await window.ElectronAPI.sqlite3.run(queryDebt1, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit1, msg);
  }
  return msg;
};
// cash-out-withdrawl-investment
const createAccounting17 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingInvestorNameVal,
    accountingInvestorEmailVal,
    accountingBalanceVal,
    accountingInfoVal,
  } = req;
  // 1. all validation date-time, investorName, balanceMustBeINT, investorbalance, cash
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateInvestorName(accountingInvestorNameVal);
  validateAccountingBalance(accountingBalanceVal);
  await validateInvestorBalance(
    accountingInvestorNameVal,
    accountingBalanceVal * -1
  );
  await validateCash(accountingBalanceVal * -1);
  // 2. sendGmail(accountingInvestorEmail)
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    311,
    `Withdrawl Equity - ${accountingInvestorNameVal}`,
    accountingBalanceVal,
    `Invest with Cash | ${accountingInfoVal}`
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Withdrawl Equity ${accountingInvestorNameVal}`,
    accountingBalanceVal * -1,
    `Invest with Cash | ${accountingInfoVal}`
  );
  const msg = `Accounting Withdrawl Investor - ${capitalizeWord(
    accountingInvestorNameVal
  )} with balance : ${formatPrice(accountingBalanceVal)} has been added`;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  return msg;
};
// 19. etc-return-product-sale-credit
const createAccounting19 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingProductIdVal,
    accountingProductNameVal,
    accountingProductQtyVal,
    accountingProductInterestVal,
    accountingBalanceTotalVal,
    accountingCustomerNameVal,
    accountingCustomerEmailVal,
    accountingSaleNameVal,
    accountingInfoVal,
  } = req;
  // 1.validate date-time, balance, db.stock
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateAccountingBalance(accountingBalanceTotalVal);
  // convert
  const accountingProductIdVal1 = parseInt(accountingProductIdVal);
  const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
  const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
  const accountingProductInterestVal1 = parseFloat(
    accountingProductInterestVal
  );
  const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
  const accountingCustomerNameVal1 = capitalizeWord(accountingCustomerNameVal);
  const accountingSaleNameVal1 = capitalizeWord(
    capitalizeWord(accountingSaleNameVal)
  );
  const accountingInfoVal1 = `Sales Return ${accountingProductNameVal1} Has Been Done with Total Qty : ${accountingProductQtyVal1} | ${accountingInfoVal}`;
  // 2.db.stock
  const data = {
    stockDateVal: accountingDateVal,
    stockTimeVal: accountingTimeVal,
    stockActivityVal: `Sales Return - ${accountingProductNameVal1}`,
    stockProductIdVal: accountingProductIdVal1,
    stockProductQtyVal: accountingProductQtyVal1,
    stockInfoVal: `Customer : ${accountingCustomerNameVal1} - Sale : ${accountingSaleNameVal1} | ${accountingInfoVal}`,
    productNameVal: accountingProductNameVal1,
  };
  await createStock(data);
  // 3. sendTOPDF(accountingCustomerEmailVal)
  // 4. create to table accounting
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    411,
    `Sales Return - ${accountingProductNameVal1}`,
    accountingBalanceTotalVal1,
    accountingInfoVal1
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    112,
    `Receivable - ${accountingCustomerNameVal1}`,
    accountingBalanceTotalVal1 * -1,
    accountingInfoVal1
  );
  await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
  await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  // with interest
  if (accountingProductInterestVal1 > 0) {
    const interestPrice =
      accountingBalanceTotalVal1 * (accountingProductInterestVal1 / 100);
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      611,
      `Interest Revenue Receivable - ${accountingCustomerNameVal1}`,
      interestPrice * -1,
      accountingInfoVal1
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      112,
      `Receivable - ${accountingCustomerNameVal1}`,
      interestPrice * -1,
      accountingInfoVal1
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, accountingInfoVal1);
    await window.ElectronAPI.sqlite3.run(queryCredit, accountingInfoVal1);
  }
  return accountingInfoVal1;
};
// etc-withdrawl-investment-asset
const createAccounting20 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingInvestorNameVal,
    accountingInvestorEmail,
    accountingAssetTypeVal,
    accountingAssetNameVal,
    accountingAssetPriceVal,
    accountingInfoVal,
  } = req;

  // 1.validate date-time, investorName, balanceINT, investorBalance
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateInvestorName(accountingInvestorNameVal);
  validateAccountingBalance(accountingAssetPriceVal);
  await validateInvestorBalance(
    accountingInvestorNameVal,
    accountingAssetPriceVal * -1
  );
  //2. convert all
  const accountingInvestorNameVal1 = capitalizeWord(accountingInvestorNameVal);
  const accountingAssetNameVal1 = capitalizeWord(accountingAssetNameVal);
  const accountingAssetTypeVal1 = parseFloat(accountingAssetTypeVal);
  const accountingAssetPriceVal1 = parseFloat(accountingAssetPriceVal);
  // 3. send to investor
  // sendToInvestor(accountingInvestorEmail)
  // 3. create to table accounting
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    311,
    `Equity - ${accountingInvestorNameVal1}`,
    accountingAssetPriceVal1 * -1,
    `Invest with ${accountingInvestorNameVal1} | ${accountingInfoVal}`
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    accountingAssetTypeVal1,
    accountingAssetNameVal1,
    accountingAssetPriceVal1 * -1,
    accountingInfoVal
  );
  const msg = `Accounting Withdraw Investment - ${accountingAssetNameVal1} with ${formatPrice(
    accountingAssetPriceVal1
  )} has been added`;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  return msg;
};
// etc-asset-buy-credit
const createAccounting18 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingAssetNameVal,
    accountingAssetTypeVal,
    accountingAssetPriceVal,
    accountingAssetInterestVal,
    accountingUserFullnameVal,
    accountingUserEmailVal,
    accountingInfoVal,
  } = req;
  // 1.validate date-time
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateAssetName1(accountingAssetNameVal);
  // 2.sendPDFGmail(accountingUserEmailVal)
  // 3.convert
  const accountingAssetNameVal1 = capitalizeWord(accountingAssetNameVal);
  const accountingAssetTypeVal1 = parseFloat(accountingAssetTypeVal);
  const accountingAssetPriceVal1 = parseFloat(accountingAssetPriceVal);
  const accountingAssetInterestVal1 = parseFloat(accountingAssetInterestVal);
  const accountingUserFullnameVal1 = capitalizeWord(accountingUserFullnameVal);
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    accountingAssetTypeVal1,
    accountingAssetNameVal1,
    accountingAssetPriceVal1,
    accountingInfoVal
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    211,
    `Liability - ${accountingUserFullnameVal1}`,
    accountingAssetPriceVal1,
    accountingInfoVal
  );
  const msg = `Accounting Purchase ${accountingAssetNameVal} with Total Credit : ${formatPrice(
    accountingAssetPriceVal1
  )} `;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  // with interest
  if (accountingAssetInterestVal1 > 0) {
    const interestVal =
      accountingAssetPriceVal1 * (accountingAssetInterestVal1 / 100);
    const queryDebt1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      514,
      `Interest Expense Liability - ${accountingUserFullnameVal1}`,
      interestVal,
      accountingInfoVal
    );
    const queryCredit1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      211,
      `Liability - ${accountingUserFullnameVal1}`,
      interestVal,
      `Interest Liability | ${accountingInfoVal}`
    );
    await window.ElectronAPI.sqlite3.run(queryDebt1, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit1, msg);
  }
  return msg;
};
// etc-asset-sell-credit
const createAccounting21 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingAssetNameVal,
    accountingAssetTypeVal,
    accountingAssetBalanceVal,
    accountingAssetPriceSellVal,
    accountingSupplierFullnameVal,
    accountingSupplierEmailVal,
    accountingAssetInterestVal,
    accountingAssetInfoVal,
  } = req;
  // 1. all validate
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  validateAssetName1(accountingAssetNameVal);
  // 2. sendInvoice(accountingSupplierEmailVal)
  // convert
  const accountingAssetNameVal1 = capitalizeWord(accountingAssetNameVal);
  const accountingAssetPriceSellVal1 = parseFloat(accountingAssetPriceSellVal);
  const accountingAssetBalanceVal1 = parseFloat(accountingAssetBalanceVal);
  const accountingSupplierFullnameVal1 = capitalizeWord(
    accountingSupplierFullnameVal
  );
  const accountingAssetInterestVal1 = parseFloat(accountingAssetInterestVal);
  const msg = `Accounting Sale Credit ${accountingAssetNameVal1} with balance ${formatPrice(
    accountingAssetPriceSellVal1
  )}`;
  // if advantage
  if (accountingAssetPriceSellVal1 > accountingAssetBalanceVal1) {
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      112,
      `Receivable - ${accountingSupplierFullnameVal1}`,
      accountingAssetBalanceVal1,
      accountingAssetInfoVal
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      `Sales - Asset ${accountingAssetNameVal1}`,
      accountingAssetBalanceVal1 * -1,
      accountingAssetInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit, msg);
    // there's is gap price
    const priceGap = accountingAssetPriceSellVal1 - accountingAssetBalanceVal1;
    const queryDebt1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      112,
      `Receivable - ${accountingSupplierFullnameVal1}`,
      priceGap,
      accountingAssetInfoVal
    );
    const queryCredit1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      `Sales - Asset ${accountingAssetNameVal1}`,
      priceGap * -1,
      accountingAssetInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt1, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit1, msg);
  }
  // it's break even point
  if (accountingAssetPriceSellVal1 === accountingAssetBalanceVal1) {
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      112,
      `Receivable - ${accountingSupplierFullnameVal1}`,
      accountingAssetPriceSellVal1,
      accountingAssetInfoVal
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      `Sales - Asset ${accountingAssetNameVal1}`,
      accountingAssetBalanceVal1 * -1,
      accountingAssetInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  }
  // it's sales credit with loss
  if (accountingAssetPriceSellVal1 < accountingAssetBalanceVal1) {
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      112,
      `Receivable - ${accountingSupplierFullnameVal1}`,
      accountingAssetPriceSellVal1,
      accountingAssetInfoVal
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      `Sales - Asset ${accountingAssetNameVal1}`,
      accountingAssetPriceSellVal1 * -1,
      accountingAssetInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit, msg);
    // it's price gap
    const priceGap = accountingAssetBalanceVal1 - accountingAssetPriceSellVal1;
    const queryDebt1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      514,
      `Sales Loss Expense - Asset ${accountingAssetNameVal1}`,
      priceGap,
      accountingAssetInfoVal
    );
    const queryCredit1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      accountingAssetTypeVal,
      `Sales - Asset ${accountingAssetNameVal1}`,
      priceGap * -1,
      accountingAssetInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt1, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit1, msg);
  }
  if (accountingAssetInterestVal1 > 0) {
    const accountingBalance =
      accountingAssetPriceSellVal1 * (accountingAssetInterestVal1 / 100);
    const queryDebt1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      112,
      `Receivable - ${accountingSupplierFullnameVal1}`,
      accountingBalance,
      `Interest Receivable | ${accountingAssetInfoVal}`
    );
    const queryCredit1 = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      412,
      `Interest Receivable Revenue - ${accountingSupplierFullnameVal1}`,
      accountingBalance,
      accountingAssetInfoVal
    );
    await window.ElectronAPI.sqlite3.run(queryDebt1, msg);
    await window.ElectronAPI.sqlite3.run(queryCredit1, msg);
  }

  return msg;
};
// cash-in-others
const createAccounting16 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingNameVal,
    accountingBalanceVal,
    accountingInfoVal,
  } = req;
  // all validation
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  await validateAccountingName(accountingNameVal);
  validateAccountingBalance(accountingBalanceVal);
  // convert
  const accountingNameVal1 = capitalizeWord(accountingNameVal);
  const accountingBalanceVal1 = parseFloat(accountingBalanceVal);
  const queryDebt = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    111,
    `Cash - Revenue Others ${accountingNameVal1}`,
    accountingBalanceVal1,
    accountingInfoVal
  );
  const queryCredit = queryCreate(
    accountingDateVal,
    accountingTimeVal,
    611,
    accountingNameVal1,
    accountingBalanceVal1,
    accountingInfoVal
  );
  const msg = `Accounting Receive Cash From ${accountingNameVal1} is ${formatPrice(
    accountingBalanceVal1
  )}`;
  await window.ElectronAPI.sqlite3.run(queryDebt, msg);
  await window.ElectronAPI.sqlite3.run(queryCredit, msg);
  return msg;
};
// coming soon
// etc-expense-receivable-loss || customer-failed-payment
const getAccountingPagination = async (req) => {
  const { selectedAccount, searchVal, limitVal } = req;
  const query = queryReadTotal(parseInt(selectedAccount), searchVal);
  const totalPageRow = await window.ElectronAPI.sqlite3.each(
    query,
    parseInt(limitVal)
  );
  return totalPageRow;
};
const getAccounting = async (req) => {
  const { selectedAccount, searchVal, limitVal, offsetVal } = req;
  const limitVal1 = parseInt(limitVal);
  const offsetVal1 = parseInt(offsetVal);
  const startOffsetVal = parseInt((offsetVal1 - 1) * limitVal1);
  const query = queryRead(
    parseInt(selectedAccount),
    searchVal,
    limitVal1,
    startOffsetVal
  );
  const accounting = await window.ElectronAPI.sqlite3.all(query);
  return accounting;
};

const getAccountingAsset = async () => {
  const query = queryReadAsset();
  const list = await window.ElectronAPI.sqlite3.all(query);
  return list;
};
const getAccountingCash = async () => {
  const query = queryReadCash();
  const { TotalCash } = await window.ElectronAPI.sqlite3.each1(query);
  return TotalCash;
};
// api/accounting-csv
const getAccountingDate = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  const query = queryReadDate(
    parseInt(selectedAccount),
    startDateVal,
    endDateVal
  );
  const accountingDate = await window.ElectronAPI.sqlite3.all(query);
  return accountingDate;
};
// api/accounting-pdf-cash
const getAccountingPDF = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // all
  const query1 = queryReadDate(
    parseInt(selectedAccount),
    startDateVal,
    endDateVal
  );
  const AccountingDate = await window.ElectronAPI.sqlite3.all(query1);
  // summary
  const query2 = queryReadCash1(startDateVal, endDateVal);
  const { TotalCash } = await window.ElectronAPI.sqlite3.each1(query2);
  return { AccountingDate, TotalCash };
};
// api/accounting-pdf-receivable
const getAccountingPDF1 = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // all
  const query1 = queryReadDate(
    parseInt(selectedAccount),
    startDateVal,
    endDateVal
  );
  const AccountingDate = await window.ElectronAPI.sqlite3.all(query1);
  // summary
  const query2 = queryReadReceivable(startDateVal, endDateVal);
  const { TotalReceivable } = await window.ElectronAPI.sqlite3.each1(query2);
  // group receivable
  const query3 = `
  SELECT 
  UserId, 
  UserFullname,
  UserEmail 
  FROM User
  WHERE UserPosition = 'customer' 
  ORDER BY UserFullname ASC `;
  const customer = await window.ElectronAPI.sqlite3.all(query3);
  const ReceivableList = [];
  for (const rows of customer) {
    const query4 = `
    SELECT 
    SUM(AccountingBalance) AS TotalReceivable
    FROM Accounting
    WHERE 
    AccountingName LIKE '%Receivable - ${rows.UserFullname}%' AND 
    AccountingRef = 112 AND
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalReceivable } = await window.ElectronAPI.sqlite3.each1(query4);
    if (TotalReceivable > 0) {
      const liabilityData = {
        UserId: rows.UserId,
        UserFullname: rows.UserFullname,
        UserEmail: rows.UserEmail,
        TotalReceivable,
      };
      // push to array
      ReceivableList.push(liabilityData);
    }
  }
  return { AccountingDate, TotalReceivable, ReceivableList };
};
// api/accounting-pdf-asset
const getAccountingPDF2 = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // all
  const query1 = queryReadDate(
    parseInt(selectedAccount),
    startDateVal,
    endDateVal
  );
  const AccountingDate = await window.ElectronAPI.sqlite3.all(query1);
  // summary
  const query2 = queryReadAsset1(startDateVal, endDateVal);
  const { TotalAsset } = await window.ElectronAPI.sqlite3.each1(query2);
  return { AccountingDate, TotalAsset };
};
// api/accounting-pdf-liability
const getAccountingPDF3 = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // all
  const query1 = queryReadDate(selectedAccount, startDateVal, endDateVal);
  const AccountingDate = await window.ElectronAPI.sqlite3.all(query1);
  // summary
  const query2 = queryReadLiability(startDateVal, endDateVal);
  const { TotalLiability } = await window.ElectronAPI.sqlite3.each1(query2);
  // group
  const query3 = `
  SELECT 
  UserId, 
  UserFullname,
  UserEmail 
  FROM User
  WHERE UserPosition = 'creditor' 
  ORDER BY UserFullname ASC 
  `;
  const creditor = await window.ElectronAPI.sqlite3.all(query3);
  const LiabilityList = [];
  for (const rows of creditor) {
    const query4 = `
    SELECT
    COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
    FROM 
    Accounting
    WHERE 
    AccountingName LIKE '%Liability - ${rows.UserFullname}%' AND 
    AccountingRef = 211 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalLiability } = await window.ElectronAPI.sqlite3.each1(query4);
    if (TotalLiability > 0) {
      const dataCreditor = {
        UserId: rows.UserId,
        UserFullname: rows.UserFullname,
        UserEmail: rows.UserEmail,
        TotalLiability,
      };
      // push to array
      LiabilityList.push(dataCreditor);
    }
  }
  return { AccountingDate, TotalLiability, LiabilityList };
};
// api/accounting-pdf-Equity
const getAccountingPDF4 = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // all
  const query1 = queryReadDate(selectedAccount, startDateVal, endDateVal);
  const AccountingDate = await window.ElectronAPI.sqlite3.all(query1);
  // summary
  const query2 = queryReadEquity(startDateVal, endDateVal);
  const { TotalEquity } = await window.ElectronAPI.sqlite3.each1(query2);
  // group
  const query3 = `
  SELECT 
  UserId,
  UserFullname
  FROM User
  WHERE 
  UserPosition = 'investor'
  ORDER By UserFullname ASC
  `;
  const userList = await window.ElectronAPI.sqlite3.all(query3);
  const EquityList = [];
  for (const el of userList) {
    const query5 = `
    SELECT
    SUM(AccountingBalance) AS TotalEquity1
    FROM Accounting 
    WHERE 
    AccountingRef = 311 AND 
    AccountingName LIKE '%Equity - ${el.UserFullname}%' AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalEquity1 } = await window.ElectronAPI.sqlite3.each1(query5);
    if (TotalEquity1 > 0) {
      const User = {
        UserFullname: el.UserFullname,
        TotalEquity: TotalEquity1,
        TotalPercent: `${Math.round((TotalEquity1 / TotalEquity) * 100)} %`,
      };
      EquityList.push(User);
    }
  }
  return { AccountingDate, TotalEquity, EquityList };
};
// api/accounting-pdf-sales
const getAccountingPDF5 = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // all
  const query1 = queryReadDate(
    parseInt(selectedAccount),
    startDateVal,
    endDateVal
  );
  const AccountingDate = await window.ElectronAPI.sqlite3.all(query1);
  // sales
  const query2 = queryReadSales(startDateVal, endDateVal);
  const { TotalSales } = await window.ElectronAPI.sqlite3.each1(query2);
  // return
  const query3 = queryReadSalesReturn(startDateVal, endDateVal);
  const { TotalSalesReturn } = await window.ElectronAPI.sqlite3.each1(query3);
  // discount
  const query4 = queryReadSalesDiscount(startDateVal, endDateVal);
  const { TotalSalesDiscount } = await window.ElectronAPI.sqlite3.each1(query4);
  return { AccountingDate, TotalSales, TotalSalesReturn, TotalSalesDiscount };
};
// api/accounting-pdf-purchase
const getAccountingPDF6 = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // all
  const query1 = queryReadDate(
    parseInt(selectedAccount),
    startDateVal,
    endDateVal
  );
  const AccountingDate = await window.ElectronAPI.sqlite3.all(query1);
  // purchase
  const query2 = queryReadPurchase(startDateVal, endDateVal);
  const { TotalPurchase } = await window.ElectronAPI.sqlite3.each1(query2);
  // return
  const query3 = queryReadPurchaseReturn(startDateVal, endDateVal);
  const { TotalPurchaseReturn } = await window.ElectronAPI.sqlite3.each1(
    query3
  );
  // discount
  const query4 = queryReadPurchaseDiscount(startDateVal, endDateVal);
  const { TotalPurchaseDiscount } = await window.ElectronAPI.sqlite3.each1(
    query4
  );
  return {
    AccountingDate,
    TotalPurchase,
    TotalPurchaseReturn,
    TotalPurchaseDiscount,
  };
};
// api/accounting-pdf-expense
const getAccountingPDF7 = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // all
  const query1 = queryReadDate(
    parseInt(selectedAccount),
    startDateVal,
    endDateVal
  );
  const AccountingDate = await window.ElectronAPI.sqlite3.all(query1);
  // expense
  const query2 = queryReadExpense(startDateVal, endDateVal);
  const { TotalExpense } = await window.ElectronAPI.sqlite3.each1(query2);
  return {
    AccountingDate,
    TotalExpense,
  };
};
// api/accounting-pdf-revenue-others
const getAccountingPDF8 = async (req) => {
  const { selectedAccount, startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // all
  const query1 = queryReadDate(
    parseInt(selectedAccount),
    startDateVal,
    endDateVal
  );
  const AccountingDate = await window.ElectronAPI.sqlite3.all(query1);
  // revenue
  const query2 = queryReadRevenueOthers(startDateVal, endDateVal);
  const { TotalRevenue } = await window.ElectronAPI.sqlite3.each1(query2);
  return {
    AccountingDate,
    TotalRevenue,
  };
};
// api/accounting-financial-statement
const getAccountingFinancialStatement = async () => {
  // 1.cash
  const query1 = queryReadCash();
  const { TotalCash } = await window.ElectronAPI.sqlite3.each1(query1);
  // 2.receivable
  const query2 = queryReadReceivable1();
  const { TotalReceivable } = await window.ElectronAPI.sqlite3.each1(query2);
  // 3. current-asset
  const query3 = `
  SELECT 
  AccountingName,
  COALESCE(SUM(AccountingBalance), 0) AS Total
  FROM Accounting
  WHERE
  AccountingRef = 113
  GROUP BY AccountingName
  ORDER BY AccountingRef ASC
  `;
  const CurrentAsset = await window.ElectronAPI.sqlite3.all(query3);
  const query4 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalCurrentAsset
  FROM 
  Accounting
  WHERE 
  AccountingRef = 113
  `;
  const { TotalCurrentAsset } = await window.ElectronAPI.sqlite3.each1(query4);
  // 4 . fixed-asset
  const query5 = `
  SELECT 
  AccountingName,
  COALESCE(SUM(AccountingBalance), 0) AS Total
  FROM Accounting
  WHERE
  AccountingRef = 121
  GROUP BY AccountingName
  ORDER BY AccountingName ASC
  `;
  const FixedAsset = await window.ElectronAPI.sqlite3.all(query5);
  const query6 = `
  SELECT 
  AccountingName,
  AccountingBalance
  FROM Accounting
  WHERE
  AccountingRef = 131
  GROUP BY AccountingName
  ORDER BY AccountingName ASC
  `;
  const FixedAccumulated = await window.ElectronAPI.sqlite3.all(query6);
  const query8 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalFixedAsset
  FROM 
  Accounting
  WHERE 
  AccountingRef BETWEEN 121 AND 131 
  `;
  const { TotalFixedAsset } = await window.ElectronAPI.sqlite3.each1(query8);
  const query9 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalAssets
  FROM 
  Accounting 
  WHERE
  AccountingRef BETWEEN 111 AND 131
  `;
  const { TotalAssets } = await window.ElectronAPI.sqlite3.each1(query9);
  // 5.liability
  const query10 = `
  SELECT 
  AccountingName,
  COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
  FROM Accounting
  WHERE
  AccountingRef = 211
  GROUP BY AccountingName
  ORDER BY AccountingName ASC
  `;
  const Liability = await window.ElectronAPI.sqlite3.all(query10);
  const query11 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
  FROM 
  Accounting
  WHERE 
  AccountingRef = 211
  `;
  const { TotalLiability } = await window.ElectronAPI.sqlite3.each1(query11);
  // 5.Equity
  // equitylist
  const query12 = `
  SELECT 
  AccountingName,
  COALESCE(SUM(AccountingBalance), 0) AS TotalEquity
  FROM Accounting
  WHERE
  AccountingRef = 311 AND 
  AccountingBalance > 0
  GROUP BY AccountingName
  ORDER BY AccountingName ASC `;
  const Equity = await window.ElectronAPI.sqlite3.all(query12);
  // equitywithdrawl
  const query13 = `
  SELECT 
  AccountingName,
  COALESCE(SUM(AccountingBalance), 0) AS TotalEquityWithDrawl
  FROM Accounting 
  WHERE
  AccountingRef = 311 AND 
  AccountingBalance < 0
  GROUP BY AccountingName
  ORDER BY AccountingName ASC  `;
  const EquityWithDrawl = await window.ElectronAPI.sqlite3.all(query13);
  // Total Equity
  const query14 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalEquity
  FROM 
  Accounting
  WHERE 
  AccountingRef = 311 `;
  const { TotalEquity } = await window.ElectronAPI.sqlite3.each1(query14);
  // Total Sales
  const query16 = `
  SELECT 
  AccountingName,
  COALESCE(SUM(AccountingBalance), 0) AS TotalSales
  FROM Accounting
  WHERE
  AccountingRef = 411 `;
  const { TotalSales } = await window.ElectronAPI.sqlite3.each1(query16);
  // Total Sales Return
  const query17 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalSalesReturn
  FROM 
  Accounting
  WHERE 
  AccountingRef = 412 `;
  const { TotalSalesReturn } = await window.ElectronAPI.sqlite3.each1(query17);
  // TotalSalesDiscount
  const query18 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalSalesDiscount
  FROM 
  Accounting
  WHERE 
  AccountingRef = 413 `;
  const { TotalSalesDiscount } = await window.ElectronAPI.sqlite3.each1(
    query18
  );
  // TotalSalesnet
  const TotalSalesNet = TotalSales - TotalSalesReturn - TotalSalesDiscount;
  // purchase
  // Total Purchase
  const query19 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalPurchase
  FROM 
  Accounting
  WHERE 
  AccountingRef = 511
  `;
  const { TotalPurchase } = await window.ElectronAPI.sqlite3.each1(query19);
  // Total PurchaseReturn
  const query20 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalPurchaseReturn
  FROM 
  Accounting
  WHERE 
  AccountingRef = 512
  `;
  const { TotalPurchaseReturn } = await window.ElectronAPI.sqlite3.each1(
    query20
  );
  // Total Purchase Discount
  const query21 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalPurchaseDiscount
  FROM 
  Accounting
  WHERE 
  AccountingRef = 513
  `;
  const { TotalPurchaseDiscount } = await window.ElectronAPI.sqlite3.each1(
    query21
  );
  // Total Purchase Net
  const TotalPurchaseNet =
    TotalPurchase - TotalPurchaseReturn - TotalPurchaseDiscount;
  // COGS
  const queryCOGS = `
  SELECT
  (Product.ProductPriceBuy * COALESCE(SUM(Stock.StockQty), 0)) AS StockBalance
  FROM 
  Stock
  LEFT JOIN Product ON Stock.StockProductId = Product.ProductId    
  GROUP BY Product.ProductId
  `;
  const GroupProduct = await window.ElectronAPI.sqlite3.all(queryCOGS);
  let StockRemain = 0;
  for (const el of GroupProduct) {
    StockRemain += el.StockBalance;
  }
  const COGS = TotalPurchaseNet - StockRemain;
  // GrossProfitOR Loss
  const GrossProfitOrLoss = TotalSalesNet - COGS;
  // expense
  const query22 = `
  SELECT 
  AccountingName,
  COALESCE(AccountingBalance, 0) AS Total
  FROM 
  Accounting
  WHERE 
  AccountingRef = 514
  ORDER BY AccountingName ASC
  `;
  const Expense = await window.ElectronAPI.sqlite3.all(query22);
  const query23 = `
  SELECT
  COALESCE(SUM(AccountingBalance), 0) AS TotalExpense
  FROM 
  Accounting
  WHERE
  AccountingRef = 514
  `;
  const { TotalExpense } = await window.ElectronAPI.sqlite3.each1(query23);
  // revenue others
  const query24 = `
  SELECT 
  AccountingName,
  COALESCE(AccountingBalance, 0) AS Total
  FROM 
  Accounting 
  WHERE 
  AccountingRef = 611 
  ORDER BY AccountingName ASC
  `;
  const RevenueOther = await window.ElectronAPI.sqlite3.all(query24);
  // Total Revenue
  const query25 = `
  SELECT
  COALESCE(SUM(AccountingBalance), 0) AS TotalRevenue
  FROM 
  Accounting
  WHERE
  AccountingRef = 611
  `;
  const { TotalRevenue } = await window.ElectronAPI.sqlite3.each1(query25);
  // Net Profit
  const NetProfitOrLoss = GrossProfitOrLoss - TotalExpense + TotalRevenue;
  // profit attributable to
  const ProfitAttribute = [];
  const query27 = `
  SELECT 
  UserFullname
  FROM
  User
  WHERE 
  UserPosition = "investor"
  ORDER BY UserFullname ASC
  `;
  const investorList = await window.ElectronAPI.sqlite3.all(query27);
  for (const el of investorList) {
    const query = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquityPerson
    FROM Accounting
    WHERE
    AccountingRef = 311 AND
    AccountingName LIKE "%${el.UserFullname}%" `;
    const { TotalEquityPerson } = await window.ElectronAPI.sqlite3.each1(query);
    const UserFullname = el.UserFullname;
    const TotalPercent = Math.round((TotalEquityPerson / TotalEquity) * 100);
    const ProfitAttributed = NetProfitOrLoss * (TotalPercent / 100);
    const Investor = {
      UserFullname: `${UserFullname} - ${TotalPercent} %`,
      ProfitAttributed,
    };
    ProfitAttribute.push(Investor);
  }
  // totalEquity
  const query28 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalEquity1
  FROM Accounting
  WHERE
  AccountingRef = 311 AND 
  AccountingBalance > 0 `;
  const { TotalEquity1 } = await window.ElectronAPI.sqlite3.each1(query28);
  // equitywithdrawl
  const query29 = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalEquityWithDrawl
  FROM Accounting 
  WHERE
  AccountingRef = 311 AND 
  AccountingBalance < 0  `;
  const { TotalEquityWithDrawl } = await window.ElectronAPI.sqlite3.each1(
    query29
  );
  // changes equity, assets, liability
  const TotalEquityChanges = TotalEquity + NetProfitOrLoss;
  const TotalLiabilityEquityChanges = TotalLiability + TotalEquityChanges;
  const TotalCurrentAssetChanges =
    TotalCash + TotalReceivable + TotalCurrentAsset + StockRemain;
  const TotalAssetsChanges = TotalCurrentAssetChanges + TotalFixedAsset;
  return {
    FinancialPosition: {
      Assets: {
        CurrentAssets: {
          TotalCash,
          TotalReceivable,
          CurrentAsset,
          MerchandiseInventory: StockRemain,
          TotalCurrentAssetChanges,
        },
        FixedAssets: {
          FixedAsset,
          FixedAccumulated,
          TotalFixedAsset,
        },
        TotalAssetsChanges,
      },
      LiabilityEquity: {
        Liabilities: {
          Liability,
          TotalLiability,
        },
        EquityChanges: {
          Equity,
          TotalEquity1,
          EquityWithDrawl,
          TotalEquityWithDrawl,
          TotalEquityChanges,
        },
        TotalLiabilityEquityChanges,
      },
    },
    ProfitOrLoss: {
      Sales: {
        TotalSales,
        TotalSalesReturn,
        TotalSalesDiscount,
        TotalSalesNet,
      },
      Purchase: {
        TotalPurchase,
        TotalPurchaseReturn,
        TotalPurchaseDiscount,
        TotalPurchaseNet,
      },
      COGS,
      GrossProfitOrLoss,
      Expenses: {
        Expense,
        TotalExpense,
      },
      RevenueOthers: {
        RevenueOther,
        TotalRevenue,
      },
      NetProfitOrLoss,
      ProfitAttribute,
    },
    ChangesInEquity: {
      Equity,
      TotalEquity1,
      EquityWithDrawl,
      TotalEquityWithDrawl,
      TotalEquity,
      NetProfitOrLoss,
      TotalEquityChanges,
    },
  };
};
// api/accounting-financial-statement-1
// const getAccountingDate = async (req) => {
//   const { startDateVal, endDateVal } = req;
//   // validate Date
//   validateDate(startDateVal, endDateVal);
//   const query = queryReadDate(startDateVal, endDateVal);
//   const accounting = await window.ElectronAPI.sqlite3.all(query);
//   return accounting;
// };
// const deleteAccounting = (req, res) => {
//   const { accountingIdVal } = req;
//   const query = queryDeleteAccounting(accountingIdVal);
//   db.run(query, (err) => {
//     if (!err) {
//       return res(true, "berhasil dihapus");
//     }
//     if (err) {
//       return res(false, err);
//     }
//   });
// };
export {
  createAccounting,
  createAccounting1,
  createAccounting2,
  createAccounting3,
  createAccounting4,
  createAccounting5,
  createAccounting6,
  createAccounting7,
  createAccounting8,
  createAccounting9,
  createAccounting10,
  createAccounting11,
  createAccounting12,
  createAccounting13,
  createAccounting14,
  createAccounting15,
  createAccounting16,
  createAccounting17,
  createAccounting18,
  createAccounting19,
  createAccounting20,
  createAccounting21,
  getAccounting,
  getAccountingPDF,
  getAccountingPDF1,
  getAccountingPDF2,
  getAccountingPDF3,
  getAccountingPDF4,
  getAccountingPDF5,
  getAccountingPDF6,
  getAccountingPDF7,
  getAccountingPDF8,
  getAccountingDate,
  getAccountingFinancialStatement,
  getAccountingCash,
  getAccountingAsset,
  getAccountingPagination,
};
