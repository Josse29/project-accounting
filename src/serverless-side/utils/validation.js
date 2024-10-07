// for users
export const validateUserFullname = (UserFullnameVal) => {
  if (UserFullnameVal === "") {
    const msg = `Fullname required `;
    throw new Error(msg);
  }
};
export const validateSamePassword = (UserPasswordVal, UserPassword1Val) => {
  if (UserPasswordVal !== UserPassword1Val) {
    const msg = `password must be same with confirm password`;
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
  if (file.length < 1) {
    return "null";
  }
};
export const getImageBase64 = (file) => {
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
};
