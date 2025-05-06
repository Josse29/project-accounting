import {
  executeCreate,
  executeCreate1,
  executeGet,
} from "../../database/runQuery.js";
import { capitalizeWord } from "../../utils/formatTxt.js";
import { validateLoadImg1 } from "../../utils/validation.js";
import { queryRead, queryRead1, queryUpdate } from "./querysql.js";
import CompanySchema from "./schema.js";

const Company = (ipcMain, db) => {
  // init db accounting
  const initCompany = async () => {
    await executeCreate(db, CompanySchema);
  };
  initCompany();
  ipcMain.handle("getCompany", async () => {
    const company = await executeGet(db, queryRead);
    return company;
  });
  ipcMain.handle("getCompany1", async () => {
    const company = await executeGet(db, queryRead1);
    return company;
  });
  ipcMain.handle("updateCompany", async (_, req) => {
    const {
      CompanyNameVal,
      CompanyEstVal,
      CompanyImgVal,
      CompanyInfoVal,
      CompanyIdVal,
    } = req;
    // validation
    if (CompanyNameVal === "") {
      const msg = `Uppps, Company Name is Required...`;
      throw new Error(msg);
    }
    if (CompanyEstVal === "") {
      const msg = `Uppps, Company Est is Required...`;
      throw new Error(msg);
    }
    const CompanyImgVal1 = await validateLoadImg1(CompanyImgVal);
    await executeCreate1(db, queryUpdate, [
      capitalizeWord(CompanyNameVal),
      CompanyEstVal,
      CompanyImgVal1,
      CompanyInfoVal,
      parseInt(CompanyIdVal),
    ]);
  });
};
export default Company;
