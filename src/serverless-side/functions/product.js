import {
  queryDeleteProductId,
  queryGetListProduct,
  queryGetProducts,
  queryTotalRowProducts,
  queryUpdateProduct,
  queryinsertProducts,
} from "../querysql/product.js";

// 1.CREATE
export const insertProducts = (
  productName,
  productPrice,
  productInfo,
  productImg,
  productCategoryId,
  productSupplierId,
  callback
) => {
  db.run(
    queryinsertProducts(
      productName,
      productPrice,
      productInfo,
      productImg,
      productCategoryId,
      productSupplierId
    ),
    (err) => {
      if (!err) {
        return callback(
          true,
          `Product <b class='text-capitalize'>${productName}</b> berhasil ditambahkan`
        );
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
// 2.READ
export const getTotalRowProduct = (productSearch, callback) => {
  db.each(queryTotalRowProducts(productSearch), (err, res) => {
    if (!err) {
      const totalProduct = parseInt(res.TOTAL_ROW);
      return callback(true, totalProduct);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getTotalPageProduct = (limitProduct, searchVal, callback) => {
  db.each(queryTotalRowProducts(searchVal), (err, res) => {
    if (!err) {
      let lastPage;
      let totalRow = parseInt(res.TOTAL_ROW);
      let limitProductInt = parseInt(limitProduct);
      if (totalRow % limitProductInt === 0) {
        lastPage = parseInt(totalRow / limitProductInt);
      } else {
        lastPage = parseInt(totalRow / limitProductInt) + 1;
      }
      return callback(true, lastPage);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getProducts = (
  productSearch,
  productLimit,
  productOffset,
  callback
) => {
  const productOffsetStart = (productOffset - 1) * productLimit;
  db.all(
    queryGetProducts(productSearch, productLimit, productOffsetStart),
    (err, res) => {
      if (!err) {
        return callback(true, res);
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
export const getListProduct = (productSearch, callback) => {
  db.all(queryGetListProduct(productSearch), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 3.UPDATE
export const updateProduct = (
  productId,
  productName,
  productPrice,
  productInfo,
  productImg,
  productCategoryId,
  productSupplierId,
  callback
) => {
  // productId,
  // productName,
  // productPrice,
  // productInfo,
  // imgbase64,
  // productCategoryId,
  // productSupplierId,
  db.run(
    queryUpdateProduct(
      productId,
      productName,
      productPrice,
      productInfo,
      productImg,
      productCategoryId,
      productSupplierId
    ),
    (err) => {
      if (!err) {
        return callback(
          true,
          `Product <b class='text-capitalize'>${productName}</b> berhasil diperbaharui`
        );
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
// 4.DELETE
export const deleteProductId = (id, productName, callback) => {
  db.run(queryDeleteProductId(id), (err) => {
    if (!err) {
      return callback(
        true,
        `Product <b class='text-capitalize'>${productName}</b> berhasil dihapus`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
