const http = require('http');
const port = 3000;

const logUTCTime = () => {
  return new Promise((resolve) => {
    const intervalID = setInterval(() => {
      console.log(new Date(Date.now()).toUTCString());
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalID);
      resolve(new Date(Date.now()).toUTCString());
    }, 10000);
  });
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const currentUTC = await logUTCTime();
    res.end(`UTC time = ${currentUTC}`);
  }
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
