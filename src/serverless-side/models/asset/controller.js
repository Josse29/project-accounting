import { queryCreate } from "./querysql.js";

const createAsset = async (req) => {
  const {
    assetDateVal,
    assetTimeVal,
    assetNameVal,
    assetBalanceVal,
    assetInfoVal,
  } = req;
  const query = queryCreate(
    assetDateVal,
    assetTimeVal,
    assetNameVal,
    assetBalanceVal,
    assetInfoVal
  );
  const msg = `Asset Has been Added`;
  const created = await windown.electronAPI.sqliteApi.run(query, msg);
  return created;
};
export { createAsset };
