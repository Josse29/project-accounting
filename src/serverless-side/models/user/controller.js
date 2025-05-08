import {
  queryDeleteUser,
  queryGet,
  queryGetCreditor,
  queryGetCustomer,
  queryGetInvestor,
  queryGetSale,
  queryGetSupplier,
  queryGetTotal,
  queryGetUser,
  queryRegister,
  queryRegister1,
  queryUpdate,
  queryUpdate1,
} from "./querysql.js";
import {
  validateAccounting,
  validateEmail,
  validateEmail1,
  validateLoadImg1,
  validatePassword,
  validatePosition,
  validateUserFullname,
  validateUserFullname1,
  validateUserName,
  validateUserName1,
} from "../../utils/validation.js";
import { capitalizeWord } from "../../utils/formatTxt.js";
import {
  executeCreate,
  executeCreate1,
  executeGet,
  executeGet1,
  executeGet2,
  executeGet3,
  executeGet4,
} from "../../database/runQuery.js";
import UserSchema from "./schema.js";
import formatPrice from "../../utils/formatPrice.js";

const User = (ipcMain, db, bcryptjs, jwt) => {
  // init db user
  const initUser = async () => {
    await executeCreate(db, UserSchema);
  };
  initUser();
  // 1.CREATE
  ipcMain.handle("register", async (_, data) => {
    // payload
    const {
      UserPositionVal,
      UserNameVal,
      UserPasswordVal,
      UserPassword1Val,
      UserEmailVal,
      UserFullnameVal,
      UserImgVal,
      UserInfoVal,
    } = data;
    // Validations
    validatePosition(UserPositionVal);
    await validateUserFullname(db, capitalizeWord(UserFullnameVal));
    await validateEmail(db, UserEmailVal);
    const imgBase64 = await validateLoadImg1(UserImgVal);
    if (UserPositionVal === "admin") {
      await validateUserName(db, UserNameVal);
      validatePassword(UserPasswordVal, UserPassword1Val);
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(UserPasswordVal, salt);
      await executeCreate1(db, queryRegister, [
        UserNameVal,
        UserEmailVal,
        capitalizeWord(UserFullnameVal),
        hashedPassword,
        imgBase64,
        UserPositionVal,
        UserInfoVal,
      ]);
    } else {
      await executeCreate1(db, queryRegister1, [
        UserEmailVal,
        capitalizeWord(UserFullnameVal),
        imgBase64,
        UserPositionVal,
        UserInfoVal,
      ]);
    }
    const msg = `${UserFullnameVal} - ${UserPositionVal} has been registered !`;
    return msg;
  });
  ipcMain.handle("login", async (_, data) => {
    const { UserNameVal, UserPasswordVal } = data;
    if (!UserNameVal || !UserPasswordVal) {
      const msg = `Uppsss ,Username and Password is Required !`;
      throw new Error(msg);
    }
    const query = `
    SELECT 
    UserId,
    UserFullname,
    UserName, 
    UserPassword
    FROM User 
    WHERE 
    UserName = ?
    `;
    const user = await executeGet4(db, query, [UserNameVal]);
    if (!user) {
      const msg = `
      Uppss, ${UserNameVal} isn't registered yet
      `;
      throw new Error(msg);
    }
    const validPassword = await bcryptjs.compare(
      UserPasswordVal,
      user.UserPassword
    );
    if (!validPassword) {
      const msg = `Uppppsss, Password is wrong`;
      throw new Error(msg);
    }
    const token = jwt.sign(
      {
        id: user.UserId,
        fullname: user.UserFullname,
      },
      "JWT_SECRET"
    );
    return {
      msg: "Success Login !",
      token,
    };
  });
  // 2.READ
  ipcMain.handle("getUser", async (_, data) => {
    const { searchVal, limitVal, offsetVal } = data;
    const startOffsetVal = (offsetVal - 1) * limitVal;
    const query = queryGet(searchVal, limitVal, startOffsetVal);
    const User = await executeGet(db, query);
    return User;
  });
  ipcMain.handle("getAdmin", async () => {
    const query = `
    SELECT 
    UserId,
    UserName,
    UserFullname
    FROM User 
    WHERE UserPosition = ?
    `;
    const user = await executeGet3(db, query, ["admin"]);
    return user;
  });
  ipcMain.handle("resetPassword", async (_, data) => {
    const { UserIdVal, UserNameVal, UserPasswordVal, UserPassword1Val } = data;
    if (!UserIdVal) {
      const msg = `Admin is Required!`;
      throw new Error(msg);
    }
    validatePassword(UserPasswordVal, UserPassword1Val);
    const query = `
    SELECT 
    COUNT(*) AS TotalAdmin
    FROM User
    WHERE UserName = ? AND 
          UserId = ? AND 
          UserPosition = 'admin' 
    `;
    const { TotalAdmin } = await executeGet4(db, query, [
      UserNameVal,
      parseInt(UserIdVal),
    ]);
    if (TotalAdmin < 1) {
      const msg = `${UserNameVal} - isn't admin..`;
      throw new Error(msg);
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(UserPasswordVal, salt);
    const query1 = `
    UPDATE 
    User
    SET UserPassword = ?
    WHERE UserId = ? `;
    await executeCreate1(db, query1, [hashedPassword, parseInt(UserIdVal)]);
    const msg = `Password - ${UserNameVal} has been Updated `;
    return msg;
  });
  ipcMain.handle("paginationUser", async (_, data) => {
    const { searchVal, limitVal } = data;
    const query = queryGetTotal(searchVal);
    const totalPageRow = await executeGet1(db, query, limitVal);
    return totalPageRow;
  });
  ipcMain.handle("getUserList", async () => {
    const query = queryGetUser();
    const listUser = await executeGet(db, query);
    return listUser;
  });
  ipcMain.handle("getCustomer", async () => {
    const query = queryGetCustomer();
    const customer = await executeGet(db, query);
    return customer;
  });
  ipcMain.handle("getReceivable", async () => {
    const query = queryGetCustomer();
    const customer = await executeGet(db, query);
    const receivableList = [];
    for (const rows of customer) {
      const query1 = `
      SELECT 
      SUM(AccountingBalance) AS TotalReceivable
      FROM Accounting
      WHERE AccountingName = 'Receivable - ${rows.UserFullname}'
      AND AccountingRef = 112
      `;
      const { TotalReceivable } = await executeGet2(db, query1);
      if (TotalReceivable >= 1) {
        const receivable = {
          UserId: rows.UserId,
          UserFullname: rows.UserFullname,
          UserEmail: rows.UserEmail,
          TotalReceivable,
        };
        // push to array
        receivableList.push(receivable);
      }
    }
    return receivableList;
  });
  ipcMain.handle("getReceivable1", async () => {
    const query = `
    SELECT 
    UserId,
    UserFullname,
    UserEmail,
    UserImg
    FROM User
    WHERE UserPosition = 'customer'
    `;
    const customer = await executeGet(db, query);
    let receivableTotals = 0;
    const receivableList = [];
    if (customer.length < 1) {
      return {
        receivableTotals,
        receivableList,
      };
    }
    // receivable id
    for (const rows of customer) {
      const query1 = `
      SELECT 
      SUM(AccountingBalance) AS TotalReceivable
      FROM Accounting
      WHERE AccountingName = 'Receivable - ${rows.UserFullname}'
      AND AccountingRef = 112
      `;
      const { TotalReceivable } = await executeGet2(db, query1);
      const receivable = {
        UserId: rows.UserId,
        UserFullname: rows.UserFullname,
        UserImg: rows.UserImg,
        TotalReceivable,
      };
      receivableList.push(receivable);
    }
    receivableList.sort((a, b) => b.TotalReceivable - a.TotalReceivable);
    // receivable sum
    const query1 = `
    SELECT
    COALESCE(SUM(AccountingBalance), 0) AS receivableTotal
    FROM Accounting
    WHERE AccountingRef = 112 `;
    const { receivableTotal } = await executeGet2(db, query1);
    receivableTotals += receivableTotal;
    return {
      receivableTotals,
      receivableList,
    };
  });
  ipcMain.handle("getSales", async () => {
    const query = queryGetSale();
    const userSale = await executeGet(db, query);
    return userSale;
  });
  ipcMain.handle("getSales1", async () => {
    const query = `
    SELECT 
    UserId,
    UserFullname,
    UserImg
    FROM User
    WHERE UserPosition = 'sale'
    `;
    const userSale = await executeGet(db, query);
    let SaleTotal = 0;
    const SaleGroup = [];
    if (userSale.length < 1) {
      return {
        SaleTotal,
        SaleGroup,
      };
    }
    for (const rows of userSale) {
      const query = `
      SELECT 
      SUBSTR(Stock.StockInfo, INSTR(Stock.StockInfo, 'Sale : ') + 7, INSTR(Stock.StockInfo, ' |') - (INSTR(Stock.StockInfo, 'Sale : ') + 7)) AS SaleName,
      Product.ProductName,
      Product.ProductPriceSell,
      COALESCE((Stock.StockQty) * -1, 0) AS SaleQty,
      (COALESCE((Stock.StockQty) * -1, 0) * Product.ProductPriceSell) AS SaleIdBalance
      FROM 
      Stock
      LEFT JOIN Product ON Stock.StockProductId = Product.ProductId
      WHERE 
      Stock.StockActivity LIKE "%Sales%" AND 
      Stock.StockInfo LIKE "%Sale : ${rows.UserFullname} | %" `;
      let balance = 0;
      const SalesId = await executeGet(db, query);
      for (const el of SalesId) {
        balance += el.SaleIdBalance;
      }
      const data = {
        SaleId: rows.UserId,
        SaleName: rows.UserFullname,
        SaleImg: rows.UserImg,
        SaleBalance: balance,
      };
      SaleGroup.push(data);
      SaleGroup.sort((a, b) => b.SaleBalance - a.SaleBalance);
    }

    // summary
    const query1 = `
    SELECT 
    Product.ProductName,
    Product.ProductPriceSell,
    COALESCE((Stock.StockQty) * -1, 0) AS SaleQty,
    (COALESCE((Stock.StockQty) * -1, 0) * Product.ProductPriceSell) AS SaleSum
    FROM 
    Stock
    LEFT JOIN Product ON Stock.StockProductId = Product.ProductId
    WHERE 
    Stock.StockActivity LIKE "%Sales%" `;
    const saleSum = await executeGet3(db, query1);
    for (const el of saleSum) {
      SaleTotal += el.SaleSum;
    }
    return {
      SaleTotal,
      SaleGroup,
    };
  });
  ipcMain.handle("getInvestor", async () => {
    const query = queryGetInvestor();
    const investor = await executeGet(db, query);
    const investorList = [];
    for (const rows of investor) {
      const query1 = `
      SELECT 
      COALESCE(SUM(AccountingBalance), 0) AS TotalEquity
      FROM 
      Accounting
      WHERE AccountingName = "Equity - ${rows.UserFullname}" AND 
            AccountingRef = 311
      `;
      const { TotalEquity } = await executeGet2(db, query1);
      const investorData = {
        UserId: rows.UserId,
        UserFullname: rows.UserFullname,
        UserEmail: rows.UserEmail,
        TotalEquity,
      };
      // push to array
      investorList.push(investorData);
    }
    return investorList;
  });
  ipcMain.handle("getInvestor1", async () => {
    const query = `
    SELECT
    UserId,
    UserFullname,
    UserImg
    FROM User 
    WHERE UserPosition = 'investor'
    `;
    const investor = await executeGet(db, query);
    let investorTotal = 0;
    const investorList = [];
    if (investor.length < 1) {
      return { investorTotal, investorList };
    }
    const query1 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS Investment 
    FROM Accounting 
    WHERE AccountingRef = 311  
    `;
    const { Investment } = await executeGet2(db, query1);
    investorTotal += Investment;
    for (const rows of investor) {
      const query1 = `
      SELECT 
      COALESCE(SUM(AccountingBalance), 0) AS TotalEquity
      FROM 
      Accounting
      WHERE 
      AccountingName = "Equity - ${rows.UserFullname}" OR 
      AccountingName = "Withdrawal Equity - ${rows.UserFullname}" AND 
      AccountingRef = 311 
      `;
      const { TotalEquity } = await executeGet2(db, query1);
      const percent = (TotalEquity / investorTotal).toFixed(2) || 0;
      const investorData = {
        InvestorId: rows.UserId,
        Investorname: rows.UserFullname,
        InvestorEquity: `${formatPrice(TotalEquity)} - ${percent * 100} %`,
        TotalEquity,
        InvestorImg: rows.UserImg,
      };
      investorList.push(investorData);
    }
    investorList.sort((a, b) => b.TotalEquity - a.TotalEquity);
    return { investorList, investorTotal };
  });
  ipcMain.handle("getSupplier", async () => {
    const query = queryGetSupplier();
    const supplier = await executeGet(db, query);
    return supplier;
  });
  ipcMain.handle("getLiability", async () => {
    const query = `
    SELECT 
    UserId,
    UserFullname,
    UserImg
    FROM User
    WHERE 
    UserPosition = "supplier" OR 
    UserPosition = "creditor"
    `;
    const liability = await executeGet3(db, query);
    let liabilityTotal = 0;
    const liabilityList = [];
    if (liability.length < 1) {
      return {
        liabilityTotal,
        liabilityList,
      };
    }
    for (const rows of liability) {
      const query = `
      SELECT 
      COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
      FROM Accounting 
      WHERE AccountingName = "Liability - ${rows.UserFullname}" AND 
            AccountingRef = 211 
      `;
      const { TotalLiability } = await executeGet2(db, query);
      const data = {
        UserFullname: rows.UserFullname,
        UserImg: rows.UserImg,
        TotalLiability,
      };
      liabilityList.push(data);
    }
    liabilityList.sort((a, b) => b.TotalLiability - a.TotalLiability);
    // summary
    const query1 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS LiablitySum
    FROM Accounting 
    WHERE AccountingRef = 211
    `;
    const { LiablitySum } = await executeGet4(db, query1);
    liabilityTotal += LiablitySum;
    return { liabilityTotal, liabilityList };
  });
  ipcMain.handle("getLiability1", async () => {
    const query = `
    SELECT 
    UserId, 
    UserFullname,
    UserEmail
    FROM User
    WHERE 
    UserPosition = "supplier" OR
    UserPosition = "creditor"
    `;
    const liability = await executeGet(db, query);
    const liabilityList = [];
    for (const el of liability) {
      const query = `
      SELECT 
      COALESCE(SUM(AccountingBalance), 0) AS LiabilitySum
      FROM Accounting 
      WHERE AccountingName = "Liability - ${el.UserFullname}" AND AccountingRef = 211
      `;
      const { LiabilitySum } = await executeGet2(db, query);
      const data = {
        UserFullname: el.UserFullname,
        UserEmail: el.UserEmail,
        LiabilitySum,
      };
      liabilityList.push(data);
    }
    return liabilityList;
  });
  ipcMain.handle("getCreditor", async () => {
    const query = queryGetCreditor();
    const creditor = await executeGet(db, query);
    const listCreditor = [];
    for (const rows of creditor) {
      const query1 = `
      SELECT
      COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
      FROM 
      Accounting
      WHERE 
      AccountingName LIKE '%liability - ${rows.UserFullname}%' AND 
      AccountingRef = 211
      `;
      const { TotalLiability } = await executeGet2(db, query1);
      const dataCreditor = {
        UserId: rows.UserId,
        UserFullname: rows.UserFullname,
        UserEmail: rows.UserEmail,
        TotalLiability,
      };
      // push to array
      listCreditor.push(dataCreditor);
    }
    return listCreditor;
  });
  // 3. UPDATE
  ipcMain.handle("updateUser", async (_, req) => {
    const {
      UserNameVal,
      UserEmailVal,
      UserFullnameVal,
      UserImgVal,
      UserPositionVal,
      UserInfoVal,
      UserIdVal,
    } = req;
    await validateAccounting(db);
    // 1.validation email
    validatePosition(UserPositionVal);
    await validateUserFullname1(db, UserFullnameVal, parseInt(UserIdVal));
    await validateEmail1(db, UserEmailVal, parseInt(UserIdVal));
    const imgBase64 = await validateLoadImg1(UserImgVal);
    if (UserPositionVal === "admin") {
      await validateUserName1(db, UserNameVal, parseInt(UserIdVal));
      await executeCreate1(db, queryUpdate, [
        UserNameVal,
        UserEmailVal,
        capitalizeWord(UserFullnameVal),
        imgBase64,
        UserPositionVal,
        UserInfoVal,
        parseInt(UserIdVal),
      ]);
    } else {
      const query = `
      SELECT 
      COUNT(*) AS TotalAdmin
      FROM USER
      WHERE 
      UserPosition = ? AND UserId = ?
      `;
      const { TotalAdmin } = await executeGet4(db, query, [
        "admin",
        parseInt(UserIdVal),
      ]);
      if (TotalAdmin === 1) {
        const query1 = `
        SELECT 
        COUNT(*) AS TotalsAdmin 
        FROM User 
        WHERE UserPosition = ? `;
        const { TotalsAdmin } = await executeGet4(db, query1, ["admin"]);
        if (TotalsAdmin === 1) {
          const msg = "Uppss, Total Admin is only 1 ,";
          throw new Error(msg);
        }
      }
      await executeCreate1(db, queryUpdate1, [
        UserEmailVal,
        capitalizeWord(UserFullnameVal),
        imgBase64,
        UserPositionVal,
        UserInfoVal,
        parseInt(UserIdVal),
      ]);
    }
    const msg = `${UserFullnameVal} has been updated`;
    return msg;
  });
  // 4. DELETE
  ipcMain.handle("deleteUser", async (_, req) => {
    const { UserFullname, UserId } = req;
    await validateAccounting(db);
    const query = `
    SELECT 
    COUNT(*) AS TotalAdmin
    FROM USER
    WHERE 
    UserPosition = ? AND UserId = ?
    `;
    const { TotalAdmin } = await executeGet4(db, query, [
      "admin",
      parseInt(UserId),
    ]);
    if (TotalAdmin === 1) {
      const query1 = `
      SELECT 
      COUNT(*) AS TotalsAdmin 
      FROM User 
      WHERE UserPosition = ? `;
      const { TotalsAdmin } = await executeGet4(db, query1, ["admin"]);
      if (TotalsAdmin === 1) {
        const msg = "Uppss, Total Admin is only 1 ,";
        throw new Error(msg);
      }
    }
    await executeCreate1(db, queryDeleteUser, [parseInt(UserId)]);
    const msg = `${UserFullname} has been deleted `;
    return msg;
  });
};
export default User;
