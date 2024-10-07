const validateImg = (file) => {
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  if (file.length > 0) {
    if (validImageTypes.includes(file[0].type)) {
      return true;
    } else {
      return false;
    }
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
    reader.readAsDataURL(file);
  });
};
export const previewLoadImg = (params) => {
  const { inputImg, sectionImg, previewImg } = params;
  $(inputImg)
    .off("change")
    .on("change", async (event) => {
      try {
        const file = event.target.files;
        const validatedImg = validateImg(file);
        if (validatedImg) {
          const imgBase64 = await getImageBase64(file[0]);
          $(previewImg).attr("src", imgBase64);
          $(sectionImg).removeClass("d-none");
        }
        if (!validatedImg) {
          $(sectionImg).addClass("d-none");
        }
      } catch (error) {
        console.error(error);
      }
    });
};
