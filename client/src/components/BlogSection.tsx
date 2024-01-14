import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

import BlogItem from "./BlogItem";
import { useNavigate } from "react-router";
import { useCreateBlog } from "@/hooks/useCreateBlog";
import { useAppSelector } from "@/hooks/storeHook";

type BlogSectionPropType = {
  type: "single" | "section";
  title: string;
};

const BlogSection = ({ type, title }: BlogSectionPropType) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { blogList } = useAppSelector((state) => state.blogs);

  const createBlogMutation = useCreateBlog();

  const handleCreateNewBlog = () => {
    const blogName = blogList?.length
      ? `Untitled-${blogList?.length}`
      : "Untitled";

    createBlogMutation.mutate({
      title: blogName,
      contents: "",
    });
  };

  const handleBlogItemClick = (id: string | undefined) => {
    navigate(`/create-blog/${id}`);
  };

  if (type === "single") {
    return (
      <BlogItem
        type={type}
        title={title}
        onBlogItemClick={handleCreateNewBlog}
      />
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full my-4 flex-1"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between w-full cursor-pointer">
          <h4 className="text-sm font-semibold text-primary">
            {title} {blogList.length ? `(${blogList.length})` : ""}
          </h4>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 mt-2 overflow-auto h-[550px]">
        {blogList?.map((singleItem) => (
          <BlogItem
            key={singleItem._id}
            id={singleItem._id}
            type="section"
            title={singleItem.title}
            onBlogItemClick={(id: string | undefined) =>
              handleBlogItemClick(id)
            }
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
export default BlogSection;
