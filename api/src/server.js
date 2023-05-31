import express from 'express';
import cors from 'cors';
import path from 'path';
import open from 'open';
import * as placeControllers from './controllers/placeController.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { catchError } from './utils/catchError.js';

const port = 3000;
const apiServer = express();
const appServer = express();

apiServer.use(cors());
apiServer.get('/', express.json(), catchError(placeControllers.getAll));
apiServer.post('/', express.json(), catchError(placeControllers.add));
apiServer.use(errorMiddleware);

appServer.get('/', (req, res) => {
  const filepath = path.resolve('../frontend', 'index.html');

  res.sendFile(filepath);
});
appServer.get('/style', (req, res) => {
  const filepath = path.resolve('../frontend', 'style.css');

  res.sendFile(filepath);
});
appServer.get('/script', (req, res) => {
  const filepath = path.resolve('../frontend', 'main.js');

  res.sendFile(filepath);
});

appServer.listen(5500);
apiServer.listen(port);
await open('http://localhost:5500');