import { createCash } from "../../../../serverless-side/models/cash/functions.js";

// 1. endpoint = /api/sales/create/
// method : POST
// payload  : 1.CashYYYYMMDDVal, 2.CashHMSVal, 3.CashNameVal, 4.CashRpVal, 5.CashInfoVal
// return : message success create sales
export const addCash = async (req) => {
  try {
    const payLoad = {
      CashYYYYMMDDVal: req.formattedDDMY,
      CashHMSVal: req.formattedHMS,
      CashNameVal: req.CashNameVal,
      CashRpVal: req.CashRpVal,
      CashInfoVal: req.CashInfoVal,
    };
    const response = await createCash(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
