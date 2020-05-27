const { existsSync, createWriteStream, unlinkSync, mkdir } = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const extractZip = require('extract-zip');
const { resolve } = require('path');

const extract = promisify(extractZip);

const extensionPath = resolve(
  __dirname,
  '../build/extensions/bcbconnect',
);

mkdir(extensionPath, { recursive: true }, async err => {
  if (err) return console.error(err);

  if (!existsSync(resolve(extensionPath, 'manifest.json'))) {
    try {
      const asset = 'https://github.com/bcbwallet/bcbconnect/releases/download/build.zip';

      console.log('Downloading build.zip...');
      const res2 = await axios({
        url: asset,
        method: 'GET',
        responseType: 'stream',
      });

      const zipPath = resolve(__dirname, '../build/extensions/build.zip');
      const stream = createWriteStream(zipPath);

      res2.data.pipe(stream);

      stream.on('close', async () => {
        await extract(zipPath, { dir: extensionPath });
        unlinkSync(zipPath);
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
});
