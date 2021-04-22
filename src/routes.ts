/* eslint-disable sonarjs/no-duplicate-string */
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { createMiddleware, deleteVideogameById, findAll, findById, uptade } from './controllers/videogame.controller';
import apiSpec from '../openapi.json';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

const router = Router();

router.post('/videogame/add', createMiddleware);
router.get('/videogame/', findAll);
router.get('/videogame/:id', findById);
router.put('/videogame/:id', uptade);
router.delete('/videogame/:id', deleteVideogameById);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
