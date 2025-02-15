import { capitalizeWord } from "../../utils/formatTxt.js";
import {
  validateAssetName,
  validateAssetPrice,
  validateLoadImg,
} from "../../utils/validation.js";
import {
  queryCreate,
  queryDelete,
  queryRead,
  queryRead1,
  queryReadTotalRow,
  queryUpdate,
} from "./querysql.js";

const createAssetName = async (req) => {
  const {
    assetNameVal,
    assetPriceVal,
    assetUserIdVal,
    assetImgVal,
    assetInfoVal,
  } = req;
  // 1.validate Name
  validateAssetName(assetNameVal);
  // 2. validate price
  validateAssetPrice(assetPriceVal);
  // 3. validate img
  const assetImgBase64 = await validateLoadImg(assetImgVal);
  // 4.executed
  const query = queryCreate(
    capitalizeWord(assetNameVal.trim()),
    assetPriceVal,
    assetUserIdVal,
    assetImgBase64,
    assetInfoVal
  );
  const msg = `Asset - <b class='text-capitalize'>${assetNameVal}</b>  has Been Added`;
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
const getAssetNamePagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryReadTotalRow(searchVal, limitVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
const getAssetName = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffset = (offsetVal - 1) * limitVal;
  const query = queryRead(searchVal, limitVal, startOffset);
  const assetName = await window.electronAPI.sqliteApi.all(query);
  return assetName;
};
const getAssetNameList = async () => {
  const query = queryRead1();
  const assetNameList = await window.electronAPI.sqliteApi.all(query);
  return assetNameList;
};
const updateAssetName = async (req) => {
  const {
    assetIdVal,
    assetNameVal,
    assetPriceVal,
    assetUserIdVal,
    assetInfoVal,
    assetImgVal,
    assetImgCancelVal,
  } = req;
  // 1.validate Name
  validateAssetName(assetNameVal);
  // 2. validate Balance
  validateAssetPrice(assetPriceVal);
  // 3. validate img
  const assetImgBase64 = await validateLoadImg(assetImgVal);
  // 4.executed
  const query = queryUpdate(
    assetIdVal,
    capitalizeWord(assetNameVal.trim()),
    assetPriceVal,
    assetUserIdVal,
    assetInfoVal,
    assetImgBase64,
    assetImgCancelVal
  );
  const msg = `Asset - <b class='text-capitalize'>${assetNameVal}</b> has been updated`;
  const updated = await window.electronAPI.sqliteApi.run(query, msg);
  return updated;
};
const deleteAssetName = async (req) => {
  const { assetIdVal, assetNameVal } = req;
  const query = queryDelete(assetIdVal);
  const msg = `Asset - <b class='text-capitalize'>${assetNameVal}</b> has been deleted`;
  const deleted = await window.electronAPI.sqliteApi.run(query, msg);
  return deleted;
};
export {
  createAssetName,
  getAssetName,
  getAssetNameList,
  getAssetNamePagination,
  updateAssetName,
  deleteAssetName,
};
