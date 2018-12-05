const http = require('http');
const port = 3000;


console.log(process.env.INTERVAL);
console.log(process.env.TIMEOUT);

const interval = process.env.INTERVAL || 1000;
const timeout = process.env.TIMEOUT || 10000;

const logUTCTime = () => {
  return new Promise((resolve) => {
    const intervalID = setInterval(() => {
      console.log(new Date(Date.now()).toUTCString());
    }, interval);
    setTimeout(() => {
      clearInterval(intervalID);
      resolve(new Date(Date.now()).toUTCString());
    }, timeout);
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
