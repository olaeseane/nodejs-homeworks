const fs = require('fs');
const path = require('path');

const source = process.argv[2] || './dir';
const destination = process.argv[3] || './result';
const del = process.argv[4] === '-d';

const readDir = source => {
  fs.readdir(source, (err, files) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    files.forEach(item => {
      let sourceBase = path.join(source, item);
      fs.stat(sourceBase, (err, state) => {
        if (!state.isDirectory()) {
          let resultBase = path.join(destination, item[0]);
          fs.mkdir(resultBase, { recursive: true }, err => {
            if (!err) {
              fs.link(sourceBase, path.join(resultBase, item), err => {
                if (!err && del)
                  fs.unlink(sourceBase, () => {
                    fs.rmdir(path.parse(sourceBase).dir, () => {});
                  });
              });
            }
          });
        } else {
          readDir(sourceBase);
        }
      });
    });
  });
};

console.log('Folders construction has started...');
readDir(source);
console.log('Folders construction has finished');