const electronInstaller = require('electron-winstaller');

try {
    const result = electronInstaller.createWindowsInstaller({
        appDirectory: './dist_electron/',
        outputDirectory: './',
        authors: 'Guilherme Inc.',
        exe: 'web.exe'
    });
    console.log('It worked!');
} catch (e) {
    console.log(`No dice: ${e.message}`);
}