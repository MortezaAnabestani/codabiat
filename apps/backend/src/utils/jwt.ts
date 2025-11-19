import jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key',
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '30d' }
  );
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET || 'your-secret-key'
  ) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key'
  ) as TokenPayload;
};
