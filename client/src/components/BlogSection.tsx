import { Blog } from "@/types/blog.types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import BlogItem from "./BlogItem";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/hooks/storeHook";
import { updateSelectedBlogId } from "@/store/reducers/blogReducer";

type BlogSectionPropsType = {
  isLoading: boolean;
  type: "Pinned" | "Drafts" | "Published";
  emptyText: string;
  blogList: Blog[] | [];
};

const BlogSection = ({
  type,
  isLoading,
  blogList,
  emptyText,
}: BlogSectionPropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigteToBlogItem = (id: string | undefined) => {
    if (id) {
      dispatch(updateSelectedBlogId(id));

      navigate(`/blog/create/${id}`);
    }
  };

  useEffect(() => {
    if (blogList.length) setIsOpen(true);
  }, [blogList]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild disabled={isLoading}>
        <div className="flex items-center justify-between w-full cursor-pointer">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">
            {type} {blogList.length > 0 && `(${blogList.length})`}
          </p>
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin mr-2" />
          ) : isOpen ? (
            <ChevronUp className="h-5 w-5 text-primary mr-2" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary mr-2" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 mt-2">
        {blogList.length ? (
          blogList?.map((blog: Blog) => (
            <BlogItem
              key={blog._id}
              id={blog._id}
              type="edit"
              title={blog.title}
              onClick={(id: string | undefined) => navigteToBlogItem(id)}
            />
          ))
        ) : (
          <p className="text-sm">{emptyText}</p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
export default BlogSection;
