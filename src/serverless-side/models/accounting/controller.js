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
  validateAccountingName,
  validateAssetName,
  validateAssetName1,
  validateAssetValueUse,
  validateAssetPrice,
  validateCash,
  validateDate,
  validateExisted,
  validateExpenseName,
  validateDateAndTime,
  validateInvestorName,
  validateInvestorBalance,
  validateLiabilityBalance,
  validateLiabilityName,
  validateReceivableBalance,
  validateReceivableName,
} from "../../utils/validation.js";
// import { createStock } from "../stock/controller.js";
import {
  executeCreate,
  executeCreate1,
  executeGet,
  executeGet1,
  executeGet2,
  executeGet3,
  executeGet4,
} from "../../database/runQuery.js";
import AccountingSchema from "./schema.js";
import { createStock } from "../../utils/etc.js";

const Accounting = (ipcMain, db) => {
  // init db accounting
  const initAccounting = async () => {
    await executeCreate(db, AccountingSchema);
  };
  initAccounting();
  // cash-in-investment
  ipcMain.handle("createAccounting", async (_, req) => {
    const {
      accountingDateVal,
      accountingTimeVal,
      accountingInvestorNameVal,
      accountingInvestorEmailVal,
      accountingBalanceVal,
      accountingInfoVal,
    } = req;
    // convert
    const accountingInvestorNameVal1 = capitalizeWord(
      accountingInvestorNameVal
    );
    const accountingBalanceVal1 = parseFloat(accountingBalanceVal);
    const accountingInfoVal1 = `Invest with Cash | ${accountingInfoVal}`;
    // 1.validate date and time,investorName,balancemustINT
    validateDateAndTime(accountingDateVal, accountingTimeVal);
    validateInvestorName(accountingInvestorNameVal);
    validateAccountingBalance(accountingBalanceVal);
    // 4.sendPDFGMAIL(accountingInvestorEmailVal) || Coming SOON
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    const msg = `Accounting - Investment ${accountingInvestorNameVal1} with Total Cash ${formatPrice(
      accountingBalanceVal1
    )} has been added`;
    return msg;
  });
  // cash-out-asset-buy
  ipcMain.handle("createAccounting1", async (_, req) => {
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
    validateAccountingBalance(accountingAssetPriceVal);
    await validateAssetName(db, capitalizeWord(accountingAssetNameVal));
    await validateCash(db, accountingAssetPriceVal);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    const msg = `Accounting - Payment ${capitalizeWord(
      accountingAssetNameVal
    )} with price ${formatPrice(accountingAssetPriceVal)} has been added`;
    return msg;
  });
  // cash-out-product-buy
  ipcMain.handle("createAccounting2", async (_, req) => {
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
    await validateCash(db, accountingBalanceTotalVal);
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
    } Has Been Done ${
      accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""
    }`;
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
    await createStock(db, data);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    }
    const msg = `Accounting Payment Product - ${accountingProductNameVal1} Has Been Done`;
    return msg;
  });
  // cash-out-expense-buy
  ipcMain.handle("createAccounting3", async (_, req) => {
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
    await validateExpenseName(db, accountingExpenseNameVal);
    validateAccountingBalance(accountingExpensePriceVal1);
    await validateCash(db, accountingExpensePriceVal1);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    const msg = `Accounting - Payment ${accountingExpenseNameVal1} with price ${formatPrice(
      accountingExpensePriceVal1
    )} has been added`;
    return msg;
  });
  // cash-in-product-sale
  ipcMain.handle("createAccounting4", async (_, req) => {
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
    const accountingProductNameVal1 =
      capitalizeWord(accountingProductNameVal) || "";
    const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
    const accountingProductDiscountVal1 = parseFloat(
      accountingProductDiscountVal
    );
    const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
    const accountingCustomerNameVal1 =
      capitalizeWord(accountingCustomerNameVal) || "";
    const accountingSaleNameVal1 = capitalizeWord(accountingSaleNameVal) || "";
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
    await createStock(db, data);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    }
    const msg = `${accountingProductNameVal1} Has Been Sold with Total Qty : ${accountingProductQtyVal1} ${
      accountingProductDiscountVal1 > 0
        ? `And Sales Discount : ${accountingProductDiscountVal1}%`
        : ""
    } ${accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""}`;
    return msg;
  });
  // etc-product-sale-credit
  ipcMain.handle("createAccounting5", async (_, req) => {
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
    validateReceivableName(accountingCustomerNameVal);
    // convert
    const accountingProductIdVal1 = parseInt(accountingProductIdVal);
    const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
    const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
    const accountingProductInterestVal1 = parseFloat(
      accountingProductInterestVal
    );
    const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
    const accountingCustomerNameVal1 = capitalizeWord(
      accountingCustomerNameVal
    );
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
    await createStock(db, data);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    }
    const msg = `${accountingProductNameVal1} Has Been Sold with Total Qty : ${accountingProductQtyVal1} ${
      accountingProductInterestVal1 > 0
        ? `with interest ${accountingProductInterestVal1}%`
        : ""
    } ${accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""}`;
    return msg;
  });
  // cash-in-liability
  ipcMain.handle("createAccounting6", async (_, req) => {
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

    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    // with interest
    if (accountingLiabilityInterestVal1 > 0) {
      const interestBalance =
        accountingBalanceTotalVal1 * (accountingLiabilityInterestVal1 / 100);
      const queryDebt1 = queryCreate(
        accountingDateVal,
        accountingTimeVal,
        514,
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
      await executeCreate(db, queryDebt1);
      await executeCreate(db, queryCredit1);
    }
    const msg = `Accounting Liabilty - ${accountingLiabilityNameVal1} : ${formatPrice(
      accountingBalanceTotalVal1
    )} ${
      accountingLiabilityInterestVal1 > 0
        ? `with Interest ${accountingLiabilityInterestVal1}%`
        : ""
    } has been added`;
    return msg;
  });
  // cash-out-liability
  ipcMain.handle("createAccounting7", async (_, req) => {
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
    await validateCash(db, accountingBalanceTotalVal);
    await validateLiabilityBalance(
      db,
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    const msg = `Accounting Payment Liability - ${accountingLiabilityNameVal1} : ${formatPrice(
      accountingBalanceTotalVal1
    )} has been added `;
    return msg;
  });
  // cash-in-receivable
  ipcMain.handle("createAccounting8", async (_, req) => {
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
      db,
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

    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    const msg = `Accounting Receivable ${capitalizeWord(
      accountingReceivableNameVal
    )} with cash ${formatPrice(accountingBalanceTotalVal1)}`;
    return msg;
  });
  // cash-out-return-product-sale
  ipcMain.handle("createAccounting9", async (_, req) => {
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
    const accountingCustomerNameVal1 = capitalizeWord(
      accountingCustomerNameVal
    );
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
    await createStock(db, data);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    }
    const msg = `Sales Return ${accountingProductNameVal1} Has Been Done with Total Qty : ${accountingProductQtyVal1} ${
      accountingProductDiscountVal1 > 0
        ? `with discount ${accountingProductDiscountVal1} %`
        : ""
    } ${accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""}`;
    return msg;
  });
  //  etc-investment-asset
  ipcMain.handle("createAccounting10", async (_, req) => {
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
    // 1. validate date and time, assetName, investorName, balance
    validateDateAndTime(accountingDateVal, accountingTimeVal);
    await validateAssetName(db, capitalizeWord(accountingAssetNameVal));
    validateInvestorName(accountingInvestorNameVal);
    validateAccountingBalance(accountingAssetPriceVal);
    // 2. sendToInvestor(accountingInvestorEmail)
    // 3. convert
    const accountingAssetNameVal1 = capitalizeWord(accountingAssetNameVal);
    const accountingInvestorNameVal1 = capitalizeWord(
      accountingInvestorNameVal
    );
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    const msg = `Accounting Investment - ${accountingInvestorNameVal1} with ${accountingAssetNameVal1} has been added`;
    return msg;
  });
  // etc-product-buy-credit
  ipcMain.handle("createAccounting11", async (_, req) => {
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
    const accountingSupplierNameVal1 = capitalizeWord(
      accountingSupplierNameVal
    );
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
    await createStock(db, data);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    }
    const msg = `Purchase - ${accountingProductNameVal1} Total Qty : ${accountingProductQtyVal1} ${
      accountingProductInterestVal1 > 0
        ? `with interest ${accountingProductInterestVal1}%`
        : ""
    }`;
    return msg;
  });
  // etc-return-product-buy-credit
  ipcMain.handle("createAccounting12", async (_, req) => {
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
    const accountingSupplierNameVal1 = capitalizeWord(
      accountingSupplierNameVal
    );
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
    await createStock(db, data);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    }
    const msg = `Purchase Return - ${accountingProductNameVal1} Total Qty : ${accountingProductQtyVal1} ${
      accountingProductInterestVal > 0
        ? `with interest ${accountingProductInterestVal1} %`
        : ""
    }`;
    return msg;
  });
  // cash-in-return-product-buy
  ipcMain.handle("createAccounting13", async (_, req) => {
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
    await createStock(db, data);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    }
    const msg = `Purchase Return - ${accountingProductNameVal1} Total Qty : ${accountingProductQtyVal1} ${
      accountingProductDiscountVal > 0
        ? `with discount ${accountingProductDiscountVal1} %`
        : ""
    } ${accountingInfoVal !== "" ? `| ${accountingInfoVal}` : ""}`;
    return msg;
  });
  // etc-accumulation-asset
  ipcMain.handle("createAccounting14", async (_, req) => {
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    } else {
      const queryDebt = queryCreate(
        accountingDateVal,
        accountingTimeVal,
        514,
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    }
    const msg = `Accounting Accumulation Deprecated - ${accountingAssetNameVal1} : ${formatPrice(
      accountingAssetValueUse1
    )}`;
    return msg;
  });
  // cash-in-asset-sell || cash-in-return-asset ||
  ipcMain.handle("createAccounting15", async (_, req) => {
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
    const accountingAssetPriceSellVal1 = parseFloat(
      accountingAssetPriceSellVal
    );
    // 5. db.accounting
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
      const priceGap =
        accountingAssetPriceSellVal1 - accountingAssetPriceBuyVal;
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
        611,
        `Revenue Sales Asset ${accountingAssetNameVal1}`,
        priceGap,
        accountingInfoVal
      );
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
      await executeCreate(db, queryDebt1);
      await executeCreate(db, queryCredit1);
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
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
      const priceGap =
        accountingAssetPriceBuyVal1 - accountingAssetPriceSellVal1;
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
      await executeCreate(db, queryDebt1);
      await executeCreate(db, queryCredit1);
    }
    const msg = `Accounting Payment ${accountingAssetNameVal1} with Total Cash : ${formatPrice(
      accountingAssetPriceSellVal1
    )} `;
    return msg;
  });
  // cash-in-others
  ipcMain.handle("createAccounting16", async (_, req) => {
    const {
      accountingDateVal,
      accountingTimeVal,
      accountingNameVal,
      accountingBalanceVal,
      accountingInfoVal,
    } = req;
    // all validation
    validateDateAndTime(accountingDateVal, accountingTimeVal);
    await validateAccountingName(db, accountingNameVal);
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    const msg = `Accounting Receive Cash From ${accountingNameVal1} is ${formatPrice(
      accountingBalanceVal1
    )}`;
    return msg;
  });
  // cash-out-withdrawl-investment
  ipcMain.handle("createAccounting17", async (_, req) => {
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
      db,
      accountingInvestorNameVal,
      accountingBalanceVal * -1
    );
    await validateCash(db, accountingBalanceVal * -1);
    // 2. sendGmail(accountingInvestorEmail)
    const queryDebt = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      311,
      `Withdrawal Equity - ${accountingInvestorNameVal}`,
      accountingBalanceVal * -1,
      `Invest with Cash | ${accountingInfoVal}`
    );
    const queryCredit = queryCreate(
      accountingDateVal,
      accountingTimeVal,
      111,
      `Cash - Withdrawal Equity ${accountingInvestorNameVal}`,
      accountingBalanceVal * -1,
      `Invest with Cash | ${accountingInfoVal}`
    );
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    const msg = `Accounting Withdrawl Investor - ${capitalizeWord(
      accountingInvestorNameVal
    )} with balance : ${formatPrice(accountingBalanceVal)} has been added`;
    return msg;
  });
  // etc-asset-buy-credit
  ipcMain.handle("createAccounting18", async (_, req) => {
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
    await validateAssetName(db, capitalizeWord(accountingAssetNameVal));
    // 2.sendPDFGmail(accountingUserEmailVal)
    // 3.convert
    const accountingAssetNameVal1 = capitalizeWord(accountingAssetNameVal);
    const accountingAssetTypeVal1 = parseFloat(accountingAssetTypeVal);
    const accountingAssetPriceVal1 = parseFloat(accountingAssetPriceVal);
    const accountingAssetInterestVal1 = parseFloat(accountingAssetInterestVal);
    const accountingUserFullnameVal1 = capitalizeWord(
      accountingUserFullnameVal
    );
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

    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
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
      await executeCreate(db, queryDebt1);
      await executeCreate(db, queryCredit1);
    }
    const msg = `Accounting Purchase ${accountingAssetNameVal} with Total Credit : ${formatPrice(
      accountingAssetPriceVal1
    )} `;
    return msg;
  });
  // etc-return-product-sale-credit
  ipcMain.handle("createAccounting19", async (_, req) => {
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
    // convert
    const accountingProductIdVal1 = parseInt(accountingProductIdVal);
    const accountingProductNameVal1 = capitalizeWord(accountingProductNameVal);
    const accountingProductQtyVal1 = parseFloat(accountingProductQtyVal);
    const accountingProductInterestVal1 = parseFloat(
      accountingProductInterestVal
    );
    const accountingBalanceTotalVal1 = parseFloat(accountingBalanceTotalVal);
    const accountingCustomerNameVal1 = capitalizeWord(
      accountingCustomerNameVal
    );
    const accountingSaleNameVal1 = capitalizeWord(accountingSaleNameVal);
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
    await createStock(db, data);
    // 3. sendTOPDF(accountingCustomerEmailVal)
    // 4. create to table accounting
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
      112,
      `Receivable - ${accountingCustomerNameVal1}`,
      accountingBalanceTotalVal1 * -1,
      accountingInfoVal1
    );
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
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
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
    }
    const msg = `Sales Return Credit ${accountingProductNameVal1} Has Been Done with Total Qty : ${accountingProductQtyVal1} `;
    return msg;
  });
  // etc-withdrawl-investment-asset
  ipcMain.handle("createAccounting20", async (_, req) => {
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
    await validateInvestorBalance(
      db,
      accountingInvestorNameVal,
      accountingAssetPriceVal * -1
    );
    //2. convert all
    const accountingInvestorNameVal1 = capitalizeWord(
      accountingInvestorNameVal
    );
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
    await executeCreate(db, queryDebt);
    await executeCreate(db, queryCredit);
    const msg = `Accounting Withdraw Investment - ${accountingAssetNameVal1} with ${formatPrice(
      accountingAssetPriceVal1
    )} has been added`;
    return msg;
  });
  // etc-asset-sell-credit
  ipcMain.handle("createAccounting21", async (_, req) => {
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
    const accountingAssetPriceSellVal1 = parseFloat(
      accountingAssetPriceSellVal
    );
    const accountingAssetBalanceVal1 = parseFloat(accountingAssetBalanceVal);
    const accountingSupplierFullnameVal1 = capitalizeWord(
      accountingSupplierFullnameVal
    );
    const accountingAssetInterestVal1 = parseFloat(accountingAssetInterestVal);
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
        accountingAssetNameVal1,
        accountingAssetBalanceVal1 * -1,
        accountingAssetInfoVal
      );
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
      // there's is gap price
      const priceGap =
        accountingAssetPriceSellVal1 - accountingAssetBalanceVal1;
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
        611,
        `Revenue Receivable - ${accountingSupplierFullnameVal1}`,
        priceGap,
        accountingAssetInfoVal
      );
      await executeCreate(db, queryDebt1);
      await executeCreate(db, queryCredit1);
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
        accountingAssetNameVal1,
        accountingAssetBalanceVal1 * -1,
        accountingAssetInfoVal
      );
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
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
        accountingAssetNameVal1,
        accountingAssetPriceSellVal1 * -1,
        accountingAssetInfoVal
      );
      await executeCreate(db, queryDebt);
      await executeCreate(db, queryCredit);
      // it's price gap
      const priceGap =
        accountingAssetBalanceVal1 - accountingAssetPriceSellVal1;
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
        accountingAssetNameVal1,
        priceGap * -1,
        accountingAssetInfoVal
      );
      await executeCreate(db, queryDebt1);
      await executeCreate(db, queryCredit1);
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
        611,
        `Interest Receivable Revenue - ${accountingSupplierFullnameVal1}`,
        accountingBalance,
        accountingAssetInfoVal
      );
      await executeCreate(db, queryDebt1);
      await executeCreate(db, queryCredit1);
    }
    const msg = `Accounting Sale Credit ${accountingAssetNameVal1} with balance ${formatPrice(
      accountingAssetPriceSellVal1
    )}`;
    return msg;
  });
  // pagination
  ipcMain.handle("paginationAccounting", async (_, req) => {
    const { selectedAccount, searchVal, limitVal } = req;
    const limitVal1 = parseInt(limitVal);
    const selectedAccount1 = parseInt(selectedAccount);
    const query = queryReadTotal(selectedAccount1, searchVal);
    const totalPageRow = await executeGet1(db, query, limitVal1);
    return totalPageRow;
  });
  // get-accounting
  ipcMain.handle("getAccounting", async (_, req) => {
    const { selectedAccount, searchVal, limitVal, offsetVal } = req;
    const selectedAccount1 = parseInt(selectedAccount);
    const limitVal1 = parseInt(limitVal);
    const offsetVal1 = parseInt(offsetVal);
    const startOffsetVal = parseInt((offsetVal1 - 1) * limitVal1);
    const query = queryRead(
      selectedAccount1,
      searchVal,
      limitVal1,
      startOffsetVal
    );
    const accounting = await executeGet(db, query);
    return accounting;
  });
  ipcMain.handle("getAsset", async () => {
    const query = queryReadAsset();
    const list = await executeGet(db, query);
    return list;
  });
  ipcMain.handle("getCash", async () => {
    const query = queryReadCash();
    const { TotalCash } = await executeGet2(db, query);
    return TotalCash;
  });
  // api/accounting-csv
  ipcMain.handle("getAccountingCSV", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    const query = queryReadDate(
      parseInt(selectedAccount),
      startDateVal,
      endDateVal
    );
    const accountingDate = await executeGet(db, query);
    validateExisted(accountingDate, "Accounting");
    return accountingDate;
  });
  // api/accounting-pdf-cash
  ipcMain.handle("getAccountingPDF", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    // all
    const query1 = queryReadDate(
      parseInt(selectedAccount),
      startDateVal,
      endDateVal
    );
    const AccountingDate = await executeGet(db, query1);
    validateExisted(AccountingDate, "Cash");
    // summary
    const query2 = queryReadCash1(startDateVal, endDateVal);
    const { TotalCash } = await executeGet2(db, query2);
    return { AccountingDate, TotalCash };
  });
  // api/accounting-pdf-receivable
  ipcMain.handle("getAccountingPDF1", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    // all
    const query1 = queryReadDate(
      parseInt(selectedAccount),
      startDateVal,
      endDateVal
    );
    const AccountingDate = await executeGet(db, query1);
    validateExisted(AccountingDate, "Receivable");
    // summary
    const query2 = queryReadReceivable(startDateVal, endDateVal);
    const { TotalReceivable } = await executeGet2(db, query2);
    // group receivable
    const query3 = `
    SELECT 
    UserId, 
    UserFullname,
    UserEmail 
    FROM User
    WHERE UserPosition = 'customer' 
    ORDER BY UserFullname ASC `;
    const customer = await executeGet(db, query3);
    const ReceivableList = [];
    for (const rows of customer) {
      const query4 = `
      SELECT 
      SUM(AccountingBalance) AS TotalReceivable
      FROM Accounting
      WHERE 
      AccountingName = "Receivable - ${rows.UserFullname}" AND 
      AccountingRef = 112 AND
      AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
      `;
      const { TotalReceivable } = await executeGet2(db, query4);
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
  });
  // api/accounting-pdf-asset
  ipcMain.handle("getAccountingPDF2", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    // all
    const query1 = queryReadDate(
      parseInt(selectedAccount),
      startDateVal,
      endDateVal
    );
    const AccountingDate = await executeGet(db, query1);
    validateExisted(AccountingDate, "Assets");
    // summary
    const query2 = queryReadAsset1(startDateVal, endDateVal);
    const { TotalAsset } = await executeGet2(db, query2);
    return { AccountingDate, TotalAsset };
  });
  // api/accounting-pdf-liability
  ipcMain.handle("getAccountingPDF3", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    // all
    const query1 = queryReadDate(selectedAccount, startDateVal, endDateVal);
    const AccountingDate = await executeGet(db, query1);
    validateExisted(AccountingDate, "Liability");
    // summary
    const query2 = queryReadLiability(startDateVal, endDateVal);
    const { TotalLiability } = await executeGet2(db, query2);
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
    const creditor = await executeGet(db, query3);
    const LiabilityList = [];
    for (const rows of creditor) {
      const query4 = `
      SELECT
      COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
      FROM 
      Accounting
      WHERE 
      AccountingName = "Liability - ${rows.UserFullname}" AND 
      AccountingRef = 211 AND 
      AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
      `;
      const { TotalLiability } = await executeGet2(db, query4);
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
  });
  // api/accounting-pdf-Equity
  ipcMain.handle("getAccountingPDF4", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    // all
    const query1 = queryReadDate(selectedAccount, startDateVal, endDateVal);
    const AccountingDate = await executeGet(db, query1);
    validateExisted(AccountingDate, "Equity");
    // summary
    const query2 = queryReadEquity(startDateVal, endDateVal);
    const { TotalEquity } = await executeGet2(db, query2);
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
    const userList = await executeGet(db, query3);
    const EquityList = [];
    for (const el of userList) {
      const query5 = `
      SELECT
      SUM(AccountingBalance) AS TotalEquity1
      FROM Accounting 
      WHERE 
      AccountingRef = 311 AND 
      AccountingName = "Equity - ${el.UserFullname}" AND 
      AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
      `;
      const { TotalEquity1 } = await executeGet2(db, query5);
      if (TotalEquity1 > 0) {
        const User = {
          UserFullname: el.UserFullname,
          TotalEquity: TotalEquity1,
          TotalPercent: `${(TotalEquity1 / TotalEquity).toFixed(2) * 100} %`,
        };
        EquityList.push(User);
      }
    }
    return { AccountingDate, TotalEquity, EquityList };
  });
  // api/accounting-pdf-sales
  ipcMain.handle("getAccountingPDF5", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    // all
    const query1 = queryReadDate(
      parseInt(selectedAccount),
      startDateVal,
      endDateVal
    );
    const AccountingDate = await executeGet(db, query1);
    validateExisted(AccountingDate, "Sales");
    // sales
    const query2 = queryReadSales(startDateVal, endDateVal);
    const { TotalSales } = await executeGet2(db, query2);
    // return
    const query3 = queryReadSalesReturn(startDateVal, endDateVal);
    const { TotalSalesReturn } = await executeGet2(db, query3);
    // discount
    const query4 = queryReadSalesDiscount(startDateVal, endDateVal);
    const { TotalSalesDiscount } = await executeGet2(db, query4);
    return { AccountingDate, TotalSales, TotalSalesReturn, TotalSalesDiscount };
  });
  // api/accounting-pdf-purchase
  ipcMain.handle("getAccountingPDF6", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    // all
    const query1 = queryReadDate(
      parseInt(selectedAccount),
      startDateVal,
      endDateVal
    );
    const AccountingDate = await executeGet(db, query1);
    validateExisted(AccountingDate, "Purchase");
    // purchase
    const query2 = queryReadPurchase(startDateVal, endDateVal);
    const { TotalPurchase } = await executeGet2(db, query2);
    // return
    const query3 = queryReadPurchaseReturn(startDateVal, endDateVal);
    const { TotalPurchaseReturn } = await executeGet2(db, query3);
    // discount
    const query4 = queryReadPurchaseDiscount(startDateVal, endDateVal);
    const { TotalPurchaseDiscount } = await executeGet2(db, query4);
    return {
      AccountingDate,
      TotalPurchase,
      TotalPurchaseReturn,
      TotalPurchaseDiscount,
    };
  });
  // api/accounting-pdf-expense
  ipcMain.handle("getAccountingPDF7", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    // all
    const query1 = queryReadDate(
      parseInt(selectedAccount),
      startDateVal,
      endDateVal
    );
    const AccountingDate = await executeGet(db, query1);
    validateExisted(AccountingDate, "Expense");
    // expense
    const query2 = queryReadExpense(startDateVal, endDateVal);
    const { TotalExpense } = await executeGet2(db, query2);
    return {
      AccountingDate,
      TotalExpense,
    };
  });
  // api/accounting-pdf-revenue-others
  ipcMain.handle("getAccountingPDF8", async (_, req) => {
    const { selectedAccount, startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    // all
    const query1 = queryReadDate(
      parseInt(selectedAccount),
      startDateVal,
      endDateVal
    );
    const AccountingDate = await executeGet(db, query1);
    validateExisted(AccountingDate, "Revenue");
    // revenue
    const query2 = queryReadRevenueOthers(startDateVal, endDateVal);
    const { TotalRevenue } = await executeGet2(db, query2);
    return {
      AccountingDate,
      TotalRevenue,
    };
  });
  // api/accounting-financial-statement
  ipcMain.handle("financialStatement", async () => {
    const query = `
    SELECT 
    COUNT(*) AS TotalRow 
    FROM Accounting
    `;
    const { TotalRow } = await executeGet2(db, query);
    if (TotalRow < 1) {
      return {
        TotalRow: 0,
        FinancialPosition: {},
        ChangesInEquity: {},
        ProfitOrLoss: {},
      };
    }
    // 1.cash
    const query1 = queryReadCash();
    const { TotalCash } = await executeGet2(db, query1);
    // 2.receivable
    const query2 = queryReadReceivable1();
    const { TotalReceivable } = await executeGet2(db, query2);
    // 3.current-asset
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
    const CurrentAsset = await executeGet(db, query3);
    const query4 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalCurrentAsset
    FROM 
    Accounting
    WHERE 
    AccountingRef = 113
    `;
    const { TotalCurrentAsset } = await executeGet2(db, query4);
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
    const FixedAsset = await executeGet(db, query5);
    const query6 = `
    SELECT 
    AccountingName,
    COALESCE(SUM(AccountingBalance), 0) AS Total
    FROM Accounting
    WHERE
    AccountingRef = 131
    GROUP BY AccountingName
    ORDER BY AccountingName ASC
    `;
    const FixedAccumulated = await executeGet(db, query6);
    const query8 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalFixedAsset
    FROM 
    Accounting
    WHERE 
    AccountingRef BETWEEN 121 AND 131 
    `;
    const { TotalFixedAsset } = await executeGet2(db, query8);
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
    const Liability = await executeGet(db, query10);
    const query11 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
    FROM 
    Accounting
    WHERE 
    AccountingRef = 211
    `;
    const { TotalLiability } = await executeGet2(db, query11);
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
    const Equity = await executeGet(db, query12);
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
    const EquityWithDrawl = await executeGet(db, query13);
    // Total Equity
    const query14 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquity
    FROM 
    Accounting
    WHERE 
    AccountingRef = 311 `;
    const { TotalEquity } = await executeGet2(db, query14);
    // Total Sales
    const query16 = `
    SELECT 
    AccountingName,
    COALESCE(SUM(AccountingBalance), 0) AS TotalSales
    FROM Accounting
    WHERE
    AccountingRef = 411 `;
    const { TotalSales } = await executeGet2(db, query16);
    // Total Sales Return
    const query17 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalSalesReturn
    FROM 
    Accounting
    WHERE 
    AccountingRef = 412 `;
    const { TotalSalesReturn } = await executeGet2(db, query17);
    // TotalSalesDiscount
    const query18 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalSalesDiscount
    FROM 
    Accounting
    WHERE 
    AccountingRef = 413 `;
    const { TotalSalesDiscount } = await executeGet2(db, query18);
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
    const { TotalPurchase } = await executeGet2(db, query19);
    // Total PurchaseReturn
    const query20 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalPurchaseReturn
    FROM 
    Accounting
    WHERE 
    AccountingRef = 512
    `;
    const { TotalPurchaseReturn } = await executeGet2(db, query20);
    // Total Purchase Discount
    const query21 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalPurchaseDiscount
    FROM 
    Accounting
    WHERE 
    AccountingRef = 513
    `;
    const { TotalPurchaseDiscount } = await executeGet2(db, query21);
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
    const GroupProduct = await executeGet(db, queryCOGS);
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
    const Expense = await executeGet(db, query22);
    const query23 = `
    SELECT
    COALESCE(SUM(AccountingBalance), 0) AS TotalExpense
    FROM 
    Accounting
    WHERE
    AccountingRef = 514
    `;
    const { TotalExpense } = await executeGet2(db, query23);
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
    const RevenueOther = await executeGet(db, query24);
    // Total Revenue
    const query25 = `
    SELECT
    COALESCE(SUM(AccountingBalance), 0) AS TotalRevenue
    FROM 
    Accounting
    WHERE
    AccountingRef = 611
    `;
    const { TotalRevenue } = await executeGet2(db, query25);
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
    const investorList = await executeGet(db, query27);
    for (const el of investorList) {
      const query = `
      SELECT 
      COALESCE(SUM(AccountingBalance), 0) AS TotalEquityPerson
      FROM Accounting
      WHERE
      AccountingRef = 311 AND
      AccountingName = "Equity - ${el.UserFullname}" OR 
      AccountingName = "Withdrawal Equity - ${el.UserFullname}"`;
      const { TotalEquityPerson } = await executeGet2(db, query);
      const UserFullname = el.UserFullname;
      const TotalPercent = TotalEquityPerson / TotalEquity || 0;
      const ProfitAttributed = NetProfitOrLoss * TotalPercent || 0;
      const Investor = {
        UserFullname: `${UserFullname} - ${TotalPercent.toFixed(2) * 100} %`,
        ProfitAttributed,
        TotalPercent,
      };
      ProfitAttribute.push(Investor);
      ProfitAttribute.sort((a, b) => b.TotalPercent - a.TotalPercent);
    }
    // totalEquity
    const query28 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquity1
    FROM Accounting
    WHERE
    AccountingRef = 311 AND 
    AccountingBalance > 0 `;
    const { TotalEquity1 } = await executeGet2(db, query28);
    // equitywithdrawl
    const query29 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquityWithDrawl
    FROM Accounting 
    WHERE
    AccountingRef = 311 AND 
    AccountingBalance < 0  `;
    const { TotalEquityWithDrawl } = await executeGet2(db, query29);
    // changes equity, assets, liability
    const TotalEquityChanges = TotalEquity + NetProfitOrLoss;
    const TotalLiabilityEquityChanges = TotalLiability + TotalEquityChanges;
    const TotalCurrentAssetChanges =
      TotalCash + TotalReceivable + TotalCurrentAsset + StockRemain;
    const TotalAssetsChanges = TotalCurrentAssetChanges + TotalFixedAsset;
    return {
      TotalRow,
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
        StockRemain,
        COGS: COGS,
        GrossProfitOrLoss,
        Expenses: {
          Expense,
          TotalExpense: TotalExpense,
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
        NetProfitOrLoss,
        TotalEquityChanges,
      },
    };
  });
  // api/accounting-financial-statement-1
  ipcMain.handle("financialStatement1", async (_, req) => {
    const { startDateVal, endDateVal } = req;
    validateDate(startDateVal, endDateVal);
    const query = `
    SELECT 
    *
    FROM Accounting
    WHERE 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const Accounting = await executeGet(db, query);
    validateExisted(Accounting, "Accounting");
    // 1.cash
    const query1 = queryReadCash1(startDateVal, endDateVal);
    const { TotalCash } = await executeGet2(db, query1);
    // 2.receivable
    const query2 = queryReadReceivable(startDateVal, endDateVal);
    const { TotalReceivable } = await executeGet2(db, query2);
    // 3.current-asset
    const query3 = `
    SELECT 
    AccountingName,
    COALESCE(SUM(AccountingBalance), 0) AS Total
    FROM Accounting
    WHERE
    AccountingRef = 113 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    GROUP BY AccountingName
    ORDER BY AccountingRef ASC
    `;
    const CurrentAsset = await executeGet(db, query3);
    const query4 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalCurrentAsset
    FROM 
    Accounting
    WHERE 
    AccountingRef = 113 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalCurrentAsset } = await executeGet2(db, query4);
    // 4 . fixed-asset
    const query5 = `
    SELECT 
    AccountingName,
    COALESCE(SUM(AccountingBalance), 0) AS Total
    FROM Accounting
    WHERE
    AccountingRef = 121 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    GROUP BY AccountingName
    ORDER BY AccountingName ASC
    `;
    const FixedAsset = await executeGet(db, query5);
    const query6 = `
    SELECT 
    AccountingName,
    COALESCE(SUM(AccountingBalance), 0) AS Total
    FROM Accounting
    WHERE
    AccountingRef = 131 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    GROUP BY AccountingName
    ORDER BY AccountingName ASC
    `;
    const FixedAccumulated = await executeGet(db, query6);
    const query8 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalFixedAsset
    FROM 
    Accounting
    WHERE 
    AccountingRef BETWEEN 121 AND 131 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalFixedAsset } = await executeGet2(db, query8);
    // 5.liability
    const query10 = `
    SELECT 
    AccountingName,
    COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
    FROM Accounting
    WHERE
    AccountingRef = 211 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    GROUP BY AccountingName
    ORDER BY AccountingName ASC
    `;
    const Liability = await executeGet(db, query10);
    const query11 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
    FROM 
    Accounting
    WHERE 
    AccountingRef = 211 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalLiability } = await executeGet2(db, query11);
    // 5.Equity
    // equitylist
    const query12 = `
    SELECT 
    AccountingName,
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquity
    FROM Accounting
    WHERE
    AccountingRef = 311 AND 
    AccountingBalance > 0 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    GROUP BY AccountingName
    ORDER BY AccountingName ASC `;
    const Equity = await executeGet(db, query12);
    // equitywithdrawl
    const query13 = `
    SELECT 
    AccountingName,
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquityWithDrawl
    FROM Accounting 
    WHERE
    AccountingRef = 311 AND 
    AccountingBalance < 0 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    GROUP BY AccountingName
    ORDER BY AccountingName ASC  `;
    const EquityWithDrawl = await executeGet(db, query13);
    // Total Equity
    const query14 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquity
    FROM 
    Accounting
    WHERE 
    AccountingRef = 311 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"`;
    const { TotalEquity } = await executeGet2(db, query14);
    // Total Sales
    const query16 = `
    SELECT 
    AccountingName,
    COALESCE(SUM(AccountingBalance), 0) AS TotalSales
    FROM Accounting
    WHERE
    AccountingRef = 411 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"`;
    const { TotalSales } = await executeGet2(db, query16);
    // Total Sales Return
    const query17 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalSalesReturn
    FROM 
    Accounting
    WHERE 
    AccountingRef = 412 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"`;
    const { TotalSalesReturn } = await executeGet2(db, query17);
    // TotalSalesDiscount
    const query18 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalSalesDiscount
    FROM 
    Accounting
    WHERE 
    AccountingRef = 413 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"`;
    const { TotalSalesDiscount } = await executeGet2(db, query18);
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
    AccountingRef = 511 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalPurchase } = await executeGet2(db, query19);
    // Total PurchaseReturn
    const query20 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalPurchaseReturn
    FROM 
    Accounting
    WHERE 
    AccountingRef = 512 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalPurchaseReturn } = await executeGet2(db, query20);
    // Total Purchase Discount
    const query21 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalPurchaseDiscount
    FROM 
    Accounting
    WHERE 
    AccountingRef = 513 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalPurchaseDiscount } = await executeGet2(db, query21);
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
    WHERE Stock.StockDate BETWEEN "${startDateVal}" AND "${endDateVal}"   
    GROUP BY Product.ProductId
    `;
    const GroupProduct = await executeGet(db, queryCOGS);
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
    AccountingRef = 514 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    ORDER BY AccountingName ASC
    `;
    const Expense = await executeGet(db, query22);
    const query23 = `
    SELECT
    COALESCE(SUM(AccountingBalance), 0) AS TotalExpense
    FROM 
    Accounting
    WHERE
    AccountingRef = 514 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalExpense } = await executeGet2(db, query23);
    // revenue others
    const query24 = `
    SELECT 
    AccountingName,
    COALESCE(AccountingBalance, 0) AS Total
    FROM 
    Accounting 
    WHERE 
    AccountingRef = 611 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    ORDER BY AccountingName ASC
    `;
    const RevenueOther = await executeGet(db, query24);
    // Total Revenue
    const query25 = `
    SELECT
    COALESCE(SUM(AccountingBalance), 0) AS TotalRevenue
    FROM 
    Accounting
    WHERE
    AccountingRef = 611 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
    `;
    const { TotalRevenue } = await executeGet2(db, query25);
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
    const investorList = await executeGet(db, query27);
    for (const el of investorList) {
      const query = `
      SELECT 
      COALESCE(SUM(AccountingBalance), 0) AS TotalEquityPerson
      FROM Accounting
      WHERE
      AccountingRef = 311 AND
      AccountingName  = "Equity - ${el.UserFullname}" OR
      AccountingName = "Withdrawal Equity - ${el.UserFullname}" AND 
      AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"`;
      const { TotalEquityPerson } = await executeGet2(db, query);
      const UserFullname = el.UserFullname;
      const TotalPercent = TotalEquityPerson / TotalEquity || 0;
      const ProfitAttributed = NetProfitOrLoss * TotalPercent || 0;
      const Investor = {
        UserFullname: `${UserFullname} - ${TotalPercent.toFixed(2) * 100} %`,
        ProfitAttributed,
        TotalPercent,
      };
      ProfitAttribute.push(Investor);
      ProfitAttribute.sort((a, b) => b.TotalPercent - a.TotalPercent);
    }
    // totalEquity
    const query28 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquity1
    FROM Accounting
    WHERE
    AccountingRef = 311 AND 
    AccountingBalance > 0 AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"`;
    const { TotalEquity1 } = await executeGet2(db, query28);
    // equitywithdrawl
    const query29 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquityWithDrawl
    FROM Accounting 
    WHERE
    AccountingRef = 311 AND 
    AccountingBalance < 0  AND 
    AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"`;
    const { TotalEquityWithDrawl } = await executeGet2(db, query29);
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
        StockRemain,
        COGS: COGS,
        GrossProfitOrLoss,
        Expenses: {
          Expense,
          TotalExpense: TotalExpense,
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
        NetProfitOrLoss,
        TotalEquityChanges,
      },
    };
  });
  // api/accounting-delete
  ipcMain.handle("delete", async () => {
    const deletedAccounting = async () => {
      const query = `
      DELETE FROM Accounting 
      WHERE AccountingId IN (
        SELECT AccountingId 
        FROM Accounting
        ORDER BY AccountingDate DESC, 
                 AccountingTime DESC,
                 AccountingId DESC
        LIMIT 2
      )`;
      await executeCreate1(db, query);
    };
    const deleteStock = async () => {
      const query = `
      DELETE FROM Stock
      WHERE StockId IN (
        SELECT StockId 
        FROM Stock
        ORDER BY StockDate DESC,
                 StockId DESC
        LIMIT 1
      )`;
      await executeCreate1(db, query);
    };
    const query = `
    SELECT *
    FROM Accounting
    ORDER BY AccountingDate DESC, 
             AccountingTime DESC,
             AccountingId DESC
    LIMIT 2
    `;
    const accountingId = await executeGet3(db, query);
    const withDiscount = accountingId.find((el) =>
      [413, 513].includes(el.AccountingRef)
    );
    const withoutDiscount = accountingId.find((el) =>
      [411, 412, 511, 512].includes(el.AccountingRef)
    );
    if (withDiscount) {
      await deleteStock();
      await deletedAccounting();
      await deletedAccounting();
    } else if (withoutDiscount) {
      await deleteStock();
      await deletedAccounting();
    } else {
      await deletedAccounting();
    }
    const successMsg = "Accounting Last Transaction Has Been Deleted !";
    return successMsg;
  });
};
export default Accounting;
// coming soon
// etc-expense-receivable-loss || customer-failed-payment
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
