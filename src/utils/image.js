const validateExt = (file) => {
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  if (file.length > 0) {
    if (validImageTypes.includes(file[0].type)) {
      return true;
    } else {
      return false;
    }
  }
};
const getImageBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      resolve(base64);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export { validateExt, getImageBase64 };
