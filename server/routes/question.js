import express from 'express';
// controllers
import question from '../controllers/question.js';

const router = express.Router();

router
  .get('/:id', question.onGetQuestionsByPackId)
  .post('/', question.onCreateQuestion)

export default router;
