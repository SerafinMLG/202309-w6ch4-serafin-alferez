import { createServer } from 'http';
import 'dotenv/config';
import { program } from 'commander';

program.option('-p, --port <value>');

program.parse();
const options = program.opts();

const PORT = options.port || process.env.PORT || 3030;

const server = createServer((req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.statusMessage = 'Method not allowed today';
    res.write('Unsupported method');
    res.end();
  }

  console.log(req.url);
  console.log(req.headers.host);

  const url = new URL(req.url as string, `http://${req.headers.host}`);
  console.log('url', url);

  res.setHeader('Content-type', 'text/html');
  res.write('<h1>Hola Mundo</h1>');
  res.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port', PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
