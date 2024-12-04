import _ from "lodash";

const lodashAPI = (ipcMain) => {
  ipcMain.handle("lodash-findIndex", (event, array, value) => {
    return _.findIndex(array, (num) => num === value);
  });
  ipcMain.handle("lodash-last", (event, array) => {
    return _.last(array);
  });
};
export default lodashAPI;
