import {
  validateImg,
  validatePrice,
  validateProductName,
} from "../etc/validation.js";
import {
  queryDeleteProductId,
  queryGetListProduct,
  queryGetProductCSV,
  queryGetProductCategoryId,
  queryGetProductPDF,
  queryGetProductPriceBuy,
  queryGetProductSupplierId,
  queryGetProducts,
  queryTotalRowProducts,
  queryUpdateProduct,
  queryinsertProducts,
} from "../querysql/product.js";

// 1.CREATE
export const insertProducts = (req) => {
  const {
    productName,
    productPriceBuy,
    productPriceSell,
    productInfo,
    productCategoryId,
    productSupplierId,
    productImg,
    imgBase64,
  } = req;
  // 1.validate name
  validateProductName(productName);
  // 2.validate price
  validatePrice(productPriceBuy, productPriceSell);
  // 3.Validation image
  validateImg(productImg);
  // execute
  const query = queryinsertProducts(
    productName,
    productPriceBuy,
    productPriceSell,
    productInfo,
    productCategoryId,
    productSupplierId,
    imgBase64
  );
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Product <b class='text-capitalize'>${productName}</b> has been added `;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
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
export const getProductPriceBuy = (productId) => {
  const query = queryGetProductPriceBuy(productId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        resolve(result);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getListProduct = (productSearch) => {
  const query = queryGetListProduct(productSearch);
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
export const getProductSupplierId = (supplierId) => {
  const query = queryGetProductSupplierId(supplierId);
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
export const getProductCategoryId = (categoryId) => {
  const query = queryGetProductCategoryId(categoryId);
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
// 3.UPDATE
export const updateProduct = (req) => {
  const {
    productId,
    productName,
    productPriceBuy,
    productPriceSell,
    productImgVal,
    productCategoryId,
    productSupplierId,
    productInfo,
    imgBase64,
  } = req;
  // 1.validate name
  validateProductName(productName);
  // 2.validate price
  validatePrice(productPriceBuy, productPriceSell);
  // 3.Validation image
  validateImg(productImgVal);
  // execute
  const query = queryUpdateProduct(
    productId,
    productName,
    productPriceBuy,
    productPriceSell,
    imgBase64,
    productCategoryId,
    productSupplierId,
    productInfo
  );
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Product <b class='text-capitalize'>${productName}</b> has been updated`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// 4.DELETE
export const deleteProductId = (id, productName) => {
  return new Promise((resolve, reject) => {
    db.run(queryDeleteProductId(id), (err) => {
      if (!err) {
        const msg = `Product <b class='text-capitalize'>${productName}</b> has been deleted`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
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
