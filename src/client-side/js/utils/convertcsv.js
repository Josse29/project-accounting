const convertCSV = async (ipcMain, dialog, fs, path, app) => {
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
      // Mengonversi JSON ke CSV
      const filePath = await dialog.showSaveDialog({
        defaultPath: path.join(app.getAppPath(), "data.csv"),
        filters: [{ name: "CSV Files", extensions: ["csv"] }],
      });
      if (filePath.canceled) {
        return null; // Jika pengguna membatalkan
      }
      await fs.promises.writeFile(filePath.filePath, csv); // Menggunakan fs.promises
      return filePath.filePath; // Mengembalikan path file yang disimpan
    } catch (error) {
      console.error("Error saving CSV: ", error);
      throw new Error("Failed to save CSV file");
    }
  });
};
export default convertCSV;
