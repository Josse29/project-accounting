const convertCSV = async (ipcMain, dialog, fs, appPath) => {
  ipcMain.handle("save-csv", async (event, data) => {
    try {
      // 1. convert JSON to CSV
      const jsonToCsv = (data) => {
        const headers = Object.keys(data[0]);
        const rows = data.map((row) =>
          headers.map((field) => `"${row[field]}"`).join(",")
        );
        return [headers.join(","), ...rows].join("\n");
      };
      const csv = jsonToCsv(data);
      // 2. get destination directory with dialog
      const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: appPath("data.csv"),
        filters: [{ name: "CSV Files", extensions: ["csv"] }],
      });
      if (canceled) {
        return null;
      }
      // 3. write file as extension
      await fs.promises.writeFile(filePath, csv);
      return filePath;
    } catch (error) {
      console.error("Error saving CSV: ", error);
      throw new Error("Failed to save CSV file");
    }
  });
};
export default convertCSV;
