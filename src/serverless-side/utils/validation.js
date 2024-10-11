export const validateEmail = (val) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmail = emailRegex.test(val);
  if (!isEmail) {
    const msg = `Please input correct email `;
    throw new Error(msg);
  }
};
export const validateUserFullname = (UserFullnameVal) => {
  if (UserFullnameVal === "") {
    const msg = `Fullname required `;
    throw new Error(msg);
  }
};
export const validateSamePassword = (UserPasswordVal, UserPassword1Val) => {
  if (UserPasswordVal === "" && UserPassword1Val === "") {
    const msg = `password must be filled`;
    throw new Error(msg);
  }
  if (UserPasswordVal !== UserPassword1Val) {
    const msg = `password must be same with confirm password`;
    throw new Error(msg);
  }
};
export const validatePosition = (UserPositionVal) => {
  if (UserPositionVal === null) {
    const msg = `position field required`;
    throw new Error(msg);
  }
};
export const validateLoadImg = (file) => {
  if (file.length >= 1) {
    // 1. Validate type file (image/jpeg, image/png, dll.)
    const ImgTypes = ["image/jpeg", "image/png", "image/gif"];
    const validateImg = ImgTypes.includes(file[0].type);
    if (!validateImg) {
      const msg =
        "File type is not valid. Please upload an image (JPEG, PNG, GIF).";
      throw new Error(msg);
    }
    // 2. Validate size file (max 2 MB)
    const fileSize = 2 * 1024 * 1024; // 2 MB in bytes
    const maxFileSize = file[0].size < fileSize;
    if (!maxFileSize) {
      const msg = "File size exceeds 2 MB.";
      throw new Error(msg);
    }
    // 3 after validate type & size, loadImg to base64
    if (validateImg && maxFileSize) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          resolve(base64);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file[0]);
      });
    }
  }
  if (file.length < 1) {
    return "null";
  }
};
export const validateProductAdd = (productId) => {
  const isNaN = Number.isNaN(productId);
  if (isNaN) {
    const msg = "Please add Product First...";
    throw new Error(msg);
  }
};
export const validateQty = (valPersediaanQty) => {
  const isNumeric = (val) => {
    const regex = /^-?\d*(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
    const numeric = regex.test(val);
    return numeric && val !== 0;
  };
  const valdateNum = isNumeric(valPersediaanQty);
  if (!valdateNum) {
    const msg = "Please input type of number in qty...";
    throw new Error(msg);
  }
};
