// utils
import bcrypt from 'bcrypt';
import makeValidation from '@withvoid/make-validation';
import jwt from 'jsonwebtoken';
// models
import UserModel, { USER_TYPES } from '../models/User.js';

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          userName: { type: types.string },
          password: { type: types.string },
          type: { type: types.enum, options: { enum: USER_TYPES } },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { userName, type } = req.body;
      const user = await UserModel.createUser(userName, hash, type);

      const token = jwt.sign(
        {
          _id: user._id,
        },
        `${process.env.SECRET_JWT}`
      )

      return res.status(200).json({ success: true, user, token });
    } catch (err) {
      return res.status(500).json({ success: false, error: err })
    }
  },
  onLoginUser: async (req, res) => {
    console.log('login')
    try {
      const user = await UserModel.findOne({ userName: req.body.userName });

      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }

      const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

      if (!isValidPass) {
        return res.status(400).json({
          message: 'Неверный логин или пароль',
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        `${process.env.SECRET_JWT}`
      )

      return res.status(200).json({ success: true, user, token });
    } catch (err) {
      return res.status(500).json({ success: false, error: err })
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
}
