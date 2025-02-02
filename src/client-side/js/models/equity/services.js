import { createEquity } from "../../../../serverless-side/models/equity/controller.js";

// 1. endpoint = api/equity/
// method : POST
// payload : 1.EquityUserId, 2.EquityBalance, 3.EquityInformation
//  return : message has been created
const create = async (req) => {
  try {
    const payLoad = {
      EquityUserId: req.EquityUserIdVal,
      EquityBalance: req.EquityBalanceVal,
      EquityInformation: req.EquityInformationVal,
    };
    const response = await createEquity(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
export { create };
