// utils
import makeValidation from '@withvoid/make-validation';
// models
import QuestionModel from '../models/Question.js';
import PackModel from '../models/Pack.js';

export default {
  onGetQuestionsByPackId: async (req, res) => {
    try {
      const packId = req.params.id;
      const pack = await PackModel.getPackById(packId);
      if (!pack) throw ({ error: 'No pack with this id found' });
      const questions = await QuestionModel.getQuestionsByPackId(packId);
      return res.status(200).json( questions );
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onCreateQuestion: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          packId: { type: types.string },
          audioFileUrl: { type: types.string },
          song: { type: types.string },
          artist: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const pack = await PackModel.getPackById(req.body.packId);
      if (!pack) throw ({ error: 'No pack with this id found' });

      const { packId, audioFileUrl, song, artist } = req.body;
      const question = await QuestionModel.createQuestion(packId, audioFileUrl, song, artist);
      return res.status(200).json({ success: true, question });
    } catch (err) {
      return res.status(500).json({ success: false, error: err })
    }
  },
}
