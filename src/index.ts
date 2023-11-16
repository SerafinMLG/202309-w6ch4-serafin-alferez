import { createServer } from 'http';
import { program } from 'commander';

program.option('-p, --port <value>');

program.parse();
const options = program.opts();

const PORT = options.port || process.env.PORT || 3030;

const server = createServer((req, res) => {
  const url = new URL(req.url as string, `http://${req.headers.host}`);

  console.log('soy url', url);
  console.log('hola', req.headers.host);

  if (url.pathname !== '/calculator') {
    res.statusCode = 404;
    res.statusMessage = 'Error 404';
    res.write('Error 404');
    res.end();
    return;
  }

  const numA = url.searchParams.get('a');
  const numB = url.searchParams.get('b');

  if (!numA || !numB || isNaN(Number(numA)) || isNaN(Number(numB))) {

    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.setHeader('Content-type', 'text/html');
    res.write('<h1>ERROR 400</h1>');
    res.write('<p>introduza dos números para a y b</p>');
    res.end();
    return;
  }

  res.setHeader('Content-type', 'text/html');
  res.write(`<h1>Calculadora</h1>`);
  res.write(

    `<p>${Number(numA)} + ${Number(numB)} = ${
      Number(numA) + Number(numB)
    }</p>`
  );
  res.write(
    `<p>${Number(numA)} - ${Number(numB)} = ${
      Number(numA) - Number(numB)
    }</p>`
  );
  res.write(
    `<p>${Number(numA)} * ${Number(numB)} = ${
      Number(numA) * Number(numB)
    }</p>`
  );
  res.write(
    `<p>${Number(numA)} / ${Number(numB)} = ${
      Number(numA) / Number(numB)
    }</p>`
  );
  res.end();
});

server.listen(PORT);

server.on('error', (error) => {
  console.log(error.message);
});
