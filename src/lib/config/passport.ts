import { PassportStatic } from 'passport';
import {
  ExtractJwt,
  JwtFromRequestFunction,
  Strategy as JwtStrategy,
} from 'passport-jwt';

import { config } from '@/lib/config/config';

import { Admin, User } from '../models';

interface JwtPayload {
  sub: string;
  userType: 'user' | 'admin';
}

// Define the JWT options
const jwtOptions: JwtStrategy.Options = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest:
    ExtractJwt.fromAuthHeaderAsBearerToken() as JwtFromRequestFunction<Request>,
};

// JWT verification callback
const jwtVerify = async (
  payload: JwtPayload,
  done: PassportStatic.DoneFunction
): Promise<void> => {
  try {
    const userType = payload.userType;
    if (userType === 'admin') {
      const admin = await Admin.findById(payload.sub);
      if (!admin) {
        return done(null, false); // Admin not found
      }
      return done(null, admin); // Admin found
    } else {
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false); // User not found
      }
      return done(null, user); // User found
    }
  } catch (error) {
    return done(error, false); // Error during verification
  }
};

// Create the JWT strategy instance
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };
