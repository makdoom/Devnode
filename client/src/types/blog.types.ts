export type BlogPayload = {
  title: string;
  subtitle?: string;
  contents?: string;
  coverImage?: string;
  tags?: string[];
  isDraft?: boolean;
  isPublished?: boolean;
};

export type Blog = {
  _id: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  isDraft?: boolean;
  isPublished?: boolean;
  contents: string;
  author: {
    fullName: string;
    username: string;
  };
  createdAt: string;
};

export type BlogResponseType = {
  data: Blog[];
  statusCode: number;
  success: boolean;
};
