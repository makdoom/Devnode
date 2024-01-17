import { FilePlus2, FileText, MoreVertical, Pin, Trash } from "lucide-react";
import { useParams } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type BlogItemPropType = {
  id?: string | undefined;
  type: "single" | "section";
  title: string;

  onBlogItemClick: (id: string | undefined) => void;
  onBlogItemDelete?: (id: string | undefined) => void;
};

const BlogItem = ({
  id,
  type,
  title,
  onBlogItemClick,
  onBlogItemDelete,
}: BlogItemPropType) => {
  const params = useParams();

  return (
    <div
      onClick={() => onBlogItemClick(id)}
      className={`flex group items-center gap-2 hover:bg-purple-100 rounded-md cursor-pointer ${
        type === "single" ? "p-2" : "p-2"
      }
      ${id === params.id && "bg-purple-100 text-primary"}
      `}
    >
      {type === "single" ? (
        <FilePlus2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
      ) : (
        <FileText
          className={`h-4 w-4 text-muted-foreground group-hover:text-primary ${
            id === params.id && "text-primary"
          }`}
        />
      )}
      <span className="flex-1 text-sm group-hover:text-primary">
        {title.length > 15 ? `${title.slice(0, 15)}...` : title}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <MoreVertical className="h-4 w-4 text-primary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30" align="start" forceMount>
          <DropdownMenuItem className="cursor-pointer">
            <Pin className="h-4 w-4 mr-2" />
            Pin
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onBlogItemDelete?.(id)}
          >
            <Trash className="h-4 w-4 mr-2 text-red-500" />
            <span className="text-red-500">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default BlogItem;
