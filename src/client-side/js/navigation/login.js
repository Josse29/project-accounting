$("#minimize-window")
  .off("click")
  .on("click", () => {
    window.ElectronAPI.minimize();
  });
$("#restore-window")
  .off("click")
  .on("click", () => {
    window.ElectronAPI.restore();
  });
$("#close-window")
  .off("click")
  .on("click", () => {
    window.ElectronAPI.close();
  });
$("button#login")
  .off("click")
  .on("click", () => {
    window.ElectronAPI.navigateTo("dashboard");
  });
