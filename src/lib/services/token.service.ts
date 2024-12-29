import jwt from 'jsonwebtoken';
import moment from 'moment';

import ApiError from '@/lib/ApiError';
import { tokenTypes } from '@/lib/config/constants';
import AdminAuthToken from '@/lib/models/admin-auth-token.model';
import UserService from '@/lib/services/user.service';
import { UserType } from '@/lib/type';

// import adminService from './admin.service';
import { config } from '../config/config';
// import { tokenTypes } from '../config/constants';

/**
 * Generate token
 * @param {string} userId
 * @param {moment.Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId: string,
  expires: moment.Moment,
  type: string,
  secret: string = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    userType: 'admin',
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {string} userId
 * @param {moment.Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<AdminAuthToken>}
 */
const saveToken = async (
  token: string,
  userId: string,
  expires: moment.Moment,
  type: string,
  blacklisted = false
): Promise<AdminAuthToken> => {
  const tokenDoc = await AdminAuthToken.create({
    token,
    userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<any>}
 */
const verifyToken = async (token: string, type: string): Promise<unknown> => {
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await AdminAuthToken.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });
    if (!tokenDoc) {
      throw new ApiError(404, 'Token not found');
    }
    return payload;
  } catch (error) {
    throw new ApiError(400, 'Invalid token');
  }
};

/**
 * Verify access token
 * @param {string} token
 * @returns {Promise<unknown>}
 */
const verifyAccessToken = async (token: string): Promise<unknown> => {
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    return payload;
  } catch (error) {
    throw new ApiError(400, 'Invalid token');
  }
};

/**
 * Generate auth tokens
 * @param {UserType} user
 * @returns {Promise<{ access: { token: string, expires: Date }, refresh: { token: string, expires: Date } }>}
 */
const generateAuthTokens = async (
  user: UserType
): Promise<{
  access: { token: string; expires: Date };
  refresh: { token: string; expires: Date };
}> => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateToken(
    user.id || '',
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );
  const refreshToken = generateToken(
    user.id || '',
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id || '',
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<{ resetPasswordToken: string, user: UserType }>}
 */
const generateResetPasswordToken = async (
  email: string
): Promise<{ resetPasswordToken: string; user: UserType }> => {
  const user = await UserService.getUserEmail(email);
  if (!user) {
    throw new ApiError(404, 'No users found with this email');
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes'
  );
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );

  return { resetPasswordToken, user };
};

export {
  generateAuthTokens,
  generateResetPasswordToken,
  generateToken,
  saveToken,
  verifyAccessToken,
  verifyToken,
};
