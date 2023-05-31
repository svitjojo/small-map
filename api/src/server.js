import express from 'express';
import cors from 'cors';
import * as placeControllers from './controllers/placeController.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { catchError } from './utils/catchError.js';

const app = express();

app.use(cors());
app.get('/', express.json(), catchError(placeControllers.getAll));
app.post('/', express.json(), catchError(placeControllers.add));
app.use(errorMiddleware);

app.listen(3000);