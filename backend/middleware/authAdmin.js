import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ success: false, message: 'Unauthorized: No token' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user || !user.isAdmin)
      return res.status(403).json({ success: false, message: 'Access denied: Not admin' });

    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Unauthorized: Token invalid' });
  }
};

export default authAdmin;
