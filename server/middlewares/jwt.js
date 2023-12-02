import jwt from 'jsonwebtoken';
// models
import UserModel from '../models/User.js';

export const encode = async (req, res, next) => {
  console.log('encode')
  try {
    const { userId } = req.params;
    const user = await UserModel.getUserById(userId);
    const payload = {
      userId: user._id,
      userType: user.type,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    console.log('Auth', authToken);
    req.authToken = authToken;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.error });
  }
}

export const decode = (req, res, next) => {
  if (!(req.headers.authorization || '').replace(/Bearer\s?/, '')) {
    return res.status(403).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET_JWT);
    req.userId = decoded._id;
    return next();
  } catch (error) {

    return res.status(401).json({ success: false, message: error });
  }
}
