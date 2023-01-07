const {app, BrowserWindow} = require('electron')

function createWindow () {
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Mudar o Icone do Aplicativo
  win.setIcon('images/icon.png')
  // Deixando a janela ocupar toda a tela
  win.maximize()
  // Tira a barra de Menu
  win.setMenuBarVisibility(false)
  // Impede de ser redimencionada
  win.setResizable(false)
  // e carrega o arquivo index.html do seu aplicativo.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
