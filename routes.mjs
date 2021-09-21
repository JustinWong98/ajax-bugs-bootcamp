import db from './models/index.mjs';
import initBugsController from './controllers/bugs.mjs';
import initFeaturesController from './controllers/features.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  const bugController = initBugsController(db);
  const featureController = initFeaturesController(db);
  const userController = initUsersController(db);

  app.get('/', bugController.index);
  app.post('/', bugController.submit);
  app.post('/feature/submit', featureController.submit);
  app.post('/register', userController.register);
  app.get('/login', userController.login);
  app.get('/checkCookies', userController.checkCookies);
}
