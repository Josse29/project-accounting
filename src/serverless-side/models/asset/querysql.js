const queryCreate = (
  assetDateVal,
  assetTimeVal,
  assetNameVal,
  assetBalanceVal,
  assetInfoVal
) => {
  let query = `
  INSER 
  INTO Asset
  (AssetDate, AssetTime, AssetName, AssetBalance, AssetInfo)
  VALUES
  ('${assetDateVal}', '${assetTimeVal}', '${assetNameVal}', '${assetBalanceVal}', '${assetInfoVal}')   
  `;
  return query;
};
export { queryCreate };
