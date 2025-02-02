export const validateSupplierName = (supplierName) => {
  if (supplierName === "") {
    const msg = "Supplier Name must be filled...";
    throw new Error(msg);
  }
};
export const validateImg = (file) => {
  if (file.length >= 1) {
    // Validate type file (image/jpeg, image/png, dll.)
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file[0].type)) {
      const msg =
        "File type is not valid. Please upload an image (JPEG, PNG, GIF).";
      throw new Error(msg);
    }
    // Validate size file (max 2 MB)
    const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes
    if (file[0].size > maxFileSize) {
      const msg = "File size exceeds 2 MB.";
      throw new Error(msg);
    }
  }
};
export const validatePrice = (buy, sell) => {
  const priceBuyLesser = buy < sell;
  if (!priceBuyLesser) {
    const msg = "Price Buy must be lesser than Price Sell";
    throw new Error(msg);
  }
};
export const validateProductName = (productName) => {
  if (productName === "") {
    const msg = "Product Name must be filled...";
    throw new Error(msg);
  }
};
export const validateCategoryName = (categoryName) => {
  if (categoryName === "") {
    const msg = "Category Name must be filled...";
    throw new Error(msg);
  }
};
export const validateInvestor = (investorId) => {
  if (investorId === null) {
    const msg = `Invest must be filled`;
    throw new Error(msg);
  }
};
export const validatePrice1 = (price) => {
  if (price === 0) {
    const msg = "Price must be filled";
    throw new Error(msg);
  }
};
