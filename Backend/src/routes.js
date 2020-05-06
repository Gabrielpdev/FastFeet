import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import RecipientsController from './app/controllers/RecipientsController';
import SessionsController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveriesController from './app/controllers/DeliveriesController';
import DeliveryWithdrawController from './app/controllers/DeliveryWithdrawController';
import DeliveryFinishController from './app/controllers/DeliveryFinishController';
import DeliveryPeddingController from './app/controllers/DeliveryPeddingController';
import DeliveryDeliveredController from './app/controllers/DeliveryDeliveredController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionsController.store);

routes.put('/delivery/:id', DeliveryWithdrawController.update);
routes.put('/delivery/:id/finish', DeliveryFinishController.update);

routes.get('/deliveryman/:id/deliveries', DeliveryDeliveredController.index);
routes.get('/deliveryman/deliveries/:id', DeliveryPeddingController.index);
routes.get('/deliveryman/:id', DeliverymanController.show);

routes.post('/delivery/:id/problems', DeliveryProblemsController.store);
routes.get('/delivery/:id/problems', DeliveryProblemsController.show);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientsController.index);
routes.get('/recipients/:id', RecipientsController.show);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);
routes.delete('/recipients/:id', RecipientsController.delete);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveriesController.index);
routes.get('/deliveries/:id', DeliveriesController.show);
routes.post('/deliveries', DeliveriesController.store);
routes.put('/deliveries/:id', DeliveriesController.update);
routes.delete('/deliveries/:id', DeliveriesController.delete);

routes.get('/delivery/problems', DeliveryProblemsController.index);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemsController.delete
);

export default routes;
