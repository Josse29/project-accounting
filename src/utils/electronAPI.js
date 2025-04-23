const closeApp = () => {
  window.ElectronAPI.close();
};
const convertCSV = async (params) => {
  const { data, setSuccessMsg, setErrMsg, setOpenCsv } = params;
  const pathCSV = await window.ElectronAPI.saveCSV(data);
  if (pathCSV !== null) {
    const successMsg = `File Excel Saved On ${pathCSV}`;
    setSuccessMsg(successMsg);
    setErrMsg("");
    if (setOpenCsv !== undefined) {
      setOpenCsv(false);
    }
  }
};
const convertPDF = async (params) => {
  const { htmlContent, setSuccessMsg, setErrMsg, setOpenPdf } = params;
  const pathPDF = await window.ElectronAPI.savePDF(htmlContent);
  if (pathPDF !== null) {
    const successMsg = `File PDF Saved On ${pathPDF}`;
    setSuccessMsg(successMsg);
    setErrMsg("");
    if (setOpenPdf !== undefined) {
      setOpenPdf(false);
    }
  }
};

export { closeApp, convertCSV, convertPDF };
