const convertCSV = async (ipcMain, dialog, fs, appPath) => {
  ipcMain.handle("save-csv", async (event, data) => {
    try {
      // 1. convert JSON to CSV
      const jsonToCsv = (data) => {
        if (!data || !data.length) return "";
        const escapeCell = (value) => {
          if (value == null) return ""; // handle null or undefined
          const str = String(value)
            .replace(/[\x00-\x1F\x7F]/g, " ") // remove control characters
            .replace(/"/g, '""') // escape double quotes
            .replace(/\r?\n|\r/g, " "); // replace newlines with space
          return `"${str}"`; // wrap in quotes
        };
        const headers = Object.keys(data[0]);
        const rows = data.map((row) =>
          headers.map((field) => escapeCell(row[field])).join(",")
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
