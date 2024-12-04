const convertPDF = (ipcMain, BrowserWindow, dialog, fs) => {
  ipcMain.handle("save-pdf", async (event, selectedHtml) => {
    try {
      const filePath = await dialog.showSaveDialog({
        filters: [{ name: "PDF", extensions: ["pdf"] }],
      });
      if (filePath.canceled) return null;
      const temporaryWindow = new BrowserWindow({
        show: false, // Tidak menampilkan jendela baru
        webPreferences: {
          nodeIntegration: true,
        },
      });
      temporaryWindow.loadURL(
        "data:text/html;charset=utf-8," + encodeURIComponent(selectedHtml)
      );
      await new Promise((resolve) => {
        temporaryWindow.webContents.once("did-finish-load", resolve);
      });
      const pdfData = await temporaryWindow.webContents.printToPDF({
        pageSize: "A4",
      });
      // Menyimpan PDF ke lokasi yang dipilih
      await fs.promises.writeFile(filePath.filePath, pdfData);
      temporaryWindow.close(); // Tutup jendela sementara setelah selesai
      return filePath.filePath; // Mengembalikan lokasi file PDF yang disimpan
    } catch (error) {
      console.error("Failed to convert to PDF:", error);
      return null;
    }
  });
};
export default convertPDF;
