import { getSumDebtCredit } from "./services.js";

export const sumDebtCredit = async (req) => {
  const { status, response } = await getSumDebtCredit(req);
  if (status) {
    return response;
  }
  if (!status) {
    throw new Error(response);
  }
};
