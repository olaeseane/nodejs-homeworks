const fs = require('fs');
const util = require('util');
const path = require('path');

const fsStatAsync = util.promisify(fs.stat);
const fsMkdirAsync = util.promisify(fs.mkdir);
const fsLink = util.promisify(fs.link);
const fsUnlink = util.promisify(fs.unlink);
const fsRmdir = util.promisify(fs.rmdir);

const source = process.argv[2] || './dir';
const destination = process.argv[3] || './result';
const del = process.argv[4] === '-d';

const readdirAsync = source => {
  return new Promise((resolve, reject) => {
    fs.readdir(source, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

const readDir = async source => {
  try {
    let files = await readdirAsync(source);
    files.forEach(async item => {
      let sourceBase = path.join(source, item);
      let stat = await fsStatAsync(sourceBase);
      if (!stat.isDirectory()) {
        let resultBase = path.join(destination, item[0]);
        await fsMkdirAsync(resultBase, { recursive: true });
        await fsLink(sourceBase, path.join(resultBase, item));
        if (del) {
          try {
            await fsUnlink(sourceBase);
            await fsRmdir(path.parse(sourceBase).dir);
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        readDir(sourceBase);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

readDir(source);