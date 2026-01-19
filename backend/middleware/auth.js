import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import User from '../models/User.js'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'ليس لديك صلاحية للوصول' })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-verificationCode -codeExpiry')

    if (!user) {
      return res.status(401).json({ message: 'المستخدم غير موجود' })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'رمز المصادقة غير صحيح' })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'غير مصرح - يتطلب صلاحيات المدير' })
  }
}
