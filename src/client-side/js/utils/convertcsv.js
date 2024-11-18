const { dialog } = require("electron");

const convertCSV = async (response) => {
  let file_path = await dialog.showSaveDialog({
    title: "Save File",
    defaultPath: "output.csv",
    filters: [{ name: "CSV Files", extensions: ["csv"] }],
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
    await fs.writeFile(file_path, csvString, (err) => {
      if (!err) {
        resolve(file_path);
      }
      if (err) {
        reject(err);
      }
    });
  }
};
export default convertCSV;
