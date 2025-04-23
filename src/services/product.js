// 1.endpoint : api/product/:limit/:offset (GET)
const getProductAPI = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await window.ElectronAPI.Product.get(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 2.endpoint : api/product/pagination (GET)
const getProductPaginationAPI = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await window.ElectronAPI.Product.pagination(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 3.endpoint : api/product (POST)
const createProductAPI = async (req) => {
  try {
    const data = {
      productName: req.productName,
      productPriceBuy: req.productPriceBuy,
      productPriceSell: req.productPriceSell,
      productInfo: req.productInfo,
      productSupplierId: req.productSupplierId,
      productImg: req.productImg,
    };
    const created = await window.ElectronAPI.Product.create(data);
    return created;
  } catch (error) {
    throw error;
  }
};
// 4.endpoint : api/product (DELETE)
const deleteProductAPI = async (req) => {
  try {
    const data = {
      productid: req.productid,
      productName: req.productName,
    };
    const deleted = await window.ElectronAPI.Product.delete(data);
    return deleted;
  } catch (error) {
    throw error;
  }
};
// 5.endpoint : api/product/:productid (PUT)
const updateProductAPI = async (req) => {
  try {
    const data = {
      productId: req.productId,
      productName: req.productName,
      productPriceBuy: req.productPriceBuy,
      productPriceSell: req.productPriceSell,
      productSupplierId: req.productSupplierId,
      productInfo: req.productInfo,
      productImgVal: req.productImgVal,
    };
    const updated = await window.ElectronAPI.Product.update(data);
    return updated;
  } catch (error) {
    throw error;
  }
};
// 6.endpoint : api/product-csv (CSV)
const getProductCSVAPI = async () => {
  try {
    const products = await window.ElectronAPI.Product.csv();
    return products;
  } catch (error) {
    throw error;
  }
};
// 7.endpoint : api/product-pdf (PDF)
const getProductPDFAPI = async () => {
  try {
    const products = await window.ElectronAPI.Product.pdf();
    return products;
  } catch (error) {
    throw error;
  }
};
// 8.enpdoint : api/product-list (GET)
const getProductListAPI = async () => {
  try {
    const product = await window.ElectronAPI.Product.list();
    return product;
  } catch (error) {
    throw error;
  }
};
// 9.endpoint : api/product/pagination1 (GET)
const getProductPagination1API = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await window.ElectronAPI.Product.pagination1(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 10.endpoint : api/product-ref-stock (GET)
const getProductStockAPI = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await window.ElectronAPI.Product.getStock(data);
    return response;
  } catch (error) {
    throw error;
  }
};
export {
  createProductAPI,
  deleteProductAPI,
  getProductAPI,
  getProductListAPI,
  getProductCSVAPI,
  getProductPDFAPI,
  getProductPaginationAPI,
  getProductPagination1API,
  getProductStockAPI,
  updateProductAPI,
};
