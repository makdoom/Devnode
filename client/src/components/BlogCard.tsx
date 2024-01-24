import { Blog } from "@/types/blog.types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { extractPreview } from "@/lib/utils";

type BlogPropType = {
  blog: Blog;
  navigateToPreviewBlog: (username: string, blogId: string) => void;
};

const BlogCard = ({ blog, navigateToPreviewBlog }: BlogPropType) => {
  return (
    <div
      className="border rounded-md p-4 mb-5 cursor-pointer"
      onClick={() => navigateToPreviewBlog(blog.author.username, blog._id)}
    >
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

      <div className="my-4 flex gap-2">
        <div className="flex-1">
          <h2 className="font-bold text-lg">{blog.title}</h2>
          <div
            className="text-secondary-foreground"
            dangerouslySetInnerHTML={{ __html: extractPreview(blog.contents) }}
            id="content"
          ></div>
          {/* <p className="text-muted-foreground text-sm mt-1">{blog.contents}</p> */}
        </div>

        <div className="w-[200px]">
          <img
            className="w-full object-contain rounded-md"
            // src={`${blog.coverImage ? blog.coverImage : 'https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/bxaqUeVIGHU/upload/99751ec9758a9ce11d347e980fe7b6f9.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp'`}
            src={`${
              blog.coverImage
                ? blog.coverImage
                : "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/bxaqUeVIGHU/upload/99751ec9758a9ce11d347e980fe7b6f9.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
            }`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
