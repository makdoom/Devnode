import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

import BlogItem from "./BlogItem";

type BlogSectionPropType = {
  type: "single" | "section";
  title: string;
  blogItemList?: { id: string; title: string }[];
};

const BlogSection = ({ type, title, blogItemList }: BlogSectionPropType) => {
  const [isOpen, setIsOpen] = useState(false);

  if (type === "single") {
    return <BlogItem type={type} title={title} />;
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
              id={singleItem.id}
              type="section"
              title={singleItem.title}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
export default BlogSection;
