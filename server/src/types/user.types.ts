export type UserType = {
  _id?: string;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  password: string;
  bio?: string;
  refreshToken: string;

  isPasswordCorrect: (password: string) => boolean;
  generateRefreshToken: () => string;
  generateAccessToken: () => string;
};
