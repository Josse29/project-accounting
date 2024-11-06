const convertCSV = (response) => {
  return new Promise((resolve, reject) => {
    let file_path = dialog.showSaveDialogSync({
      title: "Export Data",
      filters: [{ name: "microsoft-excel", extensions: ["csv"] }],
    });
    if (file_path) {
      file_path = file_path.replace(/\\/g, "/");
      let tHead = [Object.keys(response[0])];
      let tBody = response;
      let table = tHead.concat(tBody);
      let csvString = table
        .map((item) => {
          return Object.values(item).toString();
        })
        .join("\r\n");
      fs.writeFile(file_path, csvString, (err) => {
        if (!err) {
          resolve(file_path);
        }
        if (err) {
          reject(err);
        }
      });
    }
  });
};
export default convertCSV;
