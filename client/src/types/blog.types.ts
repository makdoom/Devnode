export type BlogPayload = {
  title: string;
  contents: string;
};

export type Blog = {
  _id: string;
  title: string;
  contents: string;
  author: {
    fullName: string;
    email: string;
  };
  createdAt: string;
};

export type BlogResponseType = {
  data: Blog[];
  statusCode: number;
  success: boolean;
};
