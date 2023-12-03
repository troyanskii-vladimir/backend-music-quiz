import express from 'express';
// controllers
import pack from '../controllers/pack.js';

const router = express.Router();

router
  .get('/getAll', pack.onGetAllPacks)
  .get('/:id', pack.onGetPackById)
  .post('/', pack.onCreatePack)

export default router;
