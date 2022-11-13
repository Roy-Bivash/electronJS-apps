const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: "./src/assets/favicon.ico",
        autoHideMenuBar: true,
    })
    
    win.loadFile('src/accueil.html')
}

app.whenReady().then(() => {
  createWindow()
  
})
