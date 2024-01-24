import {
  FilePlus,
  FileText,
  MoreVertical,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useParams } from "react-router";
import { Blog } from "@/types/blog.types";

type BlogItemPropsType = {
  id?: string;
  type: "new" | "edit";
  title: string;
  blog?: Blog;

  onClick: (id?: string | undefined) => void;
  onDelete?: (id: string | undefined) => void;
  onPin?: (id: string | undefined) => void;
};

const BlogItem = ({
  id,
  type,
  title,
  blog,
  onClick,
  onDelete,
  onPin,
}: BlogItemPropsType) => {
  const { blogId } = useParams();

  return (
    <div
      className={`group flex items-center gap-2 cursor-pointer hover:bg-primary-foreground p-2 rounded-sm ${
        blogId && blogId == id && "bg-secondary"
      }`}
      onClick={() => onClick(type === "edit" ? id : undefined)}
    >
      {type === "new" ? (
        <FilePlus className="h-4 w-4 group-hover:text-primary" />
      ) : (
        <FileText className="h-4 w-4 group-hover:text-primary" />
      )}
      <p
        className={`flex-1 text-sm group-hover:text-primary ${
          type === "edit" ? "font-normal" : "font-medium"
        }`}
      >
        {title.length > 15 ? `${title.slice(0, 15)}...` : title}
      </p>

      {type === "edit" && (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none group-hover:bg-white rounded-md p-1">
            <MoreVertical className="h-4 w-4 text-primary" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30" align="start" forceMount>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onPin?.(id)}
            >
              {blog?.isPinned ? (
                <>
                  <PinOff className="h-4 w-4 mr-2" />
                  Unpin
                </>
              ) : (
                <>
                  <Pin className="h-4 w-4 mr-2" />
                  Pin
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onDelete?.(id)}
            >
              <Trash2 className="h-4 w-4 mr-2 text-red-500" />
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
export default BlogItem;
