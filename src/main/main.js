const { app, BrowserWindow } = require('electron');
const path = require('path');
const { initModels } = require('../models/index.js');
const authMiddleware = require('../middleware/authMiddleware.js');

let mainWindow;

const rotasSeguras = require('../routes/index.js');
const rotasPublicasServidor = require('../routes/auth-servidor.js');
// const rotasPublicasEstudante = require('../routes/auth-estudante.js');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.maximize();
  mainWindow.loadFile('./public/home/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', async () => {
  await initModels(); // Sincronização do banco de dados
  createWindow();

  // Configuração do servidor Express
  const express = require('express');
  const server = express(); 
  server.use(express.json()); 

  // importando rotas


  server.use('/api/public/server', rotasPublicasServidor);
  // server.use('/api/public/student', rotasPublicasEstudante);
  server.use('/api/secure/server', authMiddleware, rotasSeguras);

  // Escutando apenas em localhost para segurança
  server.listen(3000, '127.0.0.1', () => {
    console.log('Servidor Express rodando em localhost na porta 3000');
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
