const fs = require('fs');
const path = require('path');

function renameFilesRecursively(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      renameFilesRecursively(fullPath);
    } else {
      if (file.endsWith('.tsx')) {
        const newPath = fullPath.replace(/\.tsx$/, '.jsx');
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      } else if (file.endsWith('.ts')) {
        const newPath = fullPath.replace(/\.ts$/, '.js');
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      }
    }
  });
}

renameFilesRecursively(__dirname);
console.log('Renaming complete.'); 