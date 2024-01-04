export type RegisterType = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export type RegisterResponseType = {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginType = {
  email: string;
  password: string;
};

type LoggedInUser = {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponseType = {
  data: {
    loggedInUser: LoggedInUser;
    accessToken: string;
    refreshToken: string;
  };
  statusCode: number;
  success: boolean;
};
