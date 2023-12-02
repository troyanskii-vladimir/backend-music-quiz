import express from 'express';
import { registerValidation } from '../validations/auth.js';
// controllers
import user from '../controllers/user.js';

const router = express.Router();

router
  .get('/', user.onGetAllUsers)
  .post('/register', user.onCreateUser)
  .post('/login', user.onLoginUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)

export default router;
