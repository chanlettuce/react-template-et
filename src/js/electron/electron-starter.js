// Module to control application life.
// Module to create native browser window.
const { app, BrowserWindow } = require('electron');
const loadDevtool = require('electron-load-devtool');

const path = require('path');
const url = require('url');
// const os = require('os');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // const REACT_DEVELOPER_TOOLS_PATH = path.join(os.homedir(), 'AppData/Local/Google/Chrome/User Data/#PROFILE_NAME#/Extensions/fmkadmapgofadopljbjfkapdkoienihi/#VERSION#');
  // console.log(REACT_DEVELOPER_TOOLS_PATH);
  // BrowserWindow.addDevToolsExtension(REACT_DEVELOPER_TOOLS_PATH);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      show: false,
      nodeIntegration: true
    }
  });

  mainWindow.maximize();
  mainWindow.show();

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  // Load React Dev Tools (Not Working now)
  loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
