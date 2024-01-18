import { Blog } from "@/types/blog.types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect } from "react";

type BlogPropType = {
  blog: Blog;
};
const BlogCard = ({ blog }: BlogPropType) => {
  return (
    <div className="border rounded-md p-4 mb-5">
      <div className="flex gap-3">
        <Avatar className="cursor-pointer h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-sm flex flex-col cursor-pointer">
          <p className="font-medium">{blog.author.fullName}</p>
          <p className="text-muted-foreground text-sm">
            @{blog.author.username} - 05 Jan 2024
          </p>
        </div>
      </div>

      <div className="my-4 flex">
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{blog.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: blog.contents }}
            id="content"
          ></div>
          {/* <p className="text-muted-foreground text-sm mt-1">{blog.contents}</p> */}
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
export default BlogCard;
