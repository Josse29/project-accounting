import {
  createAssetName,
  deleteAssetName,
  getAssetName,
  getAssetNameList,
  getAssetNamePagination,
  updateAssetName,
} from "../../../../serverless-side/models/assetlist/controller.js";

// 1.endpoint : api/assetname
// method : POST
// payLoad : 1.assetNameVal, 2.assetPriceVal, 3.assetUserIdVal, 4.assetImgVal, 5.assetInfoVal
// return : message success created assetname
const createAssetNameAPI = async (req) => {
  try {
    const payLoad = {
      assetNameVal: req.assetNameVal,
      assetPriceVal: parseFloat(req.assetPriceVal),
      assetUserIdVal: parseInt(req.assetUserIdVal),
      assetImgVal: req.assetImgVal,
      assetInfoVal: req.assetInfoVal,
    };
    const response = await createAssetName(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2.endpoint : api/assetname
// method : GET
// payLoad : 1.searchVal, 2.limitVal, 3.offsetVal
// return : assetname with limit offset
const getAssetNameAPI = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const assetName = await getAssetName(payLoad);
    return { status: true, response: assetName };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3. endpoint : api/assetname/pagination
// method : GET
// payLoad : 1.searchVal, 2.limitVal
// return : totalRow, limitVal
const getAssetNamePaginationAPI = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: parseInt(req.limitVal),
    };
    const totalPageRow = await getAssetNamePagination(payLoad);
    return { status: true, response: totalPageRow };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4.endpoint : api/assetname
// method : PUT
// payLoad : 1.assetIdVal, 2.assetNameVal, 3.assetBalanceVal, 4.assetInfoVal, 5.assetImgVal, 6.assetImgCancelVal
// return : message updated
const updateAsetNameAPI = async (req) => {
  try {
    const payLoad = {
      assetIdVal: parseInt(req.assetIdVal),
      assetNameVal: req.assetNameVal,
      assetPriceVal: parseFloat(req.assetPriceVal),
      assetUserIdVal: parseInt(req.assetUserIdVal),
      assetInfoVal: req.assetInfoVal,
      assetImgVal: req.assetImgVal,
      assetImgCancelVal: req.assetImgCancelVal,
    };
    const updated = await updateAssetName(payLoad);
    return { status: true, response: updated };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5.endpoint : api/assetname
// method : DELETE
// payLoad : 1.assetIdVal, 2.assetNameVal
// return : message deleted
const deleteAssetNameAPI = async (req) => {
  try {
    const payLoad = {
      assetIdVal: parseInt(req.assetIdVal),
      assetNameVal: req.assetNameVal,
    };
    const deleted = await deleteAssetName(payLoad);
    return { status: true, response: deleted };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6.endpoint : api/assetname-list
// method : GET
// payLoad : none
// return : list of assetname
const getAssetNameListAPI = async () => {
  try {
    const assetNameList = await getAssetNameList();
    return { status: true, response: assetNameList };
  } catch (error) {
    return { status: false, response: error };
  }
};
export {
  createAssetNameAPI,
  getAssetNameAPI,
  getAssetNameListAPI,
  getAssetNamePaginationAPI,
  updateAsetNameAPI,
  deleteAssetNameAPI,
};
