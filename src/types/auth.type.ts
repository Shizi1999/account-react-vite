import { User } from './user.type';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type RefreshTokenReponse = {
  accessToken: string;
};
