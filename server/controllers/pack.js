// utils
import bcrypt from 'bcrypt';
import makeValidation from '@withvoid/make-validation';
import jwt from 'jsonwebtoken';
// models
import PackModel from '../models/Pack.js';

export default {
  onGetAllPacks: async (req, res) => {
    try {
      const packs = await PackModel.getPacks();
      return res.status(200).json( packs );
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onGetPackById: async (req, res) => {
    try {
      const packId = req.params.id;
      const pack = await PackModel.getPackById(packId);
      return res.status(200).json( pack );
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onCreatePack: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          packName: { type: types.string },
          packImageUrl: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { packName, packImageUrl } = req.body;
      const pack = await PackModel.createPack(packName, packImageUrl);

      return res.status(200).json( pack );
    } catch (err) {
      return res.status(500).json({ success: false, error: err })
    }
  },
}
