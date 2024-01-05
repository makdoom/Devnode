export type User = {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type RegisterType = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

// export type RegisterResponseType = {
//   _id: string;
//   fullName: string;
//   username: string;
//   email: string;
//   bio: string;
//   createdAt: string;
//   updatedAt: string;
// };

export type LoginType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  data: {
    loggedInUser: User;
    accessToken: string;
    refreshToken: string;
  };
  statusCode: number;
  success: boolean;
};
