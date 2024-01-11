import { FilePlus2, FileText } from "lucide-react";

type BlogItemPropType = {
  id?: string | undefined;
  type: "single" | "section";
  title: string;

  onBlogItemClick: (id: string | undefined) => void;
};

const BlogItem = ({ id, type, title, onBlogItemClick }: BlogItemPropType) => {
  return (
    <div
      onClick={() => onBlogItemClick(id)}
      className={`flex group items-center gap-2 hover:bg-purple-100 rounded-md cursor-pointer ${
        type === "single" ? "p-2" : "py-1 px-2"
      }`}
    >
      {type === "single" ? (
        <FilePlus2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
      ) : (
        <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
      )}
      <span className="text-sm group-hover:text-primary">{title}</span>
    </div>
  );
};
export default BlogItem;
