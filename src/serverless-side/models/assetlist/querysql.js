// 1.create
const queryCreate = (
  assetNameVal,
  assetPriceVal,
  assetUserIdVal,
  assetImgBase64,
  assetInfoVal
) => {
  let query = `
    INSERT
    INTO AssetList
    (AssetName, AssetPrice, AssetUserId, AssetImg, AssetInfo)
    VALUES
    ('${assetNameVal}', '${assetPriceVal}', '${assetUserIdVal}', '${assetImgBase64}', '${assetInfoVal}')
    `;
  return query;
};
const queryReadTotalRow = (searchVal) => {
  let query = `
  SELECT 
  COUNT(*) AS TOTAL_ROW
  FROM AssetList
  `;
  // left join with table user
  query += `
  LEFT JOIN User ON AssetList.AssetUserId = User.UserId `;
  if (searchVal !== "") {
    query += `
    WHERE 
    AssetList.AssetName LIKE '%${searchVal}%' ESCAPE '!' OR 
    AssetList.AssetInfo LIKE '%${searchVal}%' ESCAPE '!' OR
    User.UserEmail LIKE '%${searchVal}%' ESCAPE '!' OR 
    User.UserFullname LIKE '%${searchVal}%' ESCAPE '!'
    `;
  }
  return query;
};
const queryRead = (searchVal, limitVal, offsetVal) => {
  let query = `
  SELECT 
  AssetList.AssetId,
  AssetList.AssetName,
  AssetList.AssetPrice,
  AssetList.AssetImg,
  AssetList.AssetInfo,
  User.UserId,
  User.UserEmail,
  User.UserFullname
  FROM AssetList `;
  // left join with table user
  query += `LEFT JOIN User ON AssetList.AssetUserId = User.UserId `;
  // search value
  if (searchVal !== "") {
    query += `
    WHERE 
    AssetList.AssetName LIKE '%${searchVal}%' ESCAPE '!' OR
    AssetList.AssetInfo LIKE '%${searchVal}%' ESCAPE '!' OR
    User.UserEmail LIKE '%${searchVal}%' ESCAPE '!' OR 
    User.UserFullname LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  // with order,limit, offset
  query += `
  ORDER BY AssetList.AssetName ASC
  LIMIT ${limitVal}
  OFFSET ${offsetVal} `;
  return query;
};
const queryRead1 = () => {
  let query = `
  SELECT 
  AssetId,
  AssetName,
  AssetPrice
  FROM AssetList `;
  query += `
  ORDER BY AssetName ASC `;
  return query;
};
const queryUpdate = (
  assetIdVal,
  assetNameVal,
  assetPriceVal,
  assetUserIdVal,
  assetInfoVal,
  assetImgBase64,
  assetImgCancelVal
) => {
  let query = `
  UPDATE 
  AssetList
  SET
  AssetName = '${assetNameVal}',
  AssetPrice = '${assetPriceVal}',
  AssetInfo = '${assetInfoVal}',
  AssetUserId = '${assetUserIdVal}' `;
  // 1. removeImg
  if (assetImgCancelVal) {
    query += `
    , AssetImg = 'null' `;
  }
  // 2. changeImg
  if (!assetImgCancelVal && assetImgBase64 !== "null") {
    query += `
    , AssetImg = '${assetImgBase64}'
    `;
  }
  query += `
  WHERE AssetId = '${assetIdVal}'
  `;
  return query;
};
const queryDelete = (assetIdVal) => {
  let query = `
  DELETE 
  FROM AssetList 
  WHERE AssetId = '${assetIdVal}'
  `;
  return query;
};
export {
  queryCreate,
  queryRead,
  queryRead1,
  queryReadTotalRow,
  queryUpdate,
  queryDelete,
};
