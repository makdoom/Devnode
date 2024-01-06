import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type testType = {
  id?: number;
  name: string;
  username?: string;
  title?: string;
  email: string;
  description?: string;
};

type PostType = {
  post: testType;
};
const Post = ({ post }: PostType) => {
  return (
    <div className="border rounded-md p-4 mb-5">
      <div className="flex gap-3">
        <Avatar className="cursor-pointer h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-sm flex flex-col cursor-pointer">
          <p className="font-medium">{post.name}</p>
          <p className="text-muted-foreground text-sm">
            {post.email} - 05 Jan 2024
          </p>
        </div>
      </div>

      <div className="my-4 flex">
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{post.title}</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {post.description}
          </p>
        </div>

        <div className="w-[200px]">
          <img
            className="w-full object-contain rounded-md"
            src="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/bxaqUeVIGHU/upload/99751ec9758a9ce11d347e980fe7b6f9.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Post;
