// server.js
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';

const app = next({ dev, port, hostname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
