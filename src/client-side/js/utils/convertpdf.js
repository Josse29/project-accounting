const convertPDF = (ipcMain, BrowserWindow, dialog, fs, appPath) => {
  ipcMain.handle("generate-pdf", async (event, section) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save PDF",
      defaultPath: "output.pdf",
      filters: [{ name: "PDF Files", extensions: ["pdf"] }],
    });

    if (canceled) {
      return null;
    }
    const cssPath = appPath(
      "src",
      "client-side",
      "css",
      "components",
      "text.css"
    );
    const bootstrapPath = appPath(
      "node_modules",
      "bootstrap",
      "dist",
      "css",
      "bootstrap.min.css"
    );
    const fontAwesomePath = appPath(
      "node_modules",
      "@fortawesome",
      "fontawesome-free",
      "css",
      "all.min.css"
    );
    const fullHtml = `
      <html>
        <link rel="stylesheet" href="${cssPath}" />
        <link
          rel="stylesheet"
          href="${bootstrapPath}"
        />
        <link
          rel="stylesheet"
          href="${fontAwesomePath}"
        />
        <body>
          ${section}
        </body>
      </html>
    `;

    // save html in a filetemporary
    const tempPath = appPath("data.html");
    await fs.promises.writeFile(tempPath, fullHtml);

    // load file
    const pdfWin = new BrowserWindow({ show: true });
    pdfWin.loadFile(tempPath);

    //  change destination directory
    return new Promise((resolve, reject) => {
      pdfWin.webContents.on("did-finish-load", async () => {
        try {
          const pdfData = await pdfWin.webContents.printToPDF({
            marginsType: 1,
            printBackground: true,
            pageSize: "A4",
          });
          await fs.promises.writeFile(filePath, pdfData);
          await fs.promises.unlink(tempPath);
          resolve(filePath);
        } catch (error) {
          reject(error);
        } finally {
          pdfWin.close();
        }
      });
    });
  });
};
export default convertPDF;
