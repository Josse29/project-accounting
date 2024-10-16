import { createAccounting } from "../../../../serverless-side/models/accounting/function.js";
// 1. endpoint = api/accounting/
// method : POST
// payload : 1.accountingYMDVal, 2.accountingHMSVal, 3.accountingRefVal, 4.accountingNameVal, 5.accountingPositionVal, 6.accountingRpVal, 7.accountingInfoVal
//  return : message has been created
export const addAccounting = async (req) => {
  try {
    const payLoad = {
      accountingYMDVal: req.formattedDDMY,
      accountingHMSVal: req.formattedHMS,
      accountingRefVal: req.accountingRefVal,
      accountingNameVal: req.accountingNameVal,
      accountingPositionVal: req.accountingPositionVal,
      accountingRpVal: req.accountingRpVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await createAccounting(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
//
