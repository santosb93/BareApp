const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * send static files to all requests with path '/'
 */
app.use('/', express.static(path.resolve(__dirname, '../dist/')));

/**
 * send index.html to all requests with path '/'
 */
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
}); //listens on port 3000 -> http://localhost:3000/

// module.exports = app;
