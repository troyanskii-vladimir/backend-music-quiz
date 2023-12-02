import express from 'express';
// controllers
import user from '../controllers/user.js';
import { decode } from '../middlewares/jwt.js';

const router = express.Router();

router
  // .get('/', user.onGetAllUsers)
  .post('/register', user.onCreateUser)
  .post('/login', user.onLoginUser)
  .get('/me', decode, user.onGetUserById)
  // .delete('/:id', user.onDeleteUserById)

export default router;
