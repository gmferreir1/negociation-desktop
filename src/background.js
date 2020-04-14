'use strict'
const path = require('path');
const log = require("electron-log");
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

import { autoUpdater } from "electron-updater"

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 768,
    minWidth: 1200,
    minHeight: 768,
    useContentSize: true,
    show: true,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__static, 'preload.js')
    },
    icon: path.join(__static, 'icon.png')
  })


  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    //autoUpdater.checkForUpdatesAndNotify();
  }

  win.setMenuBarVisibility(false);



  win.on('closed', () => {

    //win.webContents.send('aplicationClosed');


    win = null
  })
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  win.webContents.send('aplicationClosed');

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow();
})

function checkUpdate() {

  log.info("Verificando atualização ...");

  autoUpdater.checkForUpdates();

  autoUpdater.on('update-available', (info) => {
    log.info(`Update Available: ${info}`);
    win.webContents.send('downloadProgress');
  });

  autoUpdater.on('update-not-available', (info) => {
    log.info(`Update Not Available: ${info}`);
    win.webContents.send('updateChecked');
  });

  autoUpdater.on('update-downloaded', (info) => {
    log.info(`Update Downloaded: ${info}`);
    win.webContents.send('quitAndInstall');
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('error', (info) => {
    log.info(`Erro ao atualizar APP: ${info}`);
    win.webContents.send('updateChecked');
  });

}



ipcMain.on("checkUpdate", () => {
  checkUpdate();
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}







