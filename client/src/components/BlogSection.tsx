import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

import BlogItem from "./BlogItem";
import { useNavigate } from "react-router";

type BlogSectionPropType = {
  type: "single" | "section";
  title: string;
  blogItemList?: {
    _id: string;
    title: string;
    createdAt?: string;
    author?: { fullName: string };
  }[];
};

const BlogSection = ({ type, title, blogItemList }: BlogSectionPropType) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleBlogItemClick = (id: string | undefined) => {
    navigate(`/create-blog/${id}`);
  };

  if (type === "single") {
    return (
      <BlogItem
        type={type}
        title={title}
        onBlogItemClick={() => console.log("create new")}
      />
    );
  }

  return (
    <div className="mt-7">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full my-4"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between w-full cursor-pointer">
            <h4 className="text-sm font-semibold text-primary">{title}</h4>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-primary" />
            ) : (
              <ChevronDown className="h-5 w-5 text-primary" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          {blogItemList?.map((singleItem) => (
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
    </div>
  );
};
export default BlogSection;
