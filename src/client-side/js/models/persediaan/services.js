import {
  createPersediaan1,
  getPersediaanProductGroup1,
  getPersediaanTotalRow1,
} from "../../../../serverless-side/models/persediaan/functions.js";

// 1. endpoint : api/persediaan/get-group-product
// methode = GET
// payload = searchVal, limitVal, offsetVal
// return = array persediaan by group product with search, limit, offset
export const getGroupProduct = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await getPersediaanProductGroup1(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2. endpoint : api/persediaan/get-group-product-row-page
// methode = GET
// payload = 1.searchVal, 2.limitVal
// return = only row and page by persediaan by group product
export const getRowPage1 = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await getPersediaanTotalRow1(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3.endpoint : api/persediaan/create-1
// methode : POST
// payload = 1.PersediaanYMDVal, 2.PersediaanHMSVal, 3.PersediaanQtyVal, 4.PersediaanTotalVal, 5. PersediaanInfoVal, 6.PersediaanProductIdVal, 7.PersediaanPersonIdVal
// return = success message after create sales
export const createV1 = async (req) => {
  try {
    const payLoad = {
      PersediaanYMDVal: req.formattedDDMY,
      PersediaanHMSVal: req.formattedHMS,
      PersediaanQtyVal: req.PersediaanQtyVal,
      PersediaanTotalVal: req.PersediaanTotalVal,
      PersediaanInfoVal: req.PersediaanInfoVal,
      PersediaanProductIdVal: req.PersediaanProductIdVal,
      PersediaanPersonIdVal: req.PersediaanPersonIdVal,
    };
    const response = await createPersediaan1(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
