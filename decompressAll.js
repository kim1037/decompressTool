// const api = require('express').Router()
const fs = require('fs');
const path = require('path');
const decompress = require('decompress');

function decompressAll(folderPath) {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(folderPath)
      const archiveFiles = files.filter(file => ['.zip', '.7z'].includes(path.extname(file)));

      let promises = archiveFiles.map(file => {
        const archivePath = path.join(folderPath, file);
        const outputDir = path.join(folderPath, path.basename(file, path.extname(file)));
        console.log(`Extracting: ${file}`);

        return decompress(archivePath, outputDir);
      });

      Promise.all(promises)
        .then(() => {
          console.log('All files extracted successfully.');
          resolve({ msg: 'success' });
        })
        .catch(err => {
          console.error('Error during extraction:', err);
          reject(err);
        });
    } catch (err) {
      console.error('Error reading directory:', err);
      reject(err);
    }
  })
}

const folderPath ='C:/Users/Downloads/' // 存放解壓縮檔案的path
decompressAll(folderPath)
  .then(() => console.log('Decompression completed'))
  .catch(err => console.error('Decompression failed', err));

// module.exports = api