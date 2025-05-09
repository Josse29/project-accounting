const convertPDF = (ipcMain, BrowserWindow, dialog, fs, app, path) => {
  ipcMain.handle("generate-pdf", async (event, section) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save PDF",
      defaultPath: "output.pdf",
      filters: [{ name: "PDF Files", extensions: ["pdf"] }],
    });
    if (canceled) {
      return null;
    }
    const isDev = !app.isPackaged;
    const pdfPath = (...paths) => {
      return isDev
        ? path.join(app.getAppPath(), "assets", ...paths)
        : path.join(process.resourcesPath, "assets", ...paths);
    };
    // Error: ENOENT: no such file or directory, open 'C:\Users\ASUS\AppData\Local\Programs\josstack\resources\app.asar\data.html'
    const styleCss = pdfPath("style.css");
    const bootstrapCss = pdfPath("bootstrap.css");
    const fontawesomeCss = pdfPath("fontawesome.css");
    const fullHtml = `
      <html>
        <link rel="stylesheet" href="file://${styleCss}" />
        <link
          rel="stylesheet"
          href="file://${bootstrapCss}"
        />
        <link
          rel="stylesheet"
          href="file://${fontawesomeCss}"
        />
        <body>
          ${section}
        </body>
      </html>
    `;

    // save html in a filetemporary
    const userDataPath = app.getPath("userData");
    const tempPath = path.join(userDataPath, "data.html");
    console.log(tempPath);
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
