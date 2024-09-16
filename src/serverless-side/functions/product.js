import {
  queryDeleteProductId,
  queryGetListProduct,
  queryGetProductCSV,
  queryGetProductCategoryId,
  queryGetProductPDF,
  queryGetProductSupplierId,
  queryGetProducts,
  queryTotalRowProducts,
  queryUpdateProduct,
  queryinsertProducts,
} from "../querysql/product.js";

// 1.CREATE
export const insertProducts = (
  productName,
  productPriceBeli,
  productPriceJual,
  productInfo,
  productImg,
  productCategoryId,
  productSupplierId,
  callback
) => {
  const validatePrice = productPriceBeli < productPriceJual;
  if (validatePrice) {
    db.run(
      queryinsertProducts(
        productName,
        productPriceBeli,
        productPriceJual,
        productInfo,
        productImg,
        productCategoryId,
        productSupplierId
      ),
      (err) => {
        if (!err) {
          const msg = `Product <b class='text-capitalize'>${productName}</b> berhasil ditambahkan`;
          return callback(true, msg);
        }
        if (err) {
          return callback(false, err);
        }
      }
    );
  }
  if (!validatePrice) {
    const msg = "Harga Jual harus lebih besar dari pada harga beli";
    return callback(false, msg);
  }
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
export const getProductInit = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryTotalRowProducts(searchVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalPage;
        let totalRow = parseInt(res.TOTAL_ROW);
        if (totalRow % limitVal === 0) {
          totalPage = parseInt(totalRow / limitVal);
        } else {
          totalPage = parseInt(totalRow / limitVal) + 1;
        }
        resolve({ totalPage, totalRow });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getProducts = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffset = (offsetVal - 1) * limitVal;
  const query = queryGetProducts(searchVal, limitVal, startOffset);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
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
export const getProductSupplierId = (supplierId, callback) => {
  const query = queryGetProductSupplierId(supplierId);
  db.all(query, (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getProductCategoryId = (categoryId, callback) => {
  const query = queryGetProductCategoryId(categoryId);
  db.all(query, (err, res) => {
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
  productPriceBuy,
  productPriceSell,
  productImg,
  productCategoryId,
  productSupplierId,
  productInfo,
  callback
) => {
  console.log("harga beli ", productPriceBuy);
  console.log("harga jual ", productPriceSell);
  const validatePrice = productPriceBuy < productPriceSell;
  if (validatePrice) {
    db.run(
      queryUpdateProduct(
        productId,
        productName,
        productPriceBuy,
        productPriceSell,
        productImg,
        productCategoryId,
        productSupplierId,
        productInfo
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
  }
  if (!validatePrice) {
    const msg = `Harga Jual ${productName} harus lebih besar dari pada harga belinya`;
    return callback(false, msg);
  }
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
// convert | PDF
export const getProductPDF = (callback) => {
  const query = queryGetProductPDF();
  db.all(query, (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(true, err);
    }
  });
};
export const getProductCSV = (callback) => {
  const query = queryGetProductCSV();
  db.all(query, (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
