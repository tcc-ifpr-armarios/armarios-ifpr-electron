const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
      
    },
    // fullscreen: true,
  });

  win.maximize();
  win.loadFile('./screens/authentication/index.html');
  // win.loadFile('./screens/home/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Iniciar o servidor Express
  const express = require('express');
  const expressApp = express();
  const PORT = 8080;

  expressApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  expressApp.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
