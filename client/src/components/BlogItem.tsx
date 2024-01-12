import { FilePlus2, FileText } from "lucide-react";
import { useParams } from "react-router";

type BlogItemPropType = {
  id?: string | undefined;
  type: "single" | "section";
  title: string;

  onBlogItemClick: (id: string | undefined) => void;
};

const BlogItem = ({ id, type, title, onBlogItemClick }: BlogItemPropType) => {
  const params = useParams();

  return (
    <div
      onClick={() => onBlogItemClick(id)}
      className={`flex group items-center gap-2 hover:bg-purple-100 rounded-md cursor-pointer ${
        type === "single" ? "p-2" : "py-1 px-2"
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
      <span className="text-sm group-hover:text-primary">{title}</span>
    </div>
  );
};
export default BlogItem;
