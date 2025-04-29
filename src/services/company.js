// 1. endpoint : api/company (GET)
const getCompanyAPI = async () => {
  try {
    const response = await window.ElectronAPI.Company.get();
    return response;
  } catch (error) {
    throw error;
  }
};
// 2. endpoint : api/company (POST)
const updateCompanyAPI = async (req) => {
  try {
    const data = {
      CompanyNameVal: req.CompanyNameVal,
      CompanyEstVal: req.CompanyEstVal,
      CompanyImgVal: req.CompanyImgVal,
      CompanyInfoVal: req.CompanyInfoVal,
      CompanyIdVal: req.CompanyIdVal,
    };
    const response = await window.ElectronAPI.Company.update(data);
    return response;
  } catch (error) {
    throw error;
  }
};

export { getCompanyAPI, updateCompanyAPI };
